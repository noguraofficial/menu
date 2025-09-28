#!/usr/bin/env node

/**
 * Database setup script for Vercel deployment
 * This script will be run after deployment to setup the database schema
 */

const { PrismaClient } = require('@prisma/client')

async function setupDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🚀 Setting up database...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Check if tables exist
    const categories = await prisma.category.findMany()
    const menuItems = await prisma.menuItem.findMany()
    
    console.log(`📊 Found ${categories.length} categories and ${menuItems.length} menu items`)
    
    // If no data, seed the database
    if (categories.length === 0) {
      console.log('🌱 Seeding database...')
      
      // Create categories
      const ramenCategory = await prisma.category.create({
        data: {
          id: 'ramen',
          name: 'Ramen',
          description: 'Authentic Japanese ramen with rich broth',
          icon: '🍜',
          isActive: true,
          priority: 1
        }
      })
      
      const appetizerCategory = await prisma.category.create({
        data: {
          id: 'appetizers',
          name: 'Appetizers',
          description: 'Delicious starters and side dishes',
          icon: '🥟',
          isActive: true,
          priority: 2
        }
      })
      
      const drinkCategory = await prisma.category.create({
        data: {
          id: 'drinks',
          name: 'Drinks',
          description: 'Refreshing beverages',
          icon: '🥤',
          isActive: true,
          priority: 3
        }
      })
      
      const dessertCategory = await prisma.category.create({
        data: {
          id: 'desserts',
          name: 'Desserts',
          description: 'Sweet treats to end your meal',
          icon: '🍮',
          isActive: true,
          priority: 4
        }
      })
      
      const specialCategory = await prisma.category.create({
        data: {
          id: 'specials',
          name: 'Special Menu',
          description: 'Chef\'s special recommendations',
          icon: '⭐',
          isActive: true,
          priority: 5
        }
      })
      
      console.log('✅ Categories created successfully')
      
      // Create sample menu items
      const sampleMenuItems = [
        {
          id: 'tonkotsu-ramen',
          name: 'Tonkotsu Ramen',
          description: 'Rich pork bone broth with chashu pork, soft-boiled egg, and green onions',
          price: 45000,
          categoryId: 'ramen',
          isAvailable: true,
          dineInAvailable: true,
          takeawayAvailable: true,
          packagingOption: true,
          priority: 1
        },
        {
          id: 'miso-ramen',
          name: 'Miso Ramen',
          description: 'Savory miso-based broth with corn, butter, and bean sprouts',
          price: 42000,
          categoryId: 'ramen',
          isAvailable: true,
          dineInAvailable: true,
          takeawayAvailable: true,
          packagingOption: true,
          priority: 2
        },
        {
          id: 'gyoza',
          name: 'Gyoza',
          description: 'Pan-fried pork dumplings with soy-vinegar dipping sauce',
          price: 25000,
          categoryId: 'appetizers',
          isAvailable: true,
          dineInAvailable: true,
          takeawayAvailable: true,
          packagingOption: true,
          priority: 1
        },
        {
          id: 'green-tea',
          name: 'Green Tea',
          description: 'Traditional Japanese green tea',
          price: 8000,
          categoryId: 'drinks',
          isAvailable: true,
          dineInAvailable: true,
          takeawayAvailable: true,
          packagingOption: false,
          priority: 1
        }
      ]
      
      for (const item of sampleMenuItems) {
        await prisma.menuItem.create({ data: item })
      }
      
      console.log('✅ Sample menu items created successfully')
      console.log('🎉 Database setup completed!')
      
    } else {
      console.log('✅ Database already has data, skipping seed')
    }
    
  } catch (error) {
    console.error('❌ Error setting up database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  setupDatabase()
}

module.exports = setupDatabase
