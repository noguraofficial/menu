const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
      const categories = await prisma.category.findMany({
        where: {
          isActive: true
        },
        orderBy: {
          priority: 'asc'
        }
      })

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(categories)
      }
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body)
      const { name, description, icon } = body

      const category = await prisma.category.create({
        data: {
          name,
          description,
          icon
        }
      })

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(category)
      }
    }

    if (event.httpMethod === 'PUT') {
      const { id } = event.queryStringParameters || {}
      const body = JSON.parse(event.body)
      const { name, description, icon, isActive, priority } = body

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Category ID is required' })
        }
      }

      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
          description,
          icon,
          isActive,
          priority
        }
      })

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(category)
      }
    }

    if (event.httpMethod === 'DELETE') {
      const { id } = event.queryStringParameters || {}

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Category ID is required' })
        }
      }

      await prisma.category.delete({
        where: { id }
      })

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Category deleted successfully' })
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

