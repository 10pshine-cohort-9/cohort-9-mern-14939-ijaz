import pino from "pino";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import { env } from "../config/env.js";

const isDevelopment = env.NODE_ENV === "development";

// Read version from package.json synchronously
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgPath = join(__dirname, "..", "..", "package.json");
let version = "1.0.0";
try {
  const pkgContent = readFileSync(pkgPath, "utf-8");
  const pkg = JSON.parse(pkgContent);
  version = pkg.version ?? "1.0.0";
} catch {
  // Fallback to default version if read fails
}

const loggerOptions: pino.LoggerOptions<string, boolean> = {
  level: env.LOG_LEVEL,
  base: {
    service: "cohort-9-mern-14939-ijaz-backend",
    version,
    env: env.NODE_ENV,
  },
  customLevels: {} as Record<string, number>,
};

if (isDevelopment) {
  loggerOptions.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  };
}

const logger = pino<string, boolean>(loggerOptions);

export { logger };
export type Logger = typeof logger;
