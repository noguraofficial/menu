#!/bin/bash

# Supabase Setup Script for Nogura Ramen Menu
# This script helps setup Supabase database connection

echo "🍜 Setting up Supabase for Nogura Ramen Menu..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp env.example .env.local
    echo "✅ .env.local created from env.example"
    echo ""
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env.local; then
    echo "⚠️  DATABASE_URL not found in .env.local"
    echo ""
    echo "Please follow these steps:"
    echo "1. Go to https://supabase.com"
    echo "2. Create a new project"
    echo "3. Get your connection string from Settings > Database"
    echo "4. Update .env.local with your DATABASE_URL"
    echo ""
    echo "Example DATABASE_URL:"
    echo "DATABASE_URL=\"postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres?schema=public\""
    echo ""
    read -p "Press Enter when you've updated .env.local with DATABASE_URL..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "🗄️  Pushing database schema to Supabase..."
npx prisma db push

# Ask if user wants to seed database
echo ""
read -p "Do you want to seed the database with initial data? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database with initial data..."
    npm run db:seed
    echo "✅ Database seeded successfully!"
else
    echo "⏭️  Skipping database seeding"
fi

echo ""
echo "🎉 Supabase setup completed!"
echo ""
echo "Next steps:"
echo "1. Test the connection: npx prisma studio"
echo "2. Start development server: npm run dev"
echo "3. Test API endpoints: curl http://localhost:3000/.netlify/functions/menu"
echo ""
echo "For production deployment:"
echo "1. Add DATABASE_URL to Netlify environment variables"
echo "2. Redeploy your site"
echo ""
echo "Happy coding! 🍜✨"
