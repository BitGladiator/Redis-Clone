export const QUESTIONS = {
    frontend: {
        junior: [
            "Can you explain the difference between undefined and null in JavaScript?",
            "How does the React Virtual DOM work and why is it faster?",
            "What are the benefits of using CSS Grid over Flexbox, and vice-versa?",
            "Explain the concept of closures in JavaScript with an example.",
            "What is the useEffect hook used for?"
        ],
        mid: [
            "Describe how you would optimize the performance of a React application.",
            "Explain the event loop in JavaScript. How do microtasks differ from macrotasks?",
            "How would you handle state management in a large complex application?",
            "What are the security implications of storing tokens in localStorage vs cookies?",
            "Explain how Server-Side Rendering (SSR) works compared to Client-Side Rendering (CSR)."
        ],
        senior: [
            "Design a scalable frontend architecture for a high-traffic e-commerce site.",
            "How would you implement a custom robust caching strategy for API requests?",
            "Discuss the pros and cons of Micro-Frontends.",
            "How do you approach accessibility (a11y) in a component library used by many teams?",
            "Explain your strategy for handling breaking changes in a shared UI library."
        ]
    },
    backend: {
        junior: [
            "What is the difference between REST and GraphQL?",
            "Explain the ACID properties in databases.",
            "How does a hash map work under the hood?",
            "What is the purpose of an index in a database?",
            "Explain the difference between TCP and UDP."
        ],
        mid: [
            "How would you scale a database to handle millions of requests per second?",
            "Explain the concept of database sharding and when you would use it.",
            "How do you handle distributed transactions across microservices?",
            "What strategies would you use to prevent SQL injection and XSS?",
            "Compare SQL vs NoSQL for a social media feed application."
        ],
        senior: [
            "Design a real-time chat system like WhatsApp. What key technologies would you choose?",
            "How would you implement rate limiting in a distributed system?",
            "Discuss the trade-offs between Event Consistency and Strong Consistency.",
            "How do you ensure high availability and fault tolerance in a cloud-native architecture?",
            "Explain how you would debug a memory leak in a production Node.js service."
        ]
    }
};
