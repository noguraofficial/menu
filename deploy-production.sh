#!/bin/bash

# Production Deployment Script for Nogura Ramen Menu
echo "🍜 Deploying Nogura Ramen Menu to Production..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo "Do you want to continue? (y/n)"
    read -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please commit your changes first"
        exit 1
    fi
fi

# Generate secret key
echo "🔐 Generating secret key..."
SECRET=$(node generate-secret.js | grep "NEXTAUTH_SECRET=" | cut -d'=' -f2)
echo "Secret generated: ${SECRET:0:20}..."
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy to production - $(date)"
git push origin main

echo ""
echo "🚀 Deployment initiated!"
echo ""
echo "Next steps:"
echo "1. Go to https://netlify.com"
echo "2. Connect your GitHub repository"
echo "3. Set build settings:"
echo "   - Build command: npm run build"
echo "   - Publish directory: out"
echo "   - Node version: 18"
echo ""
echo "4. Add environment variables:"
echo "   DATABASE_URL=postgresql://postgres:Nogura123@@db.szukelilsmmpsllwtbrd.supabase.co:5432/postgres?schema=public"
echo "   NEXTAUTH_SECRET=$SECRET"
echo "   NEXTAUTH_URL=https://your-site-name.netlify.app"
echo ""
echo "5. Deploy and test your site!"
echo ""
echo "📋 Test commands:"
echo "   npm run test:production <YOUR_URL>"
echo "   npm run db:test"
echo ""
echo "Happy deploying! 🍜✨"
