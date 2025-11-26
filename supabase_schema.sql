-- Create products table
create table if not exists products (
  id bigint primary key generated always as identity,
  name text not null,
  price numeric not null,
  original_price numeric,
  rating numeric,
  reviews int default 0,
  image text,
  category text,
  badge text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create cart_items table
create table if not exists cart_items (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  product_id bigint references products(id) not null,
  quantity int default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table products enable row level security;
alter table cart_items enable row level security;

-- Policies for products (Public read)
create policy "Public products are viewable by everyone"
  on products for select
  using ( true );

-- Policies for cart_items (Users can only see/edit their own items)
create policy "Users can view their own cart items"
  on cart_items for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own cart items"
  on cart_items for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own cart items"
  on cart_items for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own cart items"
  on cart_items for delete
  using ( auth.uid() = user_id );

-- Insert initial product data
insert into products (name, price, original_price, rating, reviews, image, category, badge) values
('Premium Wireless Headphones', 299.99, 399.99, 4.8, 1234, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'Electronics', 'Best Seller'),
('Smart Watch Pro', 449.99, 599.99, 4.9, 892, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', 'Wearables', 'New'),
('Designer Backpack', 129.99, 179.99, 4.7, 567, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', 'Fashion', 'Sale'),
('Premium Sunglasses', 199.99, 249.99, 4.6, 423, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop', 'Accessories', 'Hot'),
('Running Sneakers', 159.99, 199.99, 4.8, 1891, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', 'Footwear', 'Best Seller'),
('Laptop Stand', 79.99, 99.99, 4.5, 234, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop', 'Tech', 'Sale'),
('Leather Wallet', 89.99, 119.99, 4.7, 678, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop', 'Accessories', 'New'),
('Wireless Mouse', 49.99, 69.99, 4.6, 456, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop', 'Tech', 'Hot');
