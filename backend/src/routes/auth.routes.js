import { Router } from "express";
import jwt from "jsonwebtoken";
import { loginSchema, parseBody } from "../validators/schemas.js";

export function createAuthRoutes({ adminEmail, adminPassword, jwtSecret }) {
  const router = Router();

  router.post("/login", (req, res) => {
    const parsed = parseBody(loginSchema, req.body);
    if (!parsed.ok) {
      return res.status(400).json(parsed.error);
    }

    const { email, password } = parsed.data;
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email, role: "admin" }, jwtSecret, { expiresIn: "8h" });
    return res.json({
      token,
      user: {
        email,
        role: "admin"
      }
    });
  });

  return router;
}

