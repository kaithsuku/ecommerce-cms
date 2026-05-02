# Architecture

## Overview

The application uses a three-layer full-stack architecture:

```text
React Admin UI -> Express REST API -> Supabase PostgreSQL
```

The React frontend handles admin workflows and session storage. The Express API
owns validation, authentication, routing, and database access. Supabase stores
catalog, category, order, and order item data.

## Frontend

The frontend is a Vite React app. It stores the JWT in `localStorage` after login
and sends it in the `Authorization` header for protected API calls.

Major screens:

- Login
- Dashboard
- Products
- Categories
- Orders

## Backend

The backend is an Express API. Routes are grouped by domain:

- Auth routes issue JWTs.
- Product routes manage catalog records.
- Category routes manage catalog structure.
- Order routes expose fulfillment status updates.
- Dashboard routes aggregate database records into operational stats.

Zod validates request bodies before database writes.

## Database

Supabase PostgreSQL stores normalized ecommerce CMS data:

- `categories`
- `products`
- `orders`
- `order_items`

Products reference categories. Order items reference orders and products.

## Data Flow

1. Admin signs in from React.
2. Backend verifies configured admin credentials.
3. Backend returns a JWT.
4. React stores the token.
5. React calls protected endpoints with the token.
6. Express validates requests and calls Supabase.
7. Supabase returns persistent data to the API.
8. React renders dashboard, forms, tables, and order controls.

