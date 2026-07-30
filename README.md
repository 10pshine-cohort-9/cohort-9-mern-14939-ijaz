# Notes App

A Notes Application under development during the 10Pearls Shine MERN Internship.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL (Implemented via Prisma + NeonDB)

### Code Quality
- ESLint
- Prettier
- GitHub Actions
- CodeRabbit
- SonarQube (Planned)

## Project Structure

```text
.
├── backend/
├── frontend/
├── docs/
└── .github/
```

## Development

First, install root dependencies (includes pre-commit tooling):

```bash
npm install
```

### Backend

```bash
cd backend
cp .env.example .env
# Configure DATABASE_URL in .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Current Status

- ✅ Project initialized
- ✅ TypeScript configured
- ✅ ESLint configured
- ✅ Prettier configured
- ✅ GitHub Actions configured
- ⏳ Authentication
- ⏳ Notes CRUD
- ⏳ Rich Text Editor
- ⏳ Testing