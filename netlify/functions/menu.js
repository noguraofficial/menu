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
      const { orderType, categoryId } = event.queryStringParameters || {}

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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(serializedItems)
      }
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body)
      const {
        name,
        description,
        price,
        image,
        categoryId,
        isAvailable,
        dineInAvailable,
        takeawayAvailable,
        packagingOption,
      } = body

      const menuItem = await prisma.menuItem.create({
        data: {
          name,
          description,
          price: price,
          image,
          categoryId,
          isAvailable,
          dineInAvailable,
          takeawayAvailable,
          packagingOption,
        },
        include: {
          category: true,
        },
      })

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(menuItem)
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

