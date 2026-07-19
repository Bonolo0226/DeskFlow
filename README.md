# DeskFlow

DeskFlow is a full-stack IT service request portal where employees can submit support tickets and administrators can manage, prioritize, and resolve them through a role-based dashboard.

**Live app:** https://desk-flow-cyan.vercel.app
**Live API docs:** https://deskflow-rr2o.onrender.com/api-docs

> Note: the backend runs on Render's free tier, which sleeps after inactivity. The first request after idle time can take 30–60 seconds while it wakes up — that's expected, not a bug.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React (Vite), React Router, Axios, Context API for auth state |
| Backend | Node.js, Express, MVC-lite structure (`routes/ → controllers/ → models/`) |
| Database | MongoDB Atlas + Mongoose |
| Auth | Simulated JWT — pick a name + role at login, no password/user database |
| API docs | Swagger UI at `/api-docs`, generated from JSDoc comments in the route files |
| Deployment | Backend on Render, frontend on Vercel, database on MongoDB Atlas |

## Project Structure

```text
DeskFlow/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   └── app.js
└── README.md
```

## Running it locally

You'll need Node 20.19+ (or 22.12+) and either a local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

### 1. Clone and enter the project

```bash
git clone https://github.com/Bonolo0226/DeskFlow.git
cd DeskFlow
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in:

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=any-long-random-string
CLIENT_ORIGIN=http://localhost:5173

Then start it:
```bash
npm run dev
```

You should see `MongoDB connected` and `DeskFlow API running on http://localhost:5000`.

Swagger docs: **http://localhost:5000/api-docs**

### 3. Frontend

In a second terminal:
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

> If Vite starts on a different port (5174, 5175, etc. — happens if the default port is already in use), update `CLIENT_ORIGIN` in `server/.env` to match, and restart the backend. The two must match exactly or requests will fail with a CORS error.

### 4. Try it out

Open the app, enter any name, toggle **Employee** or **Admin**, and sign in. Submit a ticket as an Employee, then sign in as Admin (in a new tab, or after logging out) to see it and update its status.

## API summary

| Method | Route | Role | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Issues a JWT for `{ name, role }` |
| POST | `/api/tickets` | Employee | Create a ticket (`title`, `description`, `priority`) |
| GET | `/api/tickets` | Employee/Admin | Employees see only their own; Admins see all |
| PUT | `/api/tickets/:id` | Admin | Update ticket `status` |

Full request/response schemas: `/api-docs` (locally or live), or import `server/postman/DeskFlow.postman_collection.json` into Postman.

## Security notes

- `role` is only ever trusted from the verified JWT (`req.user.role`), never from the request body — an employee can't self-promote by editing the payload.
- `.env` is git-ignored on both client and server; `.env.example` documents the required keys with placeholder values.
- The centralized error handler ensures no stack trace ever reaches the client — invalid ObjectIds, missing fields, and bad payloads all return clean JSON with the correct status code (400/401/403/404/500).

## Deployment

- **Backend:** Render — root directory `server`, build command `npm install`, start command `npm start`. Environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN` (set to the deployed frontend's exact URL).
- **Frontend:** Vercel — root directory `client`, framework preset Vite. Environment variable: `VITE_API_URL` set to the deployed backend's URL plus `/api` (e.g. `https://deskflow-rr2o.onrender.com/api`).
- **Database:** MongoDB Atlas free tier, with Network Access allowing connections from anywhere (0.0.0.0/0).

If you redeploy the frontend to a new URL, update `CLIENT_ORIGIN` on Render to match — a mismatch here is the most common cause of a CORS error in production.

## Future Improvements

- Real user registration
- Password hashing with bcrypt
- Email notifications
- Ticket comments
- File attachments
- Search and filtering
- Dashboard analytics

## Author

**Bonolo Leponesa**

GitHub: https://github.com/Bonolo0226

LinkedIn: https://www.linkedin.com/in/bonolo-leponesa-8b226731b/
