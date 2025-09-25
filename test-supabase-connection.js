// Test Supabase connection script
const { PrismaClient } = require('@prisma/client')

async function testSupabaseConnection() {
  console.log('🍜 Testing Supabase connection...')
  console.log('')
  
  // Connection string yang Anda berikan
  const connectionString = "postgresql://postgres:[YOUR-PASSWORD]@db.szukelilsmmpsllwtbrd.supabase.co:5432/postgres?schema=public"
  
  console.log('📋 Connection Details:')
  console.log('Host: db.szukelilsmmpsllwtbrd.supabase.co')
  console.log('Port: 5432')
  console.log('Database: postgres')
  console.log('Schema: public')
  console.log('')
  
  console.log('⚠️  IMPORTANT: You need to replace [YOUR-PASSWORD] with your actual Supabase password!')
  console.log('')
  console.log('To get your password:')
  console.log('1. Go to https://supabase.com/dashboard')
  console.log('2. Select your project')
  console.log('3. Go to Settings > Database')
  console.log('4. Look for "Database password" or check the connection string')
  console.log('')
  
  // Test with Prisma client
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: connectionString
      }
    }
  })
  
  try {
    console.log('🔍 Testing connection...')
    await prisma.$connect()
    console.log('✅ Connection successful!')
    
    // Test basic query
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('📊 PostgreSQL version:', result[0].version)
    
    // Test table creation (if schema doesn't exist)
    console.log('')
    console.log('📋 Next steps:')
    console.log('1. Update .env.local with your actual password')
    console.log('2. Run: npx prisma generate')
    console.log('3. Run: npx prisma db push')
    console.log('4. Run: npm run db:seed')
    console.log('5. Run: npm run db:test')
    
  } catch (error) {
    console.error('❌ Connection failed:')
    console.error(error.message)
    
    if (error.message.includes('[YOUR-PASSWORD]')) {
      console.log('')
      console.log('💡 You need to replace [YOUR-PASSWORD] with your actual password!')
      console.log('Update the DATABASE_URL in .env.local file')
    }
    
    if (error.code === 'P1001') {
      console.log('')
      console.log('💡 Possible solutions:')
      console.log('1. Check if your password is correct')
      console.log('2. Verify the connection string format')
      console.log('3. Check if your Supabase project is running')
      console.log('4. Make sure your IP is not blocked')
    }
    
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testSupabaseConnection()
