# Notes App (Frontend)

Frontend for the Notes App — a full-stack notes application built during the 10Pearls Shine MERN Internship.

## Purpose

This is the React + TypeScript frontend for the Notes App. It provides a responsive, accessible UI for creating, organizing, searching, and syncing notes.

## Tech Stack

- React 19 + TypeScript
- Vite 8 (Build Tool)
- CSS Modules / Custom Properties (Styling)
- React Router 7 (Routing)
- React Hook Form + Zod (Forms & Validation)
- Axios (HTTP Client)

## Setup

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Runs the Vite dev server on `http://localhost:5173` with HMR.

## Build

```bash
npm run build
```

Outputs production build to `dist/`.

## Lint & Format

```bash
npm run lint      # ESLint
npm run format    # Prettier
npm run typecheck # TypeScript compile check
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API clients (Axios)
│   ├── types/          # Shared TypeScript types
│   ├── utils/          # Utility functions
│   ├── App.tsx         # App entry point
│   ├── App.css         # Global styles + CSS custom properties
│   └── main.tsx        # React DOM mount
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Environment Variables

No frontend-specific environment variables are required at this time. The API base URL is configured via the backend.

## Notes

- This app uses plain CSS with custom properties (no Tailwind).
- Ensure the backend server is running on `http://localhost:3000` for API calls to work.