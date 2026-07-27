import "dotenv/config";
import type { Server } from "node:http";

import { app } from "./app.js";
import { disconnectPrisma } from "./config/prisma.js";

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

let isShuttingDown = false;

// Gracefully shut down the HTTP server on termination signals.

function gracefulShutdown(signal: string): void {
  if (isShuttingDown) {
    console.log(`${signal} received: shutdown already in progress`);
    return;
  }
  isShuttingDown = true;

  console.log(`${signal} received: closing HTTP server gracefully`);

  server.close(async (err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }

    console.log("HTTP server closed. Disconnecting Prisma...");

    try {
      await disconnectPrisma();
      console.log("Prisma disconnected. Exiting process.");
      process.exit(0);
    } catch (prismaErr) {
      console.error("Error during Prisma disconnect:", prismaErr);
      process.exit(1);
    }
  });

  // Safety net: force exit if connections don't close in time
  setTimeout(() => {
    console.error("Forcing shutdown after timeout");
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
