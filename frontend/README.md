# SmartHire

SmartHire is an AI-powered interview preparation app that helps candidates prepare for interviews with tailored questions, skill-gap analysis, preparation plans, and ATS-friendly resumes.

## Tech Stack

- React + Vite
- Node.js + Express
- MongoDB
- JWT Authentication
- OpenRouter AI

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
OPENAI_API_KEY=your_openrouter_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_local_jwt_secret
```

Start backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3000`

> Never commit `.env` files or API keys to GitHub.