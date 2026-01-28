import './Testimonials.css'

export default function Testimonials() {
    const testimonials = [
        {
            text: "A safe companion that truly cares. My mother loves her daily conversations and I have peace of mind.",
            author: "Sarah M., Daughter"
        },
        {
            text: "The privacy-first approach makes all the difference. I trust this system completely with my father's wellbeing.",
            author: "James T., Son"
        },
        {
            text: "It detected when my grandmother hadn't eaten properly for two days and alerted me immediately. Life-changing technology.",
            author: "Maria K., Granddaughter"
        }
    ]

    return (
        <section className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2>What families say about us</h2>
                    <button className="btn-see-all">See All</button>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <p>{testimonial.text}</p>
                            <div className="testimonial-author">{testimonial.author}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
