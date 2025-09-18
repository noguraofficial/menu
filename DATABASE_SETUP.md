# Database Setup Guide

## 🚀 Quick Start (Recommended)

Aplikasi sudah siap digunakan tanpa database! Data menu akan diambil dari file statis.

### 1. Jalankan Aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000` dengan data menu lengkap.

## 🗄️ Database Setup (Optional)

Jika ingin menggunakan database untuk fitur admin yang lebih lengkap:

### 1. Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
- Download dari [postgresql.org](https://www.postgresql.org/download/windows/)
- Install dan jalankan service

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Login ke PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE nogura_ramen;

# Create user (optional)
CREATE USER nogura_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE nogura_ramen TO nogura_user;

# Exit
\q
```

### 3. Update Environment Variables

Edit `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/nogura_ramen?schema=public"
```

### 4. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 5. Restart Application

```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## 📊 Database Schema

### Tables

1. **categories** - Menu categories (Ramen, Appetizer, etc.)
2. **menu_items** - Individual menu items with pricing
3. **orders** - Customer orders with status tracking
4. **order_items** - Items within each order

### Key Features

- **Price Storage** - Prices stored in cents (e.g., 40000 = Rp 40,000)
- **Order Types** - Dine In vs Take Away support
- **Packaging Options** - Restaurant packaging vs bring your own
- **Order Status** - Complete order lifecycle tracking

## 🎯 Features Comparison

### Without Database (Current)
- ✅ **Menu Display** - Complete halal menu
- ✅ **Shopping Cart** - Add/remove items
- ✅ **WhatsApp Integration** - Send orders
- ✅ **Responsive Design** - Mobile-first
- ❌ **Admin Panel** - Limited functionality
- ❌ **Order Management** - No persistence

### With Database (Full Features)
- ✅ **Menu Display** - Complete halal menu
- ✅ **Shopping Cart** - Add/remove items
- ✅ **WhatsApp Integration** - Send orders
- ✅ **Responsive Design** - Mobile-first
- ✅ **Admin Panel** - Full CRUD operations
- ✅ **Order Management** - Complete order tracking
- ✅ **Data Persistence** - All data saved to database

## 🚀 Production Deployment

### Vercel + Supabase (Recommended)

1. **Setup Supabase Database**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get database URL

2. **Deploy to Vercel**
   - Connect GitHub repository
   - Add environment variables:
     - `DATABASE_URL` - Your Supabase database URL
     - `NEXTAUTH_SECRET` - Random secret key
     - `NEXTAUTH_URL` - Your Vercel domain

3. **Initialize Production Database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

### Vercel + PlanetScale

1. **Setup PlanetScale Database**
   - Go to [planetscale.com](https://planetscale.com)
   - Create new database
   - Get connection string

2. **Deploy to Vercel**
   - Same as Supabase setup
   - Use PlanetScale connection string

## 🔍 Troubleshooting

### Common Issues

1. **"Prisma client did not initialize"**
   ```bash
   npm run db:generate
   ```

2. **"Database connection failed"**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify database exists

3. **"Permission denied"**
   - Check database user permissions
   - Ensure database exists

4. **"Schema not found"**
   ```bash
   npm run db:push
   ```

### Reset Database

```bash
# Reset and reseed
npx prisma db push --force-reset
npm run db:seed
```

## 📱 Current Status

**✅ Working Features:**
- Menu display with halal items
- Category filtering
- Order type selection (Dine In/Take Away)
- Shopping cart functionality
- WhatsApp order submission
- Responsive mobile design
- Admin panel (basic)

**🔄 Database Ready:**
- Schema created and ready
- API routes with fallback
- Seed data prepared
- Production deployment ready

## 🎉 Next Steps

1. **Use as-is** - Aplikasi sudah siap digunakan
2. **Add Database** - Untuk fitur admin lengkap
3. **Deploy** - Ke Vercel dengan database
4. **Customize** - Sesuaikan menu dan styling

---

**Aplikasi Nogura Ramen Bar siap digunakan!** 🍜✨