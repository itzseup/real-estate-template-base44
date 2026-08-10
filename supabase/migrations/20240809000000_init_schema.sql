-- Schema for real-estate-template-base44
-- Mirrors the base44/ entity definitions in base44/entities/*

-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

----------------------------------------------------------------
-- agents table
----------------------------------------------------------------
create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  bio text,
  avatar_url text,
  properties_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

----------------------------------------------------------------
-- properties table
----------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric(14,2),
  address text,
  city text,
  state text,
  zip_code text,
  country text default 'US',
  bedrooms integer,
  bathrooms integer,
  area_sqft integer,
  property_type text,
  status text default 'for_sale', -- for_sale | for_rent | sold
  featured boolean default false,
  agent_id uuid references public.agents(id) on delete set null,
  image_urls text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists idx_properties_city on public.properties(city);
create index if not exists idx_properties_status on public.properties(status);
create index if not exists idx_properties_featured on public.properties(featured);
create index if not exists idx_properties_price on public.properties(price);

----------------------------------------------------------------
-- blog_posts table
----------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  author_id uuid references public.agents(id) on delete set null,
  published boolean default false,
  published_at timestamp with time zone,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists idx_blog_posts_slug on public.blog_posts(slug);
create index if not exists idx_blog_posts_published on public.blog_posts(published);

----------------------------------------------------------------
-- testimonials table
----------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_avatar text,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  property_id uuid references public.properties(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

----------------------------------------------------------------
-- inquiries table
----------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  property_id uuid references public.properties(id) on delete set null,
  agent_assigned uuid references public.agents(id) on delete set null,
  status text default 'new', -- new | read | replied | archived
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists idx_inquiries_status on public.inquiries(status);
create index if not exists idx_inquiries_property on public.inquiries(property_id);
