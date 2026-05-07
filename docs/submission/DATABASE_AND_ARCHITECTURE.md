# Database and Architecture

## Architecture

```mermaid
flowchart LR
  Admin["Admin User"] --> Frontend["React Frontend"]
  Frontend --> Backend["Express REST API"]
  Backend --> Validation["Zod Validation"]
  Backend --> Auth["JWT Middleware"]
  Backend --> Supabase["Supabase Client"]
  Supabase --> Database[("PostgreSQL Database")]
```

## Database Model

```mermaid
erDiagram
  CATEGORIES ||--o{ PRODUCTS : groups
  PRODUCTS ||--o{ ORDER_ITEMS : appears_in
  ORDERS ||--o{ ORDER_ITEMS : contains

  CATEGORIES {
    uuid id PK
    text name
    text description
    timestamptz created_at
  }

  PRODUCTS {
    uuid id PK
    text name
    text description
    numeric price
    integer stock
    text status
    text image_url
    uuid category_id FK
  }

  ORDERS {
    uuid id PK
    text customer_name
    text customer_email
    text status
    numeric total_amount
  }

  ORDER_ITEMS {
    uuid id PK
    uuid order_id FK
    uuid product_id FK
    integer quantity
    numeric unit_price
  }
```

## Table Purpose

| Table | Purpose |
| --- | --- |
| `categories` | Product grouping |
| `products` | Catalog records with pricing and stock |
| `orders` | Customer order headers |
| `order_items` | Products and quantities in orders |

## Important Design Decisions

- Products remain in the database when a category is deleted; their category becomes null.
- Order items remain tied to the order; deleting an order removes its items.
- Product deletion does not delete historical order items.
- Supabase service role key is used only in the backend.
- The frontend talks to the Express API instead of directly accessing Supabase.

## Component Hierarchy

```mermaid
flowchart TD
  App --> Login
  App --> Layout
  Layout --> Dashboard
  Layout --> Products
  Layout --> Categories
  Layout --> Orders
  Dashboard --> StatCard
  Products --> Dialog
  Products --> ProductForm
  Products --> ConfirmDialog
  Categories --> Dialog
  Categories --> ConfirmDialog
```

