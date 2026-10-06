import { useMemo, useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import Navbar from "../../auth/components/Navbar.jsx";

// const interviewData = {
//   technicalQuestions: [
//     {
//       question: "In your Bank Transaction Backend System, you implemented idempotent transaction APIs. Can you explain how you achieved idempotency and why it is critical for financial transactions?",
//       intention: "To evaluate the candidate's understanding of distributed systems concepts, API design, and practical backend engineering experience with idempotency.",
//       answer: "Idempotency ensures that making the same request multiple times yields the same result without unintended side effects. In my Bank Transaction Backend System, I achieved this by requiring clients to send a unique request identifier, such as a UUID, in the request headers or payload. Before processing a transfer, the server checks if a transaction with that identifier already exists in MongoDB. If it does, the server returns the cached response of the original transaction instead of executing a duplicate transfer."
//     },
//     {
//       question: "How do you handle authentication and protected routes in your MERN stack applications, and what role does JWT play?",
//       intention: "To assess security implementation practices, token-based session handling, and understanding of REST API security.",
//       answer: "I handle authentication by issuing a JSON Web Token (JWT) upon successful user login or signup. The client stores this token, typically in an HTTP-only cookie or local storage, and includes it in the Authorization header for subsequent requests to protected routes. On the backend, an Express middleware verifies the JWT signature and expiration, attaching the decoded user payload to the request object before passing control to the controller."
//     },
//     {
//       question: "Can you explain how you used React Router Data APIs, such as loaders, in your E-commerce Web-application and why you chose them over traditional useEffect fetching?",
//       intention: "To test modern React routing knowledge, performance optimization strategies, and frontend data management proficiency.",
//       answer: "React Router loaders allow data fetching to happen concurrently with route transitions rather than rendering the component first and fetching data inside a useEffect hook. This eliminates waterfalls and loading spinners inside the component tree, as the route data is fully loaded before the component renders, resulting in a smoother user experience."
//     },
//     {
//       question: "How do you optimize MongoDB queries, especially when dealing with complex data retrieval like the aggregation pipelines you used in your bank transaction system?",
//       intention: "To evaluate database design skills, query optimization capability, and MongoDB proficiency.",
//       answer: "To optimize MongoDB queries, I ensure appropriate indexes are created on fields frequently used in query filters, sorting, and joins (lookup stages). For aggregation pipelines, I structure the pipeline to filter out unnecessary documents using the $match stage as early as possible to reduce the dataset size before performing heavier operations like $group or $lookup."
//     },
//     {
//       question: "In your AI Code Reviewer project, how did you integrate the Google Gemini API, and how did you manage asynchronous state and error handling on the backend?",
//       intention: "To assess third-party API integration skills, asynchronous JavaScript handling, and robust error management.",
//       answer: "I integrated the Google Gemini API by setting up an Express endpoint that receives the user-submitted code from the frontend, formats a prompt, and makes an asynchronous HTTP call using Axios or the official SDK to the Gemini model. I used async/await syntax wrapped in try-catch blocks to handle potential network failures, rate limits, or invalid API responses gracefully, returning appropriate HTTP status codes and error messages to the client."
//     }
//   ],
//   behavioralQuestions: [
//     {
//       question: "Can you describe a time when you had to collaborate with a cross-functional team or incorporate feedback, similar to your experience as a UI/UX intern?",
//       intention: "To evaluate teamwork, communication skills, and the ability to accept and incorporate constructive feedback.",
//       answer: "During my UI/UX internship at the Computer Society of India, I frequently participated in design reviews and brainstorming sessions. Once, while designing an interface flow, stakeholders suggested simplifying the navigation steps to reduce user friction. I listened to their feedback, asked clarifying questions to understand their perspective, and updated the Figma prototypes within the same day to present a streamlined user flow that met all project requirements."
//     },
//     {
//       question: "Tell me about a challenging technical problem you faced while building your E-commerce or Banking application and how you resolved it.",
//       intention: "To assess problem-solving methodology, debugging skills, and resilience when encountering obstacles.",
//       answer: "When building the Bank Transaction Backend System, I faced issues with duplicate transactions occurring during network retries. I researched best practices for financial APIs and realized I needed idempotency keys. I designed a middleware to check request identifiers against MongoDB before executing the transfer logic, which successfully resolved the issue and prevented duplicate money transfers."
//     },
//     {
//       question: "How do you prioritize your tasks and manage your time when working on multiple features or projects simultaneously?",
//       intention: "To evaluate organization, planning, and task management abilities.",
//       answer: "When balancing coursework and multiple development projects, I break down larger requirements into smaller, manageable tasks and use a task board to track progress. I prioritize features based on core functionality first, such as getting authentication and basic CRUD operations working before moving on to secondary enhancements like UI styling or third-party integrations."
//     },
//     {
//       question: "Describe a situation where you had to learn a new technology or tool quickly to complete a project.",
//       intention: "To test adaptability, continuous learning capability, and technical curiosity.",
//       answer: "When building the AI Code Reviewer, I needed to implement syntax highlighting for code snippets, which I hadn't done before. I quickly reviewed the documentation for Prism.js, experimented with integrating it into the React component structure, and successfully rendered highlighted code within a short timeframe, enhancing the user experience."
//     },
//     {
//       question: "Can you share an example of how you ensure the quality and maintainability of the code you write?",
//       intention: "To assess code quality standards, architectural awareness, and commitment to clean code.",
//       answer: "In my E-commerce application, I focused on maintaining a scalable folder structure and component-based architecture. I separate concerns by keeping business logic, API calls, and UI components distinct. I also write clean, readable code with consistent naming conventions and modularize components so they can be easily reused and tested."
//     }
//   ],
//   skillGaps: [
//     { skill: "Advanced automated testing (Jest, Cypress, or Mocha)", severity: "medium" },
//     { skill: "Cloud deployment and containerization (Docker, AWS, or similar cloud platforms)", severity: "high" },
//     { skill: "TypeScript for type-safe full-stack development", severity: "medium" }
//   ],
//   matchScore: 85,
//   preparationPlan: [
//     {
//       day: 1,
//       focus: "Core MERN Architecture Review",
//       tasks: [
//         "Review end-to-end request-response cycle in MERN applications",
//         "Brush up on Express routing, middleware patterns, and error handling",
//         "Review MongoDB schema design best practices and document relationships"
//       ]
//     },
//     {
//       day: 2,
//       focus: "Advanced Backend Concepts & Security",
//       tasks: [
//         "Deep dive into OAuth 2.0 authentication flows and JWT implementation details",
//         "Review idempotency patterns and how to handle distributed transaction safety",
//         "Practice writing complex MongoDB aggregation pipeline queries"
//       ]
//     }
//   ]
// };

const tabs = [
  { key: "technicalQuestions", label: "Technical questions" },
  { key: "behavioralQuestions", label: "Behavioral questions" },
  { key: "preparationPlan", label: "Road Map" }
];

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technicalQuestions");
  const { report } = useInterview();

  const currentItems = useMemo(() => {
    if (activeTab === "preparationPlan") {
      return report?.preparationPlan || [];
    }

    return report?.[activeTab] || [];
  }, [activeTab, report]);

  return (
    <main className="interview-page">
        <Navbar/>
      <div className="interview-shell">
        <aside className="interview-sidebar">
          <nav className="interview-nav" aria-label="Interview sections">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`nav-item ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="interview-main">
          {currentItems.length > 0 ? (
            activeTab === "preparationPlan" ? (
              <div className="roadmap-panel">
                {currentItems.map((plan) => (
                  <div key={plan.day || plan.focus} className="roadmap-card">
                    <span className="roadmap-day">Day {plan.day}</span>
                    <h3>{plan.focus}</h3>
                    <ul>
                      {(plan.tasks || []).map((task) => (
                        <li key={task}>
                          <span className="task-pointer">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="question-panel">
                {currentItems.map((item, index) => (
                  <article className="question-card" key={`${item.question}-${index}`}>
                    <div className="question-header">
                      <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{item.question}</h3>
                    </div>
                    <div className="question-meta">
                      <span className="badge">Intention</span>
                      <p>{item.intention}</p>
                    </div>
                    <div className="question-meta">
                      <span className="badge">Answer</span>
                      <p>{item.answer}</p>
                    </div>
                    <div className="divider" />
                  </article>
                ))}
              </div>
            )
          ) : (
            <div className="empty-state">here will be the main content</div>
          )}
        </section>

        <aside className="interview-insights">
          <div className="skill-card">
            <div className="match-score-wrap">
              <div className="match-score-circle">
                <span>{report?.matchScore ?? 0}</span>
              </div>
            </div>

            <div className="skill-card__header">
              <h3>Skill Gaps</h3>
              <span className="skill-card__icon">↗</span>
            </div>

            <div className="skill-tags">
              {(report?.skillGaps || []).map(({ skill, severity }) => (
                <span key={skill} className={`skill-tag ${severity}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;