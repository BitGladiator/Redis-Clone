import './Hero.css'

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-background">
                <img src="/landing.jpg" alt="Elderly care" />
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-text">
                    <h1>
                        Caring for<br />
                        life's <span className="highlight">✦ most</span><br />
                        precious years
                    </h1>
                    <p>A privacy-first voice AI companion providing daily check-ins and early-warning support for elderly individuals living alone.</p>

                    <div className="hero-actions">
                        <button className="btn-primary">
                            Explore More
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 13L13 7M13 7H7M13 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="btn-secondary">
                            <div className="icon-circle">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7 5L15 10L7 15V5Z" fill="var(--color-primary)" />
                                </svg>
                            </div>
                            Watch Our Vision
                        </button>
                    </div>
                </div>
            </div>

            <div className="hero-wave">
                <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
                    <path d="M0,64 C360,100 720,20 1440,64 L1440,120 L0,120 Z" fill="white" />
                </svg>
            </div>
        </section>
    )
}
