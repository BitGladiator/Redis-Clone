// Extended Questions Database with Answer Verification

export const QUESTIONS = {
    // TECHNICAL - FRONTEND
    frontend: {
        junior: [
            {
                question: "What is the difference between let, const, and var in JavaScript?",
                expectedPoints: [
                    "var is function-scoped",
                    "let and const are block-scoped",
                    "const cannot be reassigned",
                    "var is hoisted",
                    "let and const have temporal dead zone"
                ],
                commonMistakes: [
                    "saying const makes objects immutable",
                    "confusing scope with hoisting"
                ],
                keyTerms: ["scope", "hoisting", "block", "function", "reassignment"]
            },
            {
                question: "Can you explain what the DOM is and how JavaScript interacts with it?",
                expectedPoints: [
                    "DOM stands for Document Object Model",
                    "tree structure representing HTML",
                    "JavaScript can manipulate DOM elements",
                    "methods like querySelector, getElementById",
                    "can add, remove, or modify elements"
                ],
                commonMistakes: [
                    "confusing DOM with HTML",
                    "not mentioning it's a tree structure"
                ],
                keyTerms: ["document", "tree", "elements", "nodes", "manipulation"]
            },
            {
                question: "What are React hooks and why are they useful?",
                expectedPoints: [
                    "functions that let you use state in functional components",
                    "useState for state management",
                    "useEffect for side effects",
                    "cleaner than class components",
                    "reusable stateful logic"
                ],
                commonMistakes: [
                    "saying hooks work in class components",
                    "not mentioning specific hooks"
                ],
                keyTerms: ["useState", "useEffect", "functional", "state", "lifecycle"]
            },
            {
                question: "Explain the CSS box model.",
                expectedPoints: [
                    "content, padding, border, margin",
                    "each layer wraps around content",
                    "affects element sizing",
                    "box-sizing property controls calculation"
                ],
                commonMistakes: [
                    "confusing order of layers",
                    "not mentioning all four parts"
                ],
                keyTerms: ["content", "padding", "border", "margin", "box-sizing"]
            },
            {
                question: "What is the difference between margin and padding?",
                expectedPoints: [
                    "padding is inside the border",
                    "margin is outside the border",
                    "padding affects background",
                    "margin creates space between elements"
                ],
                commonMistakes: [
                    "reversing their positions"
                ],
                keyTerms: ["padding", "margin", "border", "spacing", "background"]
            },
            {
                question: "How does event bubbling work in JavaScript?",
                expectedPoints: [
                    "events propagate from target to root",
                    "child to parent elements",
                    "can be stopped with stopPropagation",
                    "opposite of event capturing"
                ],
                commonMistakes: [
                    "confusing bubbling with capturing",
                    "saying it goes from parent to child"
                ],
                keyTerms: ["bubbling", "propagation", "target", "parent", "stopPropagation"]
            },
            {
                question: "What is the purpose of useState in React?",
                expectedPoints: [
                    "hook for adding state to functional components",
                    "returns array with state value and setter",
                    "triggers re-render when state changes",
                    "replaces this.state in class components"
                ],
                commonMistakes: [
                    "not mentioning it returns an array",
                    "confusing with useEffect"
                ],
                keyTerms: ["hook", "state", "setter", "re-render", "functional"]
            },
            {
                question: "Explain the difference between == and === in JavaScript.",
                expectedPoints: [
                    "== performs type coercion",
                    "=== checks type and value",
                    "=== is strict equality",
                    "== can have unexpected results"
                ],
                commonMistakes: [
                    "saying they're the same",
                    "not mentioning type coercion"
                ],
                keyTerms: ["equality", "strict", "coercion", "type", "comparison"]
            },
        ],
        mid: [
            "Explain the concept of closures in JavaScript with an example.",
            "How would you optimize the performance of a React application?",
            "What are the differences between REST and GraphQL?",
            "Explain how virtual DOM works in React.",
            "What is memoization and when would you use it?",
            "Describe the React component lifecycle.",
            "How do you handle state management in large applications?",
            "What are Web Workers and when would you use them?",
        ],
        senior: [
            "How would you architect a micro-frontend system?",
            "Explain your approach to designing a component library.",
            "How do you handle security in frontend applications?",
            "Describe strategies for handling 10,000+ items in a list.",
            "How would you implement real-time collaboration in a web app?",
            "Explain your testing strategy for frontend applications.",
            "How do you approach accessibility in complex web applications?",
            "Describe how you would implement offline-first functionality.",
        ],
    },

    // TECHNICAL - BACKEND
    backend: {
        junior: [
            "What is an API and how does REST work?",
            "Explain the difference between SQL and NoSQL databases.",
            "What is middleware in the context of web servers?",
            "How do HTTP methods like GET, POST, PUT, DELETE differ?",
            "What is authentication vs authorization?",
            "Explain what CORS is and why it exists.",
            "What is JSON and why is it commonly used?",
            "How do you handle errors in a Node.js application?",
        ],
        mid: [
            "Explain database indexing and when you would use it.",
            "How would you design an API rate limiter?",
            "What are microservices and their trade-offs?",
            "Explain how OAuth 2.0 works.",
            "How do you handle database migrations?",
            "What is caching and what strategies do you know?",
            "Explain the CAP theorem.",
            "How would you implement a job queue system?",
        ],
        senior: [
            "How would you design a system to handle millions of requests per second?",
            "Explain your approach to distributed system design.",
            "How do you handle data consistency in microservices?",
            "Describe your strategy for zero-downtime deployments.",
            "How would you design a real-time notification system?",
            "Explain event sourcing and CQRS patterns.",
            "How do you approach database sharding?",
            "Describe your monitoring and observability strategy.",
        ],
    },

    // TECHNICAL - FULLSTACK
    fullstack: {
        junior: [
            "Walk me through how a web request flows from browser to server and back.",
            "What tools do you use for version control?",
            "Explain the difference between client-side and server-side rendering.",
            "How do you debug issues across the full stack?",
            "What is a responsive design and how do you implement it?",
            "Explain environment variables and their importance.",
            "What is the purpose of package.json?",
            "How do you secure API endpoints?",
        ],
        mid: [
            "How do you handle authentication across frontend and backend?",
            "Explain your approach to optimizing application performance.",
            "How would you implement real-time features in a web app?",
            "Describe your CI/CD pipeline experience.",
            "How do you manage different environments (dev, staging, prod)?",
            "Explain your testing strategy across the full stack.",
            "How do you handle file uploads in a web application?",
            "What is your approach to API versioning?",
        ],
        senior: [
            "How would you architect a new product from scratch?",
            "Describe your approach to technical debt management.",
            "How do you make build vs buy decisions?",
            "Explain your strategy for scaling an application.",
            "How do you ensure consistent coding standards across teams?",
            "Describe your approach to system design interviews.",
            "How do you handle cross-team technical dependencies?",
            "What's your approach to technology selection?",
        ],
    },

    // TECHNICAL - DATA SCIENCE
    data: {
        junior: [
            "Explain the difference between supervised and unsupervised learning.",
            "What is overfitting and how do you prevent it?",
            "Describe the bias-variance tradeoff.",
            "What is cross-validation and why is it important?",
            "Explain the difference between classification and regression.",
            "What is feature engineering?",
            "How do you handle missing data?",
            "What metrics would you use to evaluate a classification model?",
        ],
        mid: [
            "Explain how gradient descent works.",
            "How would you handle imbalanced datasets?",
            "Describe different regularization techniques.",
            "Explain the mathematics behind logistic regression.",
            "How do you select features for a model?",
            "What is the curse of dimensionality?",
            "Explain different ensemble methods.",
            "How would you deploy a machine learning model?",
        ],
        senior: [
            "How would you design an ML system for recommendations at scale?",
            "Explain your approach to experiment design and A/B testing.",
            "How do you handle model drift in production?",
            "Describe your MLOps strategy.",
            "How would you build a real-time prediction system?",
            "Explain your approach to feature stores.",
            "How do you ensure fairness and reduce bias in ML models?",
            "Describe a complex ML project you've led.",
        ],
    },

    // SYSTEM DESIGN
    systemDesign: {
        junior: [
            "How would you design a URL shortener?",
            "Explain how you would design a simple chat application.",
            "How would you design a todo list application?",
            "Describe how a basic authentication system works.",
        ],
        mid: [
            "How would you design Twitter's feed?",
            "Design a rate limiting system.",
            "How would you design an e-commerce shopping cart?",
            "Design a notification system.",
        ],
        senior: [
            "How would you design YouTube or Netflix?",
            "Design a distributed cache system.",
            "How would you design Uber or Lyft?",
            "Design a global content delivery network.",
        ],
    },

    // BEHAVIORAL
    behavioral: {
        junior: [
            "Tell me about a challenging project you worked on.",
            "How do you handle tight deadlines?",
            "Describe a time you had to learn something new quickly.",
            "How do you prioritize your tasks?",
        ],
        mid: [
            "Tell me about a time you disagreed with your team.",
            "Describe a situation where you had to mentor someone.",
            "How do you handle receiving critical feedback?",
            "Tell me about a time you failed and what you learned.",
        ],
        senior: [
            "Describe your leadership style.",
            "Tell me about a time you had to make a difficult technical decision.",
            "How do you build and maintain team culture?",
            "Describe how you handle conflicts between team members.",
        ],
    },

    // CODING
    coding: {
        junior: [
            "Explain how you would reverse a string in your preferred language.",
            "How would you check if a string is a palindrome?",
            "Describe how you would find duplicates in an array.",
            "Explain the difference between a stack and a queue.",
        ],
        mid: [
            "How would you implement a binary search?",
            "Explain how you would detect a cycle in a linked list.",
            "How would you find the longest substring without repeating characters?",
            "Describe how you would merge two sorted arrays.",
        ],
        senior: [
            "How would you design an LRU cache?",
            "Explain how you would serialize and deserialize a binary tree.",
            "How would you find the median in a stream of integers?",
            "Describe an algorithm to detect if a graph is bipartite.",
        ],
    },
};

export const CATEGORIES = [
    { id: 'frontend', label: 'Frontend', icon: 'Code' },
    { id: 'backend', label: 'Backend', icon: 'Server' },
    { id: 'fullstack', label: 'Fullstack', icon: 'Layers' },
    { id: 'data', label: 'Data Science', icon: 'BarChart' },
    { id: 'systemDesign', label: 'System Design', icon: 'GitBranch' },
    { id: 'behavioral', label: 'Behavioral', icon: 'Users' },
    { id: 'coding', label: 'Coding', icon: 'Terminal' },
];

export const DIFFICULTY_MODIFIERS = {
    easy: {
        label: 'Friendly',
        description: 'Encouraging and helpful interviewer',
        promptPrefix: 'Be very encouraging and provide hints when needed.',
    },
    medium: {
        label: 'Standard',
        description: 'Professional and balanced',
        promptPrefix: 'Be professional and balanced in your assessment.',
    },
    hard: {
        label: 'Challenging',
        description: 'Tough and probing interviewer',
        promptPrefix: 'Be challenging, ask follow-up questions, and probe for deeper understanding.',
    },
};
