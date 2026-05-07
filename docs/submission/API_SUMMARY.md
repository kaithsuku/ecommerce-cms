# API Summary

Base URL:

```text
http://localhost:4000/api
```

Protected routes require:

```http
Authorization: Bearer <token>
```

## Endpoint Summary

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/login` | Admin login and JWT generation |
| `GET` | `/dashboard/stats` | Dashboard statistics |
| `GET` | `/products` | List, search, and filter products |
| `GET` | `/products/:id` | Get product details |
| `POST` | `/products` | Create product |
| `PUT` | `/products/:id` | Update product |
| `DELETE` | `/products/:id` | Delete product |
| `GET` | `/categories` | List categories |
| `POST` | `/categories` | Create category |
| `PUT` | `/categories/:id` | Update category |
| `DELETE` | `/categories/:id` | Delete category |
| `GET` | `/orders` | List orders |
| `GET` | `/orders/:id` | Get one order |
| `PUT` | `/orders/:id/status` | Update order status |

## Example Login Request

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

## Example Product Request

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

## Validation

- Product price and stock cannot be negative.
- Product status must be `active`, `draft`, or `archived`.
- Category name is required and must be unique.
- Order status must be `pending`, `processing`, `shipped`, `delivered`, or `cancelled`.

