# Ecommerce CMS

An admin-only ecommerce content management system for small online stores. The
project demonstrates a React frontend, Express backend APIs, Supabase PostgreSQL
persistence, authentication, documentation, and a working prototype flow for the
FSAD assignment.

## Features

- Admin login with JWT-based session handling
- Dashboard for product, inventory, order, and revenue stats
- Product CRUD with category, price, stock, image URL, and status fields
- Category creation, editing, and deletion
- Order listing with status updates
- Search and filter controls for catalog management
- Supabase PostgreSQL schema and seed data
- Assignment documentation and demo script

## Tech Stack

- Frontend: Vite, React, lucide-react
- Backend: Node.js, Express, Zod, JSON Web Tokens
- Database: Supabase PostgreSQL
- Tests: Node test runner and Supertest

## Setup

Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create backend environment file:

```bash
cd backend
cp .env.example .env
```

Fill in Supabase values in `backend/.env`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=replace_with_local_secret
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=4000
```

Create frontend environment file:

```bash
cd frontend
cp .env.example .env
```

## Supabase Setup

Open Supabase SQL Editor and run the SQL from:

```text
docs/DATABASE_SCHEMA.md
```

That creates the tables and inserts demo categories, products, orders, and order
items.

## Run Locally

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

Default demo credentials:

```text
admin@example.com
admin123
```

## Verification

Backend tests:

```bash
cd backend
npm test
```

Frontend build:

```bash
cd frontend
npm run build
```

## GitHub Remote

This project is intended for the personal GitHub repository:

```bash
git remote add origin git@github-personal:kaithsuku/ecommerce-cms.git
```
