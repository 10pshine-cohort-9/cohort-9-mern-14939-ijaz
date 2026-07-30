/**
 * Centralized environment configuration with runtime validation.
 * Reads from process.env and provides typed exports with sensible defaults.
 */

const validNodeEnvs = ["development", "production", "test"] as const;
const validLogLevels = ["fatal", "error", "warn", "info", "debug", "trace", "silent"] as const;

function parsePort(value: string | undefined): number {
  if (value === undefined || value === "") {
    return 3000;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) {
    throw new Error(`Invalid PORT: "${value}". Must be an integer between 0 and 65535.`);
  }
  return parsed;
}

function validateEnum<T extends string>(
  value: string | undefined,
  validValues: readonly T[],
  name: string,
  defaultValue: T,
): T {
  if (value === undefined || value === "") {
    return defaultValue;
  }
  if (!validValues.includes(value as T)) {
    throw new Error(`Invalid ${name}: "${value}". Must be one of: ${validValues.join(", ")}`);
  }
  return value as T;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: parsePort(process.env.PORT),
  NODE_ENV: validateEnum(process.env.NODE_ENV, validNodeEnvs, "NODE_ENV", "development"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  LOG_LEVEL: validateEnum(process.env.LOG_LEVEL, validLogLevels, "LOG_LEVEL", "info"),
} as const;

export type Env = typeof env;
