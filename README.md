# PawAdopt Client

A modern, recruiter-friendly pet adoption frontend built with React, Vite, Tailwind CSS, HeroUI, and Firebase Authentication.

## Live URL

**[https://pawadopt-client.vercel.app](https://pawadopt-client.vercel.app)**

## Features

- Browse all available pets with real-time search, species filter, and sort controls
- Detailed pet profiles with a full adoption request form (modal)
- JWT-secured private routes with session persistence on page reload
- Dashboard for managing your own listings, reviewing adoption requests, and tracking sent requests
- Dark / light theme toggle with localStorage persistence
- Smooth Framer Motion animations on hero, cards, and modals
- Fully responsive layout for mobile, tablet, and desktop

## Tech Stack

| Package | Purpose |
|---|---|
| `react` + `react-dom` | UI library |
| `react-router-dom` | Client-side routing |
| `tailwindcss` + `@heroui/react` | Styling and UI components |
| `firebase` | Email/password + Google authentication |
| `axios` | HTTP client with secure interceptor |
| `react-hot-toast` | Toast notifications |
| `framer-motion` | Animations |
| `lucide-react` | Icon set |

## Installation

```bash
# 1. Clone the repository and navigate to the client folder
cd client

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then fill in your Firebase config and backend URL in .env

# 4. Start development server
npm run dev
```

## Environment Variables

Create a `.env` file in the `client/` folder (see `.env.example`):

```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Deployment (Vercel)

1. Push the `client/` folder to a separate GitHub repository.
2. Import the repository on [vercel.com](https://vercel.com).
3. Set the **Root Directory** to `.` (since the repo IS the client).
4. Add all `VITE_*` environment variables in the Vercel dashboard.
5. The included `vercel.json` handles SPA routing, so route reloads do not show 404 errors.

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

6. Deploy. Vercel auto-builds with `npm run build`.
