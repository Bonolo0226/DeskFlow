# DeskFlow

Internal IT Service Request Portal — employees submit tickets, admins triage and resolve them.

## Tech stack
- Frontend: React (Vite), React Router, Axios, Context API for auth
- Backend: Node.js, Express, MVC-lite structure
- Database: MongoDB + Mongoose
- Auth: Simulated JWT (pick a name + role at login, no password)
- Docs: Swagger UI at `/api-docs`

## Setup

### Backend
\`\`\`
cd server
npm install
cp .env.example .env   # fill in your MONGO_URI and JWT_SECRET
npm run dev             # http://localhost:5000
\`\`\`

### Frontend
\`\`\`
cd client
npm install
npm run dev              # http://localhost:5173 (or next available port)
\`\`\`

If the frontend starts on a different port, update `CLIENT_ORIGIN` in `server/.env` to match.

## API docs
http://localhost:5000/api-docs

## API summary
| Method | Route | Role | Description |
|---|---|---|---|
| POST | /api/auth/login | — | Issues a JWT for `{ name, role }` |
| POST | /api/tickets | Employee | Create a ticket |
| GET | /api/tickets | Employee/Admin | Employees see only their own; Admins see all |
| PUT | /api/tickets/:id | Admin | Update ticket status |