// Fix local development by creating a simple API server
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const PORT = 3001

app.use(express.json())

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// Categories API
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { priority: 'asc' }
    })
    res.json(categories)
  } catch (error) {
    console.error('Categories API error:', error)
    res.status(500).json({ error: 'Database not available' })
  }
})

// Menu API
app.get('/api/menu', async (req, res) => {
  try {
    const { orderType, categoryId } = req.query

    const where = {
      isAvailable: true,
    }

    if (orderType === 'dine-in') {
      where.dineInAvailable = true
    } else if (orderType === 'takeaway') {
      where.takeawayAvailable = true
    }

    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId
    }

    const menuItems = await prisma.menuItem.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: [
        {
          category: {
            priority: 'asc',
          },
        },
        {
          priority: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    })

    // Convert BigInt to Number for JSON serialization
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

    res.json(serializedItems)
  } catch (error) {
    console.error('Menu API error:', error)
    res.status(500).json({ error: 'Database not available' })
  }
})

// Orders API
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            menuItem: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Convert BigInt to Number for JSON serialization
    const serializedOrders = orders.map(order => ({
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map(item => ({
        ...item,
        unitPrice: Number(item.unitPrice)
      }))
    }))

    res.json(serializedOrders)
  } catch (error) {
    console.error('Orders API error:', error)
    res.status(500).json({ error: 'Database not available' })
  }
})

app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      orderType,
      orderItems,
      notes,
    } = req.body

    // Calculate total amount
    let totalAmount = 0
    for (const item of orderItems) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
      })
      
      if (menuItem) {
        let itemPrice = menuItem.price
        if (menuItem.packagingOption && item.useRestaurantPackaging) {
          itemPrice += 8000 // Add packaging fee in Rupiah
        }
        totalAmount += itemPrice * item.quantity
      }
    }

    // Create order with order items
    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        orderType,
        totalAmount,
        notes,
        orderItems: {
          create: orderItems.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            useRestaurantPackaging: item.useRestaurantPackaging,
            notes: item.notes,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            menuItem: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })

    // Convert BigInt to Number for JSON serialization
    const serializedOrder = {
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map(item => ({
        ...item,
        unitPrice: Number(item.unitPrice)
      }))
    }

    res.json(serializedOrder)
  } catch (error) {
    console.error('Orders API error:', error)
    res.status(500).json({ error: 'Database not available' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`)
  console.log('')
  console.log('Available endpoints:')
  console.log(`  GET  http://localhost:${PORT}/api/categories`)
  console.log(`  GET  http://localhost:${PORT}/api/menu`)
  console.log(`  GET  http://localhost:${PORT}/api/orders`)
  console.log(`  POST http://localhost:${PORT}/api/orders`)
  console.log('')
  console.log('Now you can test your app with real database data!')
  console.log('Keep this server running while testing your Next.js app.')
})
