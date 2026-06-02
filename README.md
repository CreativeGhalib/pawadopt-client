# PawAdopt Client

PawAdopt is the frontend for a pet adoption platform where visitors can browse pets and authenticated users can send adoption requests. It includes public browsing pages, private adoption flows, and a small dashboard for adopters and pet owners.

## Live Links

- Live site: https://pawadopt-client.vercel.app/
- Client repository: https://github.com/CreativeGhalib/pawadopt-client
- Server repository: https://github.com/CreativeGhalib/pawadopt-server

## Screenshot

![PawAdopt homepage preview](./public/images/banner-hero.webp)

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Firebase Authentication
- Axios
- React Router
- HeroUI
- Framer Motion

## Main Features

- Browse pets with search, species filter, and sorting
- View pet details before sending an adoption request
- Firebase email/password and Google authentication
- Protected routes that stay stable after reload
- Add, update, and delete pet listings
- Review adoption requests from the dashboard
- Wishlist and user request pages
- Toast notifications, dark mode, and responsive layouts

## Dependencies

Main runtime dependencies from `package.json`:

- `react`, `react-dom`
- `react-router-dom`
- `firebase`
- `axios`
- `@heroui/react`
- `framer-motion`
- `lucide-react`
- `react-hot-toast`

Development dependencies:

- `vite`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `eslint`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`

## Run Locally

Clone the repository:

```bash
git clone https://github.com/CreativeGhalib/pawadopt-client.git
cd pawadopt-client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment Notes

The client is deployed on Vercel. The `vercel.json` file rewrites all routes to `index.html`, so direct route reloads work correctly.
