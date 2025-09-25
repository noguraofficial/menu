// Test database connection script
const { PrismaClient } = require('@prisma/client')

async function testConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test table access
    const categoryCount = await prisma.category.count()
    console.log(`📊 Categories in database: ${categoryCount}`)
    
    const menuItemCount = await prisma.menuItem.count()
    console.log(`🍜 Menu items in database: ${menuItemCount}`)
    
    const orderCount = await prisma.order.count()
    console.log(`📋 Orders in database: ${orderCount}`)
    
    // Test creating a test category
    const testCategory = await prisma.category.create({
      data: {
        name: 'Test Category',
        description: 'This is a test category',
        isActive: true
      }
    })
    console.log('✅ Test category created:', testCategory.name)
    
    // Clean up test data
    await prisma.category.delete({
      where: { id: testCategory.id }
    })
    console.log('🧹 Test data cleaned up')
    
    console.log('🎉 Database connection test completed successfully!')
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error(error.message)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Possible solutions:')
      console.log('1. Check your DATABASE_URL in .env.local')
      console.log('2. Make sure your Supabase project is running')
      console.log('3. Verify your database password is correct')
      console.log('4. Check if your IP is whitelisted in Supabase')
    }
    
    if (error.code === 'P1017') {
      console.log('\n💡 Database connection closed. This might be due to:')
      console.log('1. Network issues')
      console.log('2. Database server restart')
      console.log('3. Connection timeout')
    }
    
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testConnection()
