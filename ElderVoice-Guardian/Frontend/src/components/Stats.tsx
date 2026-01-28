import { useEffect, useRef } from 'react'
import './Stats.css'

export default function Stats() {
    const statsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const counters = entry.target.querySelectorAll('[data-target]')
                        counters.forEach((counter) => {
                            const target = parseInt(counter.getAttribute('data-target') || '0')
                            animateCounter(counter as HTMLElement, target)
                        })
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.5 }
        )

        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const animateCounter = (element: HTMLElement, target: number) => {
        let current = 0
        const increment = target / 100
        const duration = 2000
        const stepTime = duration / 100

        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                element.textContent = target.toLocaleString() + '+'
                clearInterval(timer)
            } else {
                element.textContent = Math.floor(current).toLocaleString()
            }
        }, stepTime)
    }

    return (
        <section className="stats" ref={statsRef}>
            <div className="stats-background">
                <div className="stats-overlay"></div>
            </div>

            <div className="container">
                <div className="stats-content">
                    <div className="stats-text">
                        <p className="stats-intro">At the heart of our commitment is a simple but superior therapy backed by science.</p>
                        <h2>Helping you achieve full potential.</h2>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number" data-target="5000">0</div>
                            <div className="stat-label">Elders Protected</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number" data-target="150">0</div>
                            <div className="stat-label">Communities Served</div>
                        </div>
                    </div>

                    <button className="btn-stats">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Our Impact
                    </button>
                </div>
            </div>
        </section>
    )
}
