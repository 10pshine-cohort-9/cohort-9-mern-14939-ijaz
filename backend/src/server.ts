import "dotenv/config";
import app from "./app";
import logger from "./utils/logger";

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});

let isShuttingDown = false;

function gracefulShutdown(signal: string) {
  if (isShuttingDown) {
    logger.info(`${signal} received: shutdown already in progress`);
    return;
  }
  isShuttingDown = true;

  logger.info(`${signal} received: closing HTTP server gracefully`);

  const forceExitTimer = setTimeout(() => {
    logger.error("Forcing shutdown after timeout");
    process.exit(1);
  }, 10000);
  forceExitTimer.unref();

  server.close((err) => {
    if (err) {
      logger.error({ err }, "Error during server close");
      process.exitCode = 1;
      return;
    }

    clearTimeout(forceExitTimer);
    logger.info("HTTP server closed. Exiting process.");
    process.exitCode = 0;
  });
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
