# Ecommerce CMS Project Report

## Project Title

Ecommerce Content Management System for Small Online Stores

## Problem Statement

Small online store owners often manage product details, categories, stock, and
orders across spreadsheets, messages, or disconnected tools. This can lead to
outdated product information, stock mistakes, and slow order handling.

This project provides an admin-only ecommerce CMS where store operators can
manage catalog content, organize products into categories, monitor inventory
health, and update order status from one dashboard.

## Objective

The objective is to build a full-stack web application using:

- React frontend
- Express backend
- Supabase PostgreSQL database
- REST API integration
- AI-assisted planning, coding, debugging, and documentation support

## Core Features

| Feature | Description |
| --- | --- |
| Admin login | Simple JWT-based admin authentication |
| Dashboard | Shows product, stock, pending order, and revenue statistics |
| Product management | Add, edit, delete, search, and filter products |
| Category management | Add, edit, and delete product categories |
| Delete warnings | Confirmation dialogs before product/category deletion |
| Order management | View orders and update fulfillment status |
| Responsive UI | Dark admin dashboard layout for desktop, tablet, and mobile |
| Supabase persistence | Data is stored in PostgreSQL tables |

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, CSS, lucide-react |
| Backend | Node.js, Express |
| Validation | Zod |
| Authentication | JSON Web Token |
| Database | Supabase PostgreSQL |
| Testing | Node test runner, Supertest |

## Application Workflow

1. Admin signs in using demo credentials.
2. Backend validates credentials and returns a JWT.
3. Frontend stores the JWT in browser local storage.
4. Admin views dashboard statistics.
5. Admin manages product and category records through dialogs.
6. Admin confirms destructive delete actions.
7. Admin updates order status from the orders page.
8. Backend persists changes in Supabase PostgreSQL.

## Repository Structure

```text
ecommerce-cms/
  backend/       Express API, validation, auth, tests
  frontend/      React UI, pages, components, styles
  docs/          Development and submission documentation
```

## Demo Credentials

```text
Email: admin@example.com
Password: admin123
```

## Setup Summary

1. Install backend and frontend dependencies.
2. Run the SQL from `docs/DATABASE_SCHEMA.md` in Supabase SQL Editor.
3. Add Supabase credentials to `backend/.env`.
4. Run backend on port `4000`.
5. Run frontend on port `5173`.

## Verification

Backend tests:

```bash
cd backend
npm test
```

Frontend tests and build:

```bash
cd frontend
npm test
npm run build
```

