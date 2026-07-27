import './App.css'

function App() {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <div className="brand">
            <svg className="logo" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect width="64" height="64" rx="12" fill="currentColor" />
              <path
                d="M16 28h32M16 36h24M16 44h16"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M44 32v16"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M40 48h8"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="brand-text">
              <h1>10Pearls Shine</h1>
              <span className="tagline">MERN Internship</span>
            </div>
          </div>
          <h2 className="app-title">Notes App</h2>
          <p className="subtitle">
            A full-stack MERN stack notes application built during the
            10Pearls Shine Internship Program
          </p>
          <div className="tech-stack">
            <span className="tech-badge">MongoDB</span>
            <span className="tech-badge">Express.js</span>
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">TypeScript</span>
            <span className="tech-badge">Tailwind CSS</span>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3>Create Notes</h3>
              <p>Write and save notes with rich text formatting support</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                  <path d="M3.3 7 3 9" />
                  <path d="M9 12h6" />
                  <path d="M9 16h4" />
                </svg>
              </div>
              <h3>Organize</h3>
              <p>Categorize notes with tags and folders for easy retrieval</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3>Search & Filter</h3>
              <p>Find notes instantly with full-text search and filters</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Secure Auth</h3>
              <p>JWT-based authentication with secure password hashing</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3>Real-time Sync</h3>
              <p>Instant synchronization across devices with WebSocket</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <h3>Responsive UI</h3>
              <p>Beautiful, accessible UI built with Tailwind CSS</p>
            </article>
          </div>
        </section>

        <section className="tech-details">
          <h2>Tech Stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React 19 + TypeScript</li>
                <li>Vite 8 (Build Tool)</li>
                <li>Tailwind CSS 4 (Styling)</li>
                <li>React Router 7 (Routing)</li>
                <li>React Hook Form + Zod (Forms & Validation)</li>
                <li>Axios (HTTP Client)</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js + Express.js</li>
                <li>TypeScript</li>
                <li>MongoDB + Mongoose</li>
                <li>JWT Authentication</li>
                <li>bcrypt (Password Hashing)</li>
                <li>Zod (Validation)</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>DevOps & Quality</h3>
              <ul>
                <li>ESLint + TypeScript ESLint</li>
                <li>Prettier (Code Formatting)</li>
                <li>GitHub Actions (CI/CD)</li>
                <li>CodeRabbit (Code Review)</li>
                <li>Husky (Git Hooks)</li>
                <li>TypeScript Strict Mode</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="getting-started">
          <h2>Getting Started</h2>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <div>
                <h3>Clone & Install</h3>
                <pre><code>{`git clone https://github.com/your-org/notes-app.git
cd frontend && npm install`}</code></pre>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div>
                <h3>Configure Environment</h3>
                <pre><code>cp .env.example .env
# Add your API URLs</code></pre>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div>
                <h3>Start Development</h3>
                <pre><code>npm run dev
# Runs on http://localhost:5173</code></pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Built with <span aria-label="heart">❤️</span> during the 10Pearls Shine MERN Internship
        </p>
        <p className="cohort">Cohort 9 — Batch 14939 — Ijaz Ullah Khan</p>
      </footer>
    </>
  )
}

export default App