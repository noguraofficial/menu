const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    if (event.httpMethod === 'GET') {
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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(serializedOrders)
      }
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body)
      const {
        customerName,
        customerPhone,
        orderType,
        orderItems,
        notes,
      } = body

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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(serializedOrder)
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }

  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  } finally {
    await prisma.$disconnect()
  }
}

