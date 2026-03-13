<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&height=200&text=CineTrack&fontSize=70&color=0:1a1a2e,100:e94560&fontColor=ffffff&animation=twinkling&desc=Your%20Personal%20Movie%20Journal&descAlignY=75&descSize=18" width="100%"/>

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Montserrat&weight=600&size=22&pause=1000&color=E94560&center=true&vCenter=true&width=750&lines=Personal+Movie+Tracking+App;React+%2B+TypeScript+%2B+Tailwind+CSS;Rate+%7C+Review+%7C+Track+your+watchlist;Built+with+TypeScript+from+scratch+%F0%9F%9A%80)](https://git.io/typing-svg)

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-cine--track--zeta.vercel.app-e94560?style=for-the-badge)](https://cine-track-zeta.vercel.app)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🎬 What is CineTrack?

**CineTrack** is a personal movie tracking app where you can log every film you've watched, want to watch, or have discarded — complete with your own rating and review.

> Think of it as your **personal IMDb**, but with only the movies that matter to you.

🔗 **Live Demo:** [cine-track-zeta.vercel.app](https://cine-track-zeta.vercel.app)

---

## ✨ Key Features

- 🎥 **Add Movies** — log any film with title, year, rating and personal review
- ⭐ **Personal Rating** — score films from 1 to 10 with a visual star display
- 📝 **Your Review** — write your own take on every movie you've seen
- 🏷️ **Status Tracking** — mark films as `Watched`, `Pending` or `Discarded`
- 🗑️ **Delete Entries** — remove any movie from your list at any time
- 📭 **Empty State** — clean UI feedback when your list is empty

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| Type Safety | TypeScript interfaces & union types |
| Deploy | Vercel |

---

## 🗂️ Project Structure

```
cinetrack/
├── src/
│   ├── types/
│   │   └── index.ts          # Movie interface & EstadoMovie type
│   ├── components/
│   │   ├── MovieCard.tsx      # Individual movie card component
│   │   ├── MovieForm.tsx      # Form to add new movies
│   │   └── MovieList.tsx      # List renderer with empty state
│   ├── App.tsx                # Root component — state & logic
│   ├── main.tsx               # App entry point
│   └── index.css              # Tailwind CSS import
├── .npmrc                     # npm config for dependency resolution
├── vite.config.ts             # Vite + Tailwind plugin config
└── tsconfig.json              # TypeScript config
```

---

## 🧠 TypeScript Concepts Used

This project was built as a hands-on introduction to TypeScript. Key concepts applied:

| Concept | Where |
|---------|-------|
| `interface` | `Movie` shape definition in `types/index.ts` |
| `type` (union) | `EstadoMovie = "vista" \| "pendiente" \| "descartada"` |
| `import type` | Explicit type-only imports across all components |
| Typed props | Every component has its own `Props` interface |
| Typed state | `useState<Movie[]>([])` for the movie list |
| `Record<K, V>` | Color mapping by status in `MovieCard.tsx` |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+

### 1. Clone the repository
```bash
git clone https://github.com/SergioC246/CineTrack.git
cd CineTrack
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Start the dev server
```bash
npm run dev
```

App runs on [http://localhost:5173](http://localhost:5173)

---

## 📄 License

Personal project built to learn TypeScript and modern React patterns. Free to use as inspiration.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,100:e94560&height=100&section=footer" width="100%"/>

**Built with ❤️ by Sergio Córdoba · 2026**

[![GitHub](https://img.shields.io/badge/GitHub-SergioC246-181717?style=for-the-badge&logo=github)](https://github.com/SergioC246)
[![Live](https://img.shields.io/badge/Live-cine--track--zeta.vercel.app-e94560?style=for-the-badge)](https://cine-track-zeta.vercel.app)

</div>