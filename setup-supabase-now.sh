#!/bin/bash

# Supabase Setup Script - Ready to Use
echo "🍜 Setting up Supabase for Nogura Ramen Menu..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp env.example .env.local
    echo "✅ .env.local created"
    echo ""
fi

echo "🔑 Supabase Connection Setup"
echo "================================"
echo ""
echo "Your Supabase connection string:"
echo "postgresql://postgres:[YOUR-PASSWORD]@db.szukelilsmmpsllwtbrd.supabase.co:5432/postgres"
echo ""
echo "⚠️  IMPORTANT: You need to replace [YOUR-PASSWORD] with your actual password!"
echo ""
echo "To get your password:"
echo "1. Go to https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. Go to Settings > Database"
echo "4. Copy the connection string or reset password"
echo ""

# Ask user to update password
read -p "Have you updated .env.local with your actual password? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please update .env.local with your password first, then run this script again."
    echo ""
    echo "To edit .env.local:"
    echo "nano .env.local"
    echo "# or"
    echo "code .env.local"
    exit 1
fi

echo ""
echo "🔧 Setting up database..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Test connection first
echo "🔍 Testing database connection..."
if npm run db:test; then
    echo "✅ Database connection successful!"
    echo ""
    
    # Push schema to database
    echo "🗄️  Pushing database schema to Supabase..."
    npx prisma db push
    
    # Ask if user wants to seed database
    echo ""
    read -p "Do you want to seed the database with initial menu data? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌱 Seeding database with initial data..."
        npm run db:seed
        echo "✅ Database seeded successfully!"
    else
        echo "⏭️  Skipping database seeding"
    fi
    
    echo ""
    echo "🎉 Supabase setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Start development server: npm run dev"
    echo "2. Open Prisma Studio: npm run db:studio"
    echo "3. Test API endpoints: curl http://localhost:3000/.netlify/functions/menu"
    echo ""
    echo "For production deployment:"
    echo "1. Add DATABASE_URL to Netlify environment variables"
    echo "2. Redeploy your site"
    echo ""
    echo "Happy coding! 🍜✨"
    
else
    echo "❌ Database connection failed!"
    echo ""
    echo "Please check:"
    echo "1. Your password in .env.local is correct"
    echo "2. Your Supabase project is running"
    echo "3. Your internet connection is stable"
    echo ""
    echo "Run 'npm run db:test' to test again"
fi
