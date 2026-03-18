<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&height=200&text=CineTrack&fontSize=70&color=0:1a1a2e,100:e94560&fontColor=ffffff&animation=twinkling&desc=Your%20Personal%20Movie%20Journal&descAlignY=75&descSize=18" width="100%"/>

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Montserrat&weight=600&size=22&pause=1000&color=E94560&center=true&vCenter=true&width=750&lines=Personal+Movie+Tracking+App;React+%2B+TypeScript+%2B+Node+%2B+PostgreSQL;Auth0+Google+Login+%7C+TMDB+API+%7C+JWT;Full-Stack+TypeScript+from+scratch+%F0%9F%9A%80)](https://git.io/typing-svg)

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-cine--track--zeta.vercel.app-e94560?style=for-the-badge)](https://cine-track-zeta.vercel.app)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

</div>

---

## 🎬 What is CineTrack?

**CineTrack** is a full-stack personal movie tracking app where you can log every film you've watched, want to watch, or have discarded — complete with your own rating, review and the official movie description pulled automatically from TMDB.

> Think of it as your **personal IMDb**, but with only the movies that matter to you.

🔗 **Live Demo:** [cine-track-zeta.vercel.app](https://cine-track-zeta.vercel.app)

---

## ✨ Key Features

### 🔐 Authentication
- **Email & Password** registration and login with JWT tokens
- **Google Login** via Auth0 — one click, no password needed
- Persistent sessions — stay logged in after page refresh

### 🎥 Movie Management
- **TMDB Search** — search any movie by title and auto-fill title, year, poster and description
- **Manual Entry** — add any film manually if preferred
- **Edit Movies** — update title, year, rating, description, review and status at any time
- **Delete Movies** — remove any entry from your list

### 📊 Personal Stats Dashboard
- Total movies tracked
- Movies watched, pending and discarded
- Average personal rating

### 🎨 UI/UX
- Poster grid layout with movie covers from TMDB
- Color-coded status badges (Watched / Pending / Discarded)
- Star rating display
- Responsive design for desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (Railway) |
| Authentication | JWT + Auth0 (Google OAuth) |
| External API | TMDB (The Movie Database) |
| Deploy Frontend | Vercel |
| Deploy Backend | Railway |

---

## 🧠 TypeScript Concepts Used

This project was built as a hands-on introduction to TypeScript. Key concepts applied throughout the full stack:

| Concept | Where |
|---------|-------|
| `interface` | `Movie`, `User`, `AuthResponse` and all component Props |
| `type` (union) | `EstadoMovie = "vista" \| "pendiente" \| "descartada"` |
| `import type` | Explicit type-only imports across all components |
| Typed props | Every component has its own typed Props interface |
| Typed state | `useState<Movie[]>([])`, `useState<string \| null>()` |
| `Record<K, V>` | Color mapping by status in `MovieCard.tsx` |
| Typed Express requests | Custom `AuthRequest` extending `Request` with `userId` |
| Union type narrowing | `AuthResponse \| ErrorResponse` in auth handling |

---

## 🗂️ Project Structure

```
cinetrack/
├── src/
│   ├── types/
│   │   └── index.ts              # Movie, User, AuthResponse interfaces
│   ├── components/
│   │   ├── AuthForm.tsx          # Email/password login & register form
│   │   ├── MovieSearch.tsx       # TMDB API search component
│   │   ├── MovieForm.tsx         # Add movie form (search + manual)
│   │   ├── MovieCard.tsx         # Individual movie card with poster
│   │   ├── MovieList.tsx         # Responsive grid of movie cards
│   │   ├── EditModal.tsx         # Full movie edit modal
│   │   └── Stats.tsx             # Personal stats dashboard
│   ├── App.tsx                   # Root component — state, auth & logic
│   ├── main.tsx                  # App entry point + Auth0Provider
│   └── index.css                 # Tailwind CSS import
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── auth.ts           # JWT + Auth0 token middleware
│   │   │   └── auth0.ts          # Auth0 JWT bearer config
│   │   ├── routes/
│   │   │   ├── auth.ts           # Register & login endpoints
│   │   │   └── movies.ts         # CRUD movie endpoints
│   │   ├── db.ts                 # PostgreSQL pool connection
│   │   ├── migrate.ts            # Database migrations
│   │   └── index.ts              # Express app entry point
│   ├── nixpacks.toml             # Railway build config
│   └── package.json
├── .env.example                  # Environment variables template
├── .npmrc                        # npm legacy peer deps config
└── vite.config.ts                # Vite + Tailwind plugin config
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register with email & password | ❌ |
| POST | `/api/auth/login` | Login → JWT token | ❌ |
| GET | `/api/movies` | Get all movies for current user | ✅ JWT |
| POST | `/api/movies` | Add a new movie | ✅ JWT |
| PUT | `/api/movies/:id` | Update a movie | ✅ JWT |
| DELETE | `/api/movies/:id` | Delete a movie | ✅ JWT |
| GET | `/api/health` | API health check | ❌ |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- PostgreSQL database (or [Railway](https://railway.app) free tier)
- [TMDB API key](https://www.themoviedb.org/settings/api) (free)
- [Auth0 account](https://auth0.com) (free)

### 1. Clone the repository
```bash
git clone https://github.com/SergioC246/CineTrack.git
cd CineTrack
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

Fill in your `.env`:
```env
VITE_API_URL=http://localhost:3000/api/movies
VITE_TMDB_KEY=your_tmdb_api_key
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
```

And `backend/.env`:
```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
```

### 3. Install dependencies
```bash
# Frontend
npm install --legacy-peer-deps

# Backend
cd backend
npm install
```

### 4. Run database migrations
```bash
cd backend
npx ts-node src/migrate.ts
```

### 5. Start both servers (two terminals)

**Terminal 1 — Frontend:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 — Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:3000
```

---

## 📄 License

Personal project built to learn TypeScript and full-stack development patterns. Free to use as inspiration.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,100:e94560&height=100&section=footer" width="100%"/>

**Built with ❤️ by Sergio Córdoba · 2026**

[![GitHub](https://img.shields.io/badge/GitHub-SergioC246-181717?style=for-the-badge&logo=github)](https://github.com/SergioC246)
[![Live](https://img.shields.io/badge/Live-cine--track--zeta.vercel.app-e94560?style=for-the-badge)](https://cine-track-zeta.vercel.app)

</div>