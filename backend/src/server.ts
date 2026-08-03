import app from "./app";
import "dotenv/config";
import logger from "./config/logger";

const PORT = process.env.PORT || 3000;

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

  server.close((err) => {
    if (err) {
      logger.error({ err }, "Error during server close");
      process.exitCode = 1;
      return;
    }

    logger.info("HTTP server closed. Exiting process.");
    process.exitCode = 0;
  });

  setTimeout(() => {
    logger.error("Forcing shutdown after timeout");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
