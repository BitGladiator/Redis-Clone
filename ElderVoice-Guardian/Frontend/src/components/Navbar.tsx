import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="nav-content">
                    <div className="logo">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="16" cy="16" r="2" fill="currentColor" />
                        </svg>
                        <span>ElderVoice Guardian</span>
                    </div>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                        <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
                        <a href="#impact" onClick={() => setIsMenuOpen(false)}>Impact</a>
                        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                        <button className="btn-register">Get Started</button>
                    </div>

                    <button
                        className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
