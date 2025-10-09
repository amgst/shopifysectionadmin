import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Option A: Client-side persistence only. Server does not use any storage.
  // Health route to indicate no server storage backend
  app.get("/api/health/storage", (_req, res) => {
    res.json({ storage: "none", mode: "client" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
