import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderType = searchParams.get('orderType')
    const categoryId = searchParams.get('categoryId')

    const where: any = {
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
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
        price: Math.round(price * 100), // Convert to cents
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

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    )
  }
}
