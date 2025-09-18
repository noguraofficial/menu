import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderType = searchParams.get('orderType')
    const categoryId = searchParams.get('categoryId')

    // Check if database is available
    const { prisma } = await import('@/lib/database')
    
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

    // Convert BigInt to string for JSON serialization
    const serializedItems = menuItems.map(item => ({
      ...item,
      price: Number(item.price) // Convert BigInt to Number
    }))
    
    return NextResponse.json(serializedItems)
  } catch (error) {
    console.error('Database not available, using fallback data:', error)
    
    // Fallback to static data
    const { dineInMenuItems, dineInCategories } = await import('@/data/menu-dine-in')
    const { takeawayMenuItems, takeawayCategories } = await import('@/data/menu-takeaway')
    
    const orderType = new URL(request.url).searchParams.get('orderType')
    const categoryId = new URL(request.url).searchParams.get('categoryId')
    
    const currentMenuItems = orderType === 'takeaway' ? takeawayMenuItems : dineInMenuItems
    const currentCategories = orderType === 'takeaway' ? takeawayCategories : dineInCategories

    // Filter by category if specified
    let filteredItems = currentMenuItems
    if (categoryId && categoryId !== 'all') {
      filteredItems = currentMenuItems.filter(item => item.category === categoryId)
    }

    // Convert to database format
    const formattedItems = filteredItems.map(item => ({
      ...item,
      categoryId: item.category,
      category: {
        id: item.category,
        name: currentCategories.find(cat => cat.id === item.category)?.name || item.category,
        description: '',
        icon: ''
      }
    }))

    return NextResponse.json(formattedItems)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/database')
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

    // Check if price is already in cents (large number) or in rupiah (smaller number)
    const priceInCents = price > 1000000 ? price : Math.round(price * 100)
    
    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: priceInCents, // Price in cents
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
      { error: 'Database not available for creating menu items' },
      { status: 503 }
    )
  }
}
