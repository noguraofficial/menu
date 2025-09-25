// Test production deployment
const https = require('https')

async function testProduction(url) {
  console.log('🚀 Testing production deployment...')
  console.log('URL:', url)
  console.log('')

  const endpoints = [
    { name: 'Home Page', path: '/' },
    { name: 'Admin Panel', path: '/admin' },
    { name: 'Categories API', path: '/.netlify/functions/categories' },
    { name: 'Menu API', path: '/.netlify/functions/menu' },
    { name: 'Orders API', path: '/.netlify/functions/orders' }
  ]

  for (const endpoint of endpoints) {
    try {
      const fullUrl = url + endpoint.path
      console.log(`🔍 Testing ${endpoint.name}...`)
      
      const response = await fetch(fullUrl)
      
      if (response.ok) {
        console.log(`✅ ${endpoint.name}: OK (${response.status})`)
      } else {
        console.log(`❌ ${endpoint.name}: FAILED (${response.status})`)
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: ERROR - ${error.message}`)
    }
  }

  console.log('')
  console.log('🎯 Manual tests to perform:')
  console.log('1. Open the URL in your browser')
  console.log('2. Test menu loading and cart functionality')
  console.log('3. Test admin panel at /admin')
  console.log('4. Test category management at /admin/categories')
  console.log('5. Test menu management at /admin/menu')
  console.log('6. Test responsive design on mobile')
  console.log('')
  console.log('📊 Check Netlify Dashboard for:')
  console.log('- Build logs')
  console.log('- Function logs')
  console.log('- Analytics data')
  console.log('- Error reports')
}

// Get URL from command line argument
const url = process.argv[2]

if (!url) {
  console.log('Usage: node test-production.js <URL>')
  console.log('Example: node test-production.js https://amazing-name-123456.netlify.app')
  process.exit(1)
}

testProduction(url)
