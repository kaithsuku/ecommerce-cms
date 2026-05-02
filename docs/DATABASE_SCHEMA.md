# Database Schema

Run this SQL in the Supabase SQL Editor.

```sql
create extension if not exists "pgcrypto";

drop table if exists order_items;
drop table if exists orders;
drop table if exists products;
drop table if exists categories;

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  status text not null default 'active' check (status in ('active', 'draft', 'archived')),
  image_url text,
  category_id uuid references categories(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount numeric(10,2) not null default 0,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0)
);

insert into categories (name, description) values
  ('Apparel', 'Clothing and accessories'),
  ('Homeware', 'Objects for daily living'),
  ('Electronics', 'Small devices and accessories'),
  ('Wellness', 'Care and lifestyle products');

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Linen Shirt', 'Lightweight daily shirt', 59.50, 12, 'active', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b', id from categories where name = 'Apparel';

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Canvas Tote', 'Heavyweight carry-all tote', 38.00, 4, 'active', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7', id from categories where name = 'Apparel';

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Ceramic Cup', 'Stackable glazed cup', 18.00, 0, 'active', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d', id from categories where name = 'Homeware';

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Oak Tray', 'Minimal serving tray', 42.00, 8, 'active', 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e', id from categories where name = 'Homeware';

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Desk Lamp', 'Compact warm desk lamp', 74.00, 5, 'active', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c', id from categories where name = 'Electronics';

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Wireless Charger', 'Low-profile charging pad', 29.00, 14, 'draft', 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f', id from categories where name = 'Electronics';

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Aroma Oil', 'Cedar and citrus blend', 24.00, 3, 'active', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108', id from categories where name = 'Wellness';

insert into products (name, description, price, stock, status, image_url, category_id)
select 'Sleep Mask', 'Soft cotton sleep mask', 22.00, 21, 'archived', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef', id from categories where name = 'Wellness';

insert into orders (customer_name, customer_email, status, total_amount) values
  ('Anika Rao', 'anika@example.com', 'pending', 97.50),
  ('Rohan Mehta', 'rohan@example.com', 'processing', 116.00),
  ('Sara Thomas', 'sara@example.com', 'shipped', 42.00),
  ('Dev Iyer', 'dev@example.com', 'pending', 53.00);

insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price
from orders o, products p
where o.customer_email = 'anika@example.com' and p.name = 'Linen Shirt';

insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price
from orders o, products p
where o.customer_email = 'anika@example.com' and p.name = 'Canvas Tote';

insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price
from orders o, products p
where o.customer_email = 'rohan@example.com' and p.name = 'Desk Lamp';

insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 2, p.price
from orders o, products p
where o.customer_email = 'sara@example.com' and p.name = 'Oak Tray';

insert into order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price
from orders o, products p
where o.customer_email = 'dev@example.com' and p.name = 'Wireless Charger';
```

