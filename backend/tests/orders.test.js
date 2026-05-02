import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";

function createSupabaseMock() {
  return {
    from() {
      return {
        select() {
          return this;
        },
        update(payload) {
          this.payload = payload;
          return this;
        },
        eq() {
          return this;
        },
        order() {
          return this;
        },
        async single() {
          return { data: { id: "order-1", status: this.payload.status }, error: null };
        },
        then(resolve, reject) {
          return Promise.resolve({ data: [], error: null }).then(resolve, reject);
        }
      };
    }
  };
}

const app = createApp({
  adminEmail: "admin@example.com",
  adminPassword: "admin123",
  jwtSecret: "test-secret",
  supabase: createSupabaseMock()
});

async function getToken() {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@example.com", password: "admin123" });
  return response.body.token;
}

test("order status update rejects invalid statuses", async () => {
  const token = await getToken();
  const response = await request(app)
    .put("/api/orders/order-1/status")
    .set("Authorization", `Bearer ${token}`)
    .send({ status: "lost" });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Validation failed");
});

test("order status update accepts valid statuses", async () => {
  const token = await getToken();
  const response = await request(app)
    .put("/api/orders/order-1/status")
    .set("Authorization", `Bearer ${token}`)
    .send({ status: "processing" });

  assert.equal(response.status, 200);
  assert.equal(response.body.data.status, "processing");
});

