import './Features.css'

export default function Features() {
    const features = [
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="var(--accent-yellow)" opacity="0.2" />
                    <path d="M24 14V24L30 30" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: "Daily Voice Check-ins",
            description: "Natural conversational AI that engages elderly individuals with empathy and understanding, detecting subtle changes in mood and wellbeing."
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="var(--accent-yellow)" opacity="0.2" />
                    <path d="M24 28C28.4183 28 32 24.4183 32 20C32 15.5817 28.4183 12 24 12C19.5817 12 16 15.5817 16 20C16 24.4183 19.5817 28 24 28Z" stroke="var(--color-primary)" strokeWidth="3" />
                    <path d="M24 24V20L27 17" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
                </svg>
            ),
            title: "Anomaly Detection",
            description: "Advanced AI algorithms identify behavioral patterns and alert caregivers to potential risks including neglect, abuse, or medical emergencies."
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="var(--accent-yellow)" opacity="0.2" />
                    <path d="M18 24L22 28L30 16" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: "Complete Privacy",
            description: "All processing happens on-device using edge AI models. No data is sent to the cloud, ensuring complete privacy and security for users."
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="var(--accent-yellow)" opacity="0.2" />
                    <path d="M16 28C16 24 18 20 24 20C30 20 32 24 32 28" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="24" cy="14" r="4" stroke="var(--color-primary)" strokeWidth="3" />
                </svg>
            ),
            title: "Caregiver Alerts",
            description: "Instant notifications to trusted family members and volunteers when the system detects situations requiring attention or intervention."
        }
    ]

    return (
        <section className="features" id="features">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">CORE FEATURES</span>
                    <h2>Complete care experience</h2>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
