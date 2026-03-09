# Social Post Application

A full-stack social posting app where users can create posts, view a feed, like/unlike posts, and comment. It also includes authentication with JWT and password reset via email.

## Tech Stack

- Frontend: React, Vite, Axios, React Router
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JWT, bcrypt
- Email: Nodemailer (SMTP)
- Logging/Middleware: morgan, cors
- Container: Docker, Docker Compose, Nginx (frontend)

## Features

- User signup and login
- JWT-protected API routes
- Forgot password and reset password through email link
- Create post (text/image)
- Authenticated feed with latest posts first
- Like/unlike posts
- Add comments to posts

## API Endpoints

### Auth (`/api/auth`)

- `POST /signup`
- `POST /login`
- `POST /forgot-password`
- `POST /reset-password/:token`

### Posts (`/api/post`)

- `POST /` (protected)
- `GET /` (protected)
- `POST /:id/like` (protected)
- `POST /:id/comment` (protected)

## Project Structure

```text
backend/
	controllers/
	models/
	middelwares/
	routes/
	utils/
frontend/
	src/
		Pages/
		styles/
```

## Environment Variables

### Local development (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password_or_app_password
FRONTEND_URL=http://localhost:5173
```

### Docker (`.env` in project root)

Create root `.env` (or copy from `.env.example`):

```env
JWT_SECRET=change_me_jwt_secret
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_app_password
FRONTEND_URL=http://localhost
```

## Run Locally

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Start backend

```bash
cd backend
node index.js
```

### 3. Start frontend

```bash
cd frontend
npm run dev
```

## Docker (Backend)

From `backend/`:

```bash
docker build -t social-post-backend .
docker run -p 5000:5000 social-post-backend
```

## Docker (Backend + Frontend + MongoDB)

Run from project root:

```bash
docker compose up --build
```

App URLs:

- Frontend: `http://localhost`
- Backend API (direct): `http://localhost:5000`

Stop containers:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

## Repository


