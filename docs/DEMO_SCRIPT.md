# Demo Video Script

Target length: 3 to 5 minutes.

## 1. Introduction

Introduce the project as an ecommerce CMS for small online stores. Explain that
the goal is to manage products, categories, stock, and order status from one
admin dashboard.

## 2. Architecture

Show the repository structure:

- `frontend`: React admin interface
- `backend`: Express REST API
- `docs`: API, database, architecture, and AI usage documentation

Explain the flow:

```text
React -> Express API -> Supabase PostgreSQL
```

## 3. Login

Open the frontend and sign in with the demo admin credentials:

```text
admin@example.com
admin123
```

Mention that the backend returns a JWT and the frontend uses it for protected
API calls.

## 4. Dashboard

Show the dashboard stats:

- Total products
- Active products
- Low-stock products
- Out-of-stock products
- Pending orders
- Revenue

Explain that these values come from Supabase through the backend API.

## 5. Products

Demonstrate:

- Add a product
- Edit a product
- Search by product name
- Filter by category, status, or stock
- Delete a product if needed

## 6. Categories

Create a new category and show how it becomes available in the product form.

## 7. Orders

Open the orders page and update an order status from `pending` to `processing`.

## 8. Closing

Summarize the deliverables:

- Working full-stack prototype
- Supabase schema
- API documentation
- Architecture and component documentation
- AI usage log template

