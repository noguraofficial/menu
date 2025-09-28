import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderType = searchParams.get('orderType') || 'dine-in'

    console.log('Admin: Fetching menu items for order type:', orderType)

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

    console.log('Admin: Menu items fetched:', menuItems.length)
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Admin: Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu items', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

