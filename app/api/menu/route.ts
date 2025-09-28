import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderType = searchParams.get('orderType') || 'dine-in'

    console.log('Fetching menu items for order type:', orderType)

    const menuItems = await prisma.menuItem.findMany({
      where: {
        ...(orderType === 'dine-in' 
          ? { dineInAvailable: true }
          : { takeawayAvailable: true }
        )
      },
      include: {
        category: true
      },
      orderBy: [
        { category: { priority: 'asc' } },
        { priority: 'asc' },
        { name: 'asc' }
      ]
    })

    console.log('Menu items fetched:', menuItems.length)
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu items', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Creating menu item:', body)

    const newItem = await prisma.menuItem.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image || null,
        categoryId: body.categoryId,
        isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
        dineInAvailable: body.dineInAvailable !== undefined ? body.dineInAvailable : true,
        takeawayAvailable: body.takeawayAvailable !== undefined ? body.takeawayAvailable : false,
        packagingOption: body.packagingOption || false,
      },
      include: {
        category: true
      }
    })

    console.log('Created item:', newItem)
    return NextResponse.json(newItem)
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to create menu item', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
