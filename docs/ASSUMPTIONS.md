# Assumptions

## Project Scope

- The system is an admin-only ecommerce CMS for small online stores.
- The goal is to manage catalog, categories, stock, and order status.
- A public customer storefront is out of scope for this version.
- Payment gateway, checkout, shipping provider integration, invoices, and customer accounts are out of scope.

## Authentication

- The app uses simple admin login configured through backend environment variables.
- JWT authentication is sufficient for assignment/demo scope.
- Full production authentication, password reset, email verification, and multi-user account management are out of scope.

## Database

- Supabase PostgreSQL is used for persistent data storage.
- The backend uses the Supabase service role key and must keep it private.
- The frontend communicates only with the Express backend, not directly with Supabase.
- Product image handling uses image URLs, not file upload/storage.

## UI/UX

- The UI is dark-mode only for this version.
- Product and category create/edit actions use dialogs.
- Product and category delete actions require confirmation.
- Order status changes remain inline because they are quick operational updates.
- Tables may horizontally scroll on small screens to preserve data readability.

## Development and Submission

- The project is intended to run locally for demonstration.
- The GitHub repository should remain public for evaluator access.
- Demo data is included so evaluators can immediately see the workflow.
- AI reflection should be written by the student using the provided template, not copied as generated text.

## Known Limitations

- No role-based multi-user system beyond the admin token.
- No audit trail for product/category/order changes.
- No image upload or media library.
- No pagination for large product/order datasets.
- No server-side full-text search beyond basic filtering.
- No deployment-specific configuration is included.

## Future Enhancements

- Supabase Auth or OAuth-based admin accounts.
- Role-based permissions for owner, manager, and staff users.
- Product image upload using Supabase Storage.
- Public storefront integration.
- Pagination, sorting, and export tools for large catalogs.
- Activity log for admin operations.
- Dashboard charts for sales and inventory trends.

