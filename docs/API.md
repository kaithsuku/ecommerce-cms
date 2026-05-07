# API Documentation

Base URL:

```text
http://localhost:4000/api
```

Protected endpoints require:

```http
Authorization: Bearer <token>
```

## Response Format

Successful list/detail responses use a `data` envelope:

```json
{
  "data": {}
}
```

Validation errors return:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "price",
      "message": "Number must be greater than or equal to 0"
    }
  ]
}
```

Authentication errors return:

```json
{
  "error": "Missing bearer token"
}
```

## Status Codes

| Status | Meaning |
| --- | --- |
| `200` | Request completed successfully |
| `201` | Resource created successfully |
| `204` | Resource deleted successfully |
| `400` | Request body failed validation |
| `401` | Missing, invalid, or expired token |
| `404` | Requested record was not found |
| `409` | Conflict such as duplicate category name |
| `500` | Unexpected server/database error |

## Auth

### POST `/auth/login`

Request:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:

```json
{
  "token": "jwt-token",
  "user": {
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

Notes:

- The backend checks credentials against `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- The token expires after 8 hours.
- The frontend stores the token in `localStorage` as `cms_token`.

## Dashboard

### GET `/dashboard/stats`

Response:

```json
{
  "data": {
    "totalProducts": 8,
    "activeProducts": 6,
    "lowStockProducts": 2,
    "outOfStockProducts": 1,
    "pendingOrders": 2,
    "revenue": 874.5
  }
}
```

This endpoint is used by the dashboard cards. It calculates:

- total product count
- active product count
- low-stock product count where stock is between 1 and 5
- out-of-stock product count
- pending order count
- tracked revenue from non-cancelled orders

## Products

### GET `/products`

Optional query params:

```text
search
category_id
status=active|draft|archived
stock=low|out
```

Example:

```http
GET /api/products?search=lamp&status=active&stock=low
```

Response:

```json
{
  "data": [
    {
      "id": "product-uuid",
      "name": "Desk Lamp",
      "description": "Compact warm desk lamp",
      "price": 74,
      "stock": 5,
      "status": "active",
      "image_url": "https://example.com/lamp.jpg",
      "category_id": "category-uuid",
      "categories": {
        "id": "category-uuid",
        "name": "Electronics"
      }
    }
  ]
}
```

### POST `/products`

```json
{
  "name": "Linen Shirt",
  "description": "Lightweight daily shirt",
  "price": 59.5,
  "stock": 12,
  "status": "active",
  "image_url": "https://example.com/shirt.jpg",
  "category_id": "category-uuid"
}
```

### PUT `/products/:id`

Uses the same body as product creation.

### DELETE `/products/:id`

Returns `204 No Content`.

Product validation rules:

| Field | Rule |
| --- | --- |
| `name` | Required, minimum 2 characters |
| `price` | Required, number, cannot be negative |
| `stock` | Required, integer, cannot be negative |
| `status` | One of `active`, `draft`, `archived` |
| `image_url` | Optional URL |
| `category_id` | Optional category UUID |

## Categories

### GET `/categories`

Returns all categories ordered by name.

Response:

```json
{
  "data": [
    {
      "id": "category-uuid",
      "name": "Homeware",
      "description": "Objects for the home",
      "created_at": "2026-05-02T10:00:00.000Z"
    }
  ]
}
```

### POST `/categories`

```json
{
  "name": "Homeware",
  "description": "Objects for the home"
}
```

### PUT `/categories/:id`

Uses the same body as category creation.

### DELETE `/categories/:id`

Returns `204 No Content`.

Category validation rules:

| Field | Rule |
| --- | --- |
| `name` | Required, minimum 2 characters, unique |
| `description` | Optional text |

## Orders

### GET `/orders`

Returns orders with order items and related product information.

Response:

```json
{
  "data": [
    {
      "id": "order-uuid",
      "customer_name": "Anika Rao",
      "customer_email": "anika@example.com",
      "status": "pending",
      "total_amount": 97.5,
      "order_items": [
        {
          "id": "item-uuid",
          "quantity": 1,
          "unit_price": 59.5,
          "products": {
            "id": "product-uuid",
            "name": "Linen Shirt",
            "image_url": "https://example.com/shirt.jpg"
          }
        }
      ]
    }
  ]
}
```

### GET `/orders/:id`

Returns one order with items.

### PUT `/orders/:id/status`

```json
{
  "status": "processing"
}
```

Allowed statuses:

```text
pending, processing, shipped, delivered, cancelled
```

## Endpoint Summary

| Method | Path | Protected | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | No | Admin login |
| `GET` | `/api/dashboard/stats` | Yes | Dashboard metrics |
| `GET` | `/api/products` | Yes | List/search/filter products |
| `GET` | `/api/products/:id` | Yes | Get one product |
| `POST` | `/api/products` | Yes | Create product |
| `PUT` | `/api/products/:id` | Yes | Update product |
| `DELETE` | `/api/products/:id` | Yes | Delete product |
| `GET` | `/api/categories` | Yes | List categories |
| `POST` | `/api/categories` | Yes | Create category |
| `PUT` | `/api/categories/:id` | Yes | Update category |
| `DELETE` | `/api/categories/:id` | Yes | Delete category |
| `GET` | `/api/orders` | Yes | List orders |
| `GET` | `/api/orders/:id` | Yes | Get one order |
| `PUT` | `/api/orders/:id/status` | Yes | Update order status |
