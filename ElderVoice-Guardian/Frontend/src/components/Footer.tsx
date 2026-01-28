import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="16" cy="16" r="2" fill="currentColor" />
                            </svg>
                            <span>ElderVoice Guardian</span>
                        </div>
                        <p>Privacy-first AI companion for elder care. Reducing neglect, loneliness, and medical emergencies through compassionate technology.</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <a href="#features">Features</a>
                            <a href="#privacy">Privacy</a>
                            <a href="#pricing">Pricing</a>
                            <a href="#download">Download App</a>
                        </div>

                        <div className="footer-column">
                            <h4>Support</h4>
                            <a href="#faq">FAQ</a>
                            <a href="#help">Help Center</a>
                            <a href="#contact">Contact Us</a>
                            <a href="#community">Community</a>
                        </div>

                        <div className="footer-column">
                            <h4>Company</h4>
                            <a href="#about">About Us</a>
                            <a href="#mission">Our Mission</a>
                            <a href="#careers">Careers</a>
                            <a href="#press">Press Kit</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 ElderVoice Guardian. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#privacy-policy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
