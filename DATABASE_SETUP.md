# Database Setup Guide

## Prerequisites

1. **PostgreSQL** - Install PostgreSQL on your system
2. **Node.js** - Version 18 or higher

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nogura_ramen?schema=public"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

Replace `username`, `password`, and `localhost:5432` with your PostgreSQL credentials.

### 3. Create Database

Connect to PostgreSQL and create the database:

```sql
CREATE DATABASE nogura_ramen;
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Database Schema

```bash
npm run db:push
```

### 6. Seed Database

```bash
npm run db:seed
```

### 7. Start Development Server

```bash
npm run dev
```

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Database Schema

### Tables

1. **categories** - Menu categories (Ramen, Appetizer, etc.)
2. **menu_items** - Individual menu items
3. **orders** - Customer orders
4. **order_items** - Items within each order

### Key Features

- **Price Storage**: Prices stored in cents (e.g., 40000 = Rp 40,000)
- **Order Types**: Dine In vs Take Away
- **Packaging Options**: Restaurant packaging vs bring your own
- **Order Status**: Pending, Confirmed, Preparing, Ready, Completed, Cancelled

## Production Deployment

For production deployment, update the `DATABASE_URL` in your environment variables to point to your production PostgreSQL database.

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your `DATABASE_URL` format
2. **Permission Error**: Ensure PostgreSQL user has database access
3. **Schema Error**: Run `npm run db:push` to sync schema

### Reset Database

To reset the database:

```bash
npx prisma db push --force-reset
npm run db:seed
```
