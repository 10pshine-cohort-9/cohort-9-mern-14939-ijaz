export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  LOG_LEVEL:
    (process.env.LOG_LEVEL as "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent") ||
    "info",
} as const;

export type Env = typeof env;
