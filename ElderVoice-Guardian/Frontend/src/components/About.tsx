import './About.css'

export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-image">
                        <div className="image-wrapper">
                            <img src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=700&fit=crop" alt="Family caring for elderly" />
                            <div className="image-accent"></div>
                        </div>
                    </div>

                    <div className="about-content">
                        <span className="section-label">ABOUT</span>
                        <h2>ElderVoice became the first AI companion to provide daily, privacy-first elder care.</h2>
                        <p>This innovative system performs conversational check-ins to detect emotional distress, physical risks, and signs of neglect—all processed locally on-device to ensure complete privacy. The science and compassion behind this breakthrough redefine elder care.</p>

                        <div className="feature-badge">
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop" alt="AI Voice Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
