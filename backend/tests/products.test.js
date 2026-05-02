import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";

function createSupabaseMock() {
  const products = [];
  const categories = [{ id: "cat-1", name: "Apparel" }];

  const builder = (table) => {
    const state = { table, operation: "select", payload: null, filters: [] };
    const execute = async () => {
      if (state.table === "products" && state.operation === "select") {
        return { data: products, error: null };
      }
      if (state.table === "products" && state.operation === "insert") {
        const record = { id: "product-1", ...state.payload[0] };
        products.push(record);
        return { data: record, error: null };
      }
      if (state.table === "categories" && state.operation === "select") {
        return { data: categories, error: null };
      }
      return { data: null, error: null };
    };

    return {
      select() {
        if (state.operation !== "insert" && state.operation !== "update") {
          state.operation = "select";
        }
        return this;
      },
      insert(payload) {
        state.operation = "insert";
        state.payload = payload;
        return this;
      },
      update(payload) {
        state.operation = "update";
        state.payload = payload;
        return this;
      },
      delete() {
        state.operation = "delete";
        return this;
      },
      eq(column, value) {
        state.filters.push({ column, value });
        return this;
      },
      order() {
        return this;
      },
      single: execute,
      then(resolve, reject) {
        return execute().then(resolve, reject);
      }
    };
  };

  return {
    from(table) {
      return builder(table);
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

test("protected product route rejects missing token", async () => {
  const response = await request(app).get("/api/products");
  assert.equal(response.status, 401);
  assert.equal(response.body.error, "Missing bearer token");
});

test("product creation validates required fields", async () => {
  const token = await getToken();
  const response = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "", price: -1, stock: -2 });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Validation failed");
});

test("product creation accepts valid payload", async () => {
  const token = await getToken();
  const response = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Linen Shirt",
      description: "Lightweight daily shirt",
      price: 59.5,
      stock: 12,
      status: "active",
      image_url: "https://example.com/shirt.jpg",
      category_id: "cat-1"
    });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.name, "Linen Shirt");
});
