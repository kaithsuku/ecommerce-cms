import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp({
  adminEmail: "admin@example.com",
  adminPassword: "admin123",
  jwtSecret: "test-secret",
  supabase: {}
});

test("login succeeds with correct admin credentials", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@example.com", password: "admin123" });

  assert.equal(response.status, 200);
  assert.equal(response.body.user.email, "admin@example.com");
  assert.equal(typeof response.body.token, "string");
});

test("login fails with incorrect credentials", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@example.com", password: "wrong" });

  assert.equal(response.status, 401);
  assert.equal(response.body.error, "Invalid email or password");
});

