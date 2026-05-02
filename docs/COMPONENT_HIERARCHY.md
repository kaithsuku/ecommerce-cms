# Component Hierarchy

```text
App
  Login
  Layout
    Dashboard
      StatCard
    Products
      ProductForm
    Categories
    Orders
```

## Component Responsibilities

`App`

- Tracks login state.
- Stores and clears the JWT.
- Switches between admin pages.

`Layout`

- Provides the persistent navigation shell.
- Handles page navigation and sign out.

`Login`

- Collects admin credentials.
- Calls the login API.
- Displays authentication errors.

`Dashboard`

- Loads aggregate stats from the backend.
- Shows product, stock, order, and revenue metrics.

`Products`

- Loads products and categories.
- Provides product search and filters.
- Creates, edits, and deletes products.

`ProductForm`

- Shared create/edit form for product data.

`Categories`

- Creates, edits, and deletes product categories.

`Orders`

- Lists orders and updates fulfillment status.
