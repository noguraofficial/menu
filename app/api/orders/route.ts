import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/database')
    const body = await request.json()
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
          itemPrice += 8000 // Add packaging fee in cents
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
          create: orderItems.map((item: any) => ({
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

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Database not available for creating orders' },
      { status: 503 }
    )
  }
}

export async function GET() {
  try {
    const { prisma } = await import('@/lib/database')
    
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

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Database not available, returning empty orders:', error)
    return NextResponse.json([])
  }
}
