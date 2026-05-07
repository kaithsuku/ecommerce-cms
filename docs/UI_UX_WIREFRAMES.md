# UI/UX Wireframes

The UI is a dark ecommerce admin dashboard inspired by common commerce tools such
as Shopify Admin, without copying a specific product. The interface prioritizes
operational clarity: navigation, tables, filters, dialogs, and confirmation
flows.

## Design Goals

- Keep the UI practical and readable for repeated admin use.
- Use dark graphite surfaces with subtle panel separation.
- Avoid oversized marketing typography and decorative visual effects.
- Keep CRUD workflows focused through dialogs.
- Warn users before destructive delete operations.

## Login Screen

```text
┌──────────────────────────────────────────────┬───────────────────────────┐
│                                              │                           │
│  COMMERCE OPERATIONS                         │  ADMIN ACCESS             │
│  Manage the catalog before it reaches        │  Sign in                  │
│  the customer.                               │                           │
│                                              │  Email                    │
│  A focused CMS for products, stock,          │  [admin@example.com     ] │
│  categories, and order movement.             │                           │
│                                              │  Password                 │
│                                              │  [********             ] │
│                                              │                           │
│                                              │  [ Enter CMS ]            │
└──────────────────────────────────────────────┴───────────────────────────┘
```

UX notes:

- The login page communicates the application purpose without behaving like a marketing landing page.
- Demo credentials can remain prefilled for prototype demonstration.
- Login errors appear near the form action.

## Admin Layout

```text
┌─────────────────────┬────────────────────────────────────────────────────┐
│ Editorial Commerce  │ Page title                         Primary action  │
│ Store operations    │ Supporting description                              │
│                     │                                                    │
│ Dashboard           │ ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│ Products            │ │ Metric     │ │ Metric     │ │ Metric     │       │
│ Categories          │ └────────────┘ └────────────┘ └────────────┘       │
│ Orders              │                                                    │
│                     │ ┌──────────────────────────────────────────────┐   │
│ Sign out            │ │ Data table / operational panel               │   │
│                     │ └──────────────────────────────────────────────┘   │
└─────────────────────┴────────────────────────────────────────────────────┘
```

UX notes:

- Navigation stays persistent on desktop.
- On tablet/mobile, navigation becomes a compact top grid.
- Main content uses panels for operational grouping, not decorative cards.

## Dashboard

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ CONTROL ROOM                                                             │
│ Dashboard                                                                │
│ Catalog health, stock pressure, and order movement at a glance.          │
│                                                                          │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐                  │
│ │ Total products│ │ Active        │ │ Low stock     │                  │
│ │ 8             │ │ 6             │ │ 2             │                  │
│ └───────────────┘ └───────────────┘ └───────────────┘                  │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐                  │
│ │ Out of stock  │ │ Pending orders│ │ Revenue       │                  │
│ │ 1             │ │ 2             │ │ $874.50       │                  │
│ └───────────────┘ └───────────────┘ └───────────────┘                  │
└──────────────────────────────────────────────────────────────────────────┘
```

## Products Page

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ CATALOG                                         [ + Add product ]         │
│ Products                                                                 │
│ Keep product content, pricing, stock, and publish status in one place.   │
│                                                                          │
│ [ Search products             ] [Category] [Status] [Stock]              │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ Product           Category       Price       Stock       Status      │ │
│ │ Linen Shirt       Apparel        $59.50      12          Active  ✎ 🗑 │ │
│ │ Desk Lamp         Electronics    $74.00      5           Active  ✎ 🗑 │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

Product create/edit dialog:

```text
┌──────────────────────────────────────────────┐
│ Add product                              X   │
│ Manage catalog content, pricing, inventory. │
├──────────────────────────────────────────────┤
│ Product name     Category                   │
│ [             ]  [                    v ]   │
│ Price            Stock          Status       │
│ [             ]  [          ]   [Active v]   │
│ Image URL                                    │
│ [                                      ]     │
│ Description                                  │
│ [                                      ]     │
│                         [Cancel] [Save]      │
└──────────────────────────────────────────────┘
```

Delete confirmation:

```text
┌──────────────────────────────────────────────┐
│ Delete product?                         X   │
├──────────────────────────────────────────────┤
│ ⚠ Delete "Linen Shirt"? This action cannot  │
│   be undone.                                │
│                         [Cancel] [Delete]   │
└──────────────────────────────────────────────┘
```

## Categories Page

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ STRUCTURE                                      [ + Add category ]         │
│ Categories                                                               │
│ Organize the catalog into clean buying paths.                            │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ Apparel       Clothing and accessories                         ✎ 🗑 │ │
│ │ Homeware      Objects for daily living                         ✎ 🗑 │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

UX notes:

- Category add/edit uses a smaller dialog than products.
- Category deletion warns that assigned products become unassigned.

## Orders Page

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ FULFILLMENT                                                              │
│ Orders                                                                   │
│ Move orders through simple operational states.                           │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │ Customer       Items       Total       Status          Created        │ │
│ │ Anika Rao      2           $97.50      [pending v]     05/02/2026    │ │
│ │ Rohan Mehta    1           $116.00     [processing v]  05/02/2026    │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

UX notes:

- Order status updates stay inline because they are frequent operational changes.
- Destructive confirmation is not required for status transitions.

## Responsive Behavior

```text
Desktop:
[Sidebar][Main content with tables and panels]

Tablet:
[Top navigation grid]
[Main content with two-column metric panels]

Mobile:
[Compact top navigation]
[Single-column panels]
[Horizontally scrollable tables]
[Dialogs nearly full width]
```

