🚀 Full-Stack Task Manager API Project (v1)
This project documents the secure, scalable REST API and integrated React client developed for the Backend Developer Internship assignment.

🔗 Live Deployment Status
Component	Host	Live URL
Frontend UI	Vercel	https://restapi-primetrade.vercel.app/
Backend API	Render	https://task-api-server-ckwf.onrender.com/api/v1
🔒 Security & Core Features
The backend architecture focuses on modularity and security, meeting all assignment requirements:

1. Authentication & Security
JWT Protection: The custom protect middleware verifies the token integrity on every secure request, validating the token and extracting user identity without slow database lookups for high performance.

Password Hashing: User passwords are secured using bcrypt.

2. Role-Based Access Control (RBAC)
Restriction: The DELETE /api/v1/task/:taskId endpoint is strictly guarded by the authorize(['admin']) middleware.

Proof: If a standard user attempts deletion, the API returns 403 Forbidden. The frontend UI reflects this by hiding the Delete button for non-admin users.

3. API Design & Data Isolation
CRUD: Full Create, Read, Update, Delete functionality for the Task entity is implemented.

Ownership Check: Every task operation checks user ownership (req.user.id) in the Mongoose query to enforce strict data isolation.

☁️ Scalability & Deployment Readiness Note
The solution is designed for horizontal scalability:

Stateless API: The use of JWTs ensures the server is stateless. This is vital for scalability, as any API instance can handle any request, allowing the application to be scaled horizontally across multiple servers behind a load balancer.

Modularity: The clear separation of code into specialized middleware and controllers makes the architecture ready for easy transition into Microservices (e.g., separating the Auth service from the Task service).

💻 Local Setup Instructions
To run the project locally, ensure you have Node.js (v20+) and MongoDB running.

Backend Setup (Port 5000)
Navigate: cd backend

Install: npm install

Configure: Create a .env file with your PORT ,MONGODB_URI ,JWT_SECRET and JWT_EXPIRES.

Run: node server.js

Frontend Setup
Navigate: cd frontend

Install: npm install

Run: npm run dev (Access the UI via the local URL provided by Vite.)

📝 API Documentation
The complete documentation of all endpoints, including security and examples, is included in this repository:

POSTMAN_COLLECTION.json
