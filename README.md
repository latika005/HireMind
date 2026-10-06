<img width="864" height="326" alt="image" src="https://github.com/user-attachments/assets/eaa788d3-6245-47e1-8a0b-e1bc5e145cdf" />


Resume Analysis and Career Recommendation System is a full-stack web application that uses Natural Language Processing (NLP) and Generative AI to analyze resumes in relation to a target job description. The system securely authenticates users, accepts resume PDFs, and extracts their textual content using PDF-Parse. The extracted resume text is combined with the candidate’s self-description and the target job description to provide contextual input for AI analysis.

Using Google Gemini AI, the system performs semantic analysis of the provided text to identify relevant technical and behavioral skills, assess the candidate–job alignment, detect skill gaps, and generate personalized career-oriented insights and questions. The AI response is constrained to a predefined structure using Zod and JSON Schema, ensuring that the generated information is consistent, validated, and suitable for presentation within the application.

The application follows a React.js frontend and Node.js/Express.js backend architecture, with MongoDB used for persistent storage and JWT-based cookie authentication for secure user sessions. Overall, the system demonstrates the integration of NLP, document processing, Generative AI, structured output validation, and full-stack web development into a practical resume-analysis workflow.
