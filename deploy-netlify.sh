#!/bin/bash

# Netlify Deployment Script for Nogura Ramen Menu

echo "🍜 Preparing Nogura Ramen Menu for Netlify deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Your application is ready for Netlify deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub/GitLab/Bitbucket"
    echo "2. Connect your repository to Netlify"
    echo "3. Set build command: npm run build"
    echo "4. Set publish directory: out"
    echo "5. Add environment variables in Netlify dashboard:"
    echo "   - DATABASE_URL"
    echo "   - NEXTAUTH_SECRET"
    echo "   - NEXTAUTH_URL"
    echo ""
    echo "📖 For detailed instructions, see NETLIFY_DEPLOYMENT.md"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

