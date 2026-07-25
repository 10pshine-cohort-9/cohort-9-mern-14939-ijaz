import "dotenv/config";
import type { Server } from "node:http";

import { app } from "./app.js";

const PORT: number = Number(process.env.PORT) || 3000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Gracefully shut down the HTTP server on termination signals.

function gracefulShutdown(signal: string): void {
  console.log(`${signal} received: closing HTTP server gracefully`);

  server.close((err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }

    console.log("HTTP server closed. Exiting process.");
    process.exit(0);
  });

  // Safety net: force exit if connections don't close in time
  setTimeout(() => {
    console.error("Forcing shutdown after timeout");
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
