// Test production API endpoints
const https = require('https')

async function testProductionAPI(url) {
  console.log('🔍 Testing production API endpoints...')
  console.log('URL:', url)
  console.log('')

  const endpoints = [
    { name: 'Categories API', path: '/.netlify/functions/categories' },
    { name: 'Menu API (Dine-in)', path: '/.netlify/functions/menu?orderType=dine-in' },
    { name: 'Menu API (Takeaway)', path: '/.netlify/functions/menu?orderType=takeaway' },
    { name: 'Menu API (All)', path: '/.netlify/functions/menu' },
    { name: 'Orders API', path: '/.netlify/functions/orders' }
  ]

  for (const endpoint of endpoints) {
    try {
      const fullUrl = url + endpoint.path
      console.log(`🔍 Testing ${endpoint.name}...`)
      console.log(`   URL: ${fullUrl}`)
      
      const response = await fetch(fullUrl)
      
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ ${endpoint.name}: OK (${response.status})`)
        
        if (Array.isArray(data)) {
          console.log(`   📊 Found ${data.length} items`)
          if (data.length > 0) {
            console.log(`   📝 Sample: ${data[0].name || data[0].id || 'N/A'}`)
          }
        } else if (typeof data === 'object') {
          console.log(`   📊 Response: ${JSON.stringify(data).substring(0, 100)}...`)
        }
      } else {
        console.log(`❌ ${endpoint.name}: FAILED (${response.status})`)
        const errorText = await response.text()
        console.log(`   Error: ${errorText.substring(0, 200)}...`)
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: ERROR - ${error.message}`)
    }
    console.log('')
  }

  console.log('🎯 Manual tests to perform:')
  console.log('1. Open the URL in your browser')
  console.log('2. Check browser console for errors')
  console.log('3. Test menu loading on home page')
  console.log('4. Test admin panel at /admin')
  console.log('5. Test category management at /admin/categories')
  console.log('')
  console.log('🔧 If APIs are failing:')
  console.log('1. Check Netlify Functions logs')
  console.log('2. Verify DATABASE_URL environment variable')
  console.log('3. Check if Supabase database is accessible')
  console.log('4. Verify CORS settings')
}

// Get URL from command line argument
const url = process.argv[2]

if (!url) {
  console.log('Usage: node test-production-api.js <URL>')
  console.log('Example: node test-production-api.js https://amazing-name-123456.netlify.app')
  process.exit(1)
}

testProductionAPI(url)
