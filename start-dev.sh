#!/bin/bash

# Start development servers for Nogura Ramen Menu
echo "🍜 Starting Nogura Ramen Menu development servers..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $API_PID $NEXT_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start local API server in background
echo "🚀 Starting local API server on port 3001..."
npm run api:local &
API_PID=$!

# Wait a moment for API server to start
sleep 3

# Test API server
echo "🔍 Testing API server..."
if curl -s http://localhost:3001/api/categories > /dev/null; then
    echo "✅ API server is running"
else
    echo "❌ API server failed to start"
    exit 1
fi

# Start Next.js development server
echo "🚀 Starting Next.js development server on port 3000..."
npm run dev &
NEXT_PID=$!

echo ""
echo "🎉 Development servers started!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 API Server: http://localhost:3001"
echo ""
echo "Available API endpoints:"
echo "  GET  http://localhost:3001/api/categories"
echo "  GET  http://localhost:3001/api/menu"
echo "  GET  http://localhost:3001/api/orders"
echo "  POST http://localhost:3001/api/orders"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $API_PID $NEXT_PID
