# PawAdopt Client

PawAdopt is the frontend for a pet adoption platform where visitors can browse pets and signed-in users can send adoption requests. I built this client with React, Firebase Authentication, and a small dashboard for adopters and pet owners.

Live site: [https://pawadopt-client.vercel.app](https://pawadopt-client.vercel.app)

## Submission Links

Client-side GitHub Repository: [https://github.com/CreativeGhalib/pawadopt-client](https://github.com/CreativeGhalib/pawadopt-client)

Server-side GitHub Repository: [https://github.com/CreativeGhalib/pawadopt-server](https://github.com/CreativeGhalib/pawadopt-server)

Live Website Link: [https://pawadopt-client.vercel.app](https://pawadopt-client.vercel.app)

## What This App Does

- Shows available pets with search, species filter, and sorting.
- Opens a full pet details page before a user sends an adoption request.
- Keeps private routes stable on reload by waiting for Firebase auth state.
- Lets owners add pets, update listings, delete listings, and review requests.
- Uses toast messages instead of browser alerts.
- Includes dark and light mode.
- Uses Framer Motion for small page and modal transitions.
- Works across mobile, tablet, and desktop layouts.

## Packages Used

| Package | Why it is used |
| --- | --- |
| `react`, `react-dom` | Main UI framework |
| `react-router-dom` | Page routing and private route flow |
| `firebase` | Email/password and Google authentication |
| `axios` | API requests to the backend |
| `react-hot-toast` | Success and error notifications |
| `@heroui/react` | Buttons, chips, avatar, and UI pieces |
| `tailwindcss` | Responsive styling |
| `framer-motion` | Animations |
| `lucide-react` | Icons |

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with banner, featured pets, and static sections |
| `/pets` | Public page for browsing all pets |
| `/pets/:id` | Private pet details and adoption request page |
| `/login` | Login page |
| `/register` | Registration page |
| `/dashboard/my-requests` | User's adoption requests |
| `/dashboard/add-pet` | Add a new pet listing |
| `/dashboard/my-listings` | Manage owner listings and requests |
| `/dashboard/wishlist` | Saved wishlist pets |

## Local Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Run locally:

```bash
npm run dev
```

Build before deployment:

```bash
npm run build
```

## Deployment Notes

The client is deployed on Vercel. The `vercel.json` file rewrites all routes to `index.html`, so direct reloads like `/pets` or `/dashboard/my-requests` do not return a 404.
