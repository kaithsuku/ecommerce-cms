import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";

function createSupabaseMock() {
  const categories = [];

  return {
    from(table) {
      return {
        select() {
          return this;
        },
        insert(payload) {
          this.payload = payload;
          return this;
        },
        update(payload) {
          this.payload = payload;
          return this;
        },
        delete() {
          return this;
        },
        eq() {
          return this;
        },
        order() {
          return this;
        },
        async single() {
          if (table === "categories" && this.payload) {
            const record = { id: "cat-1", ...this.payload[0] };
            categories.push(record);
            return { data: record, error: null };
          }
          return { data: null, error: null };
        },
        then(resolve, reject) {
          return Promise.resolve({ data: categories, error: null }).then(resolve, reject);
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

test("category creation validates missing name", async () => {
  const token = await getToken();
  const response = await request(app)
    .post("/api/categories")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "" });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Validation failed");
});

test("category creation accepts valid payload", async () => {
  const token = await getToken();
  const response = await request(app)
    .post("/api/categories")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Homeware", description: "Objects for the home" });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.name, "Homeware");
});

