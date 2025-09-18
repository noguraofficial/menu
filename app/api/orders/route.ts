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
          itemPrice += 800000 // Add packaging fee in cents (8000 rupiah = 800000 cents)
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

    // Convert BigInt to Number for JSON serialization
    const serializedOrder = {
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map(item => ({
        ...item,
        unitPrice: Number(item.unitPrice)
      }))
    }
    
    return NextResponse.json(serializedOrder)
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

    // Convert BigInt to Number for JSON serialization
    const serializedOrders = orders.map(order => ({
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map(item => ({
        ...item,
        unitPrice: Number(item.unitPrice)
      }))
    }))
    
    return NextResponse.json(serializedOrders)
  } catch (error) {
    console.error('Database not available, returning empty orders:', error)
    return NextResponse.json([])
  }
}
