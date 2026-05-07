import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("dialog components are available for CRUD workflows", () => {
  const source = read("src/components/Dialog.jsx");
  assert.match(source, /export function Dialog/);
  assert.match(source, /export function ConfirmDialog/);
});

test("products use dialog-based create edit and delete confirmation", () => {
  const source = read("src/pages/Products.jsx");
  assert.match(source, /Add product/);
  assert.match(source, /Edit product/);
  assert.match(source, /Delete product\?/);
  assert.match(source, /ConfirmDialog/);
});

test("categories use dialog-based create edit and delete confirmation", () => {
  const source = read("src/pages/Categories.jsx");
  assert.match(source, /Add category/);
  assert.match(source, /Edit category/);
  assert.match(source, /Delete category\?/);
  assert.match(source, /ConfirmDialog/);
});

