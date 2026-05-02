import cors from "cors";
import express from "express";
import { createAuthRoutes } from "./routes/auth.routes.js";
import { createCategoryRoutes } from "./routes/categories.routes.js";
import { createDashboardRoutes } from "./routes/dashboard.routes.js";
import { createOrderRoutes } from "./routes/orders.routes.js";
import { createProductRoutes } from "./routes/products.routes.js";

export function createApp(config) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "ecommerce-cms-api" });
  });

  app.use("/api/auth", createAuthRoutes(config));
  app.use("/api/dashboard", createDashboardRoutes(config));
  app.use("/api/products", createProductRoutes(config));
  app.use("/api/categories", createCategoryRoutes(config));
  app.use("/api/orders", createOrderRoutes(config));

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Unexpected server error" });
  });

  return app;
}

