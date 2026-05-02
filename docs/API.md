# API Documentation

Base URL:

```text
http://localhost:4000/api
```

Protected endpoints require:

```http
Authorization: Bearer <token>
```

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

## Products

### GET `/products`

Optional query params:

```text
search
category_id
status=active|draft|archived
stock=low|out
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

## Categories

### GET `/categories`

Returns all categories ordered by name.

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

## Orders

### GET `/orders`

Returns orders with order items and related product information.

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

