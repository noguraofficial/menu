// Debug menu loading error
const { PrismaClient } = require('@prisma/client')

async function debugMenuError() {
  console.log('🔍 Debugging menu loading error...')
  console.log('')

  const prisma = new PrismaClient()

  try {
    // Test database connection
    console.log('1. Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful')
    console.log('')

    // Test categories query
    console.log('2. Testing categories query...')
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { priority: 'asc' }
    })
    console.log(`✅ Found ${categories.length} categories`)
    console.log('Categories:', categories.map(c => c.name))
    console.log('')

    // Test menu items query
    console.log('3. Testing menu items query...')
    const menuItems = await prisma.menuItem.findMany({
      where: { isAvailable: true },
      include: { category: true },
      orderBy: [
        { category: { priority: 'asc' } },
        { priority: 'asc' },
        { name: 'asc' }
      ]
    })
    console.log(`✅ Found ${menuItems.length} menu items`)
    console.log('Menu items:', menuItems.map(m => m.name))
    console.log('')

    // Test dine-in filter
    console.log('4. Testing dine-in filter...')
    const dineInItems = await prisma.menuItem.findMany({
      where: { 
        isAvailable: true,
        dineInAvailable: true 
      },
      include: { category: true }
    })
    console.log(`✅ Found ${dineInItems.length} dine-in items`)
    console.log('')

    // Test takeaway filter
    console.log('5. Testing takeaway filter...')
    const takeawayItems = await prisma.menuItem.findMany({
      where: { 
        isAvailable: true,
        takeawayAvailable: true 
      },
      include: { category: true }
    })
    console.log(`✅ Found ${takeawayItems.length} takeaway items`)
    console.log('')

    // Test serialization
    console.log('6. Testing JSON serialization...')
    const serializedItems = menuItems.map(item => ({
      ...item,
      price: Number(item.price),
      category: {
        ...item.category,
        id: String(item.category.id),
        name: String(item.category.name),
        description: item.category.description ? String(item.category.description) : null,
        icon: item.category.icon ? String(item.category.icon) : null,
        isActive: Boolean(item.category.isActive),
        createdAt: item.category.createdAt ? new Date(item.category.createdAt).toISOString() : null,
        updatedAt: item.category.updatedAt ? new Date(item.category.updatedAt).toISOString() : null
      }
    }))
    
    const jsonString = JSON.stringify(serializedItems)
    console.log(`✅ JSON serialization successful (${jsonString.length} characters)`)
    console.log('')

    console.log('🎉 All database operations working correctly!')
    console.log('')
    console.log('💡 Possible issues:')
    console.log('1. Netlify Functions not deployed properly')
    console.log('2. Environment variables not set in Netlify')
    console.log('3. CORS issues in production')
    console.log('4. Network connectivity issues')
    console.log('')
    console.log('🔧 Next steps:')
    console.log('1. Check Netlify Functions logs')
    console.log('2. Verify environment variables in Netlify')
    console.log('3. Test API endpoints directly')
    console.log('4. Check browser console for errors')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    await prisma.$disconnect()
  }
}

debugMenuError()
