import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { prisma } = await import('@/lib/database')
    
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    })

    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    // Convert BigInt to Number for JSON serialization
    const serializedItem = {
      ...menuItem,
      price: Number(menuItem.price)
    }

    return NextResponse.json(serializedItem)
  } catch (error) {
    console.error('Database not available, using fallback data:', error)
    
    // Fallback to static data
    const { dineInMenuItems, dineInCategories } = await import('@/data/menu-dine-in')
    const { takeawayMenuItems, takeawayCategories } = await import('@/data/menu-takeaway')
    
    const allItems = [...dineInMenuItems, ...takeawayMenuItems]
    const allCategories = [...dineInCategories, ...takeawayCategories]
    
    const menuItem = allItems.find(item => item.id === params.id)
    
    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    const formattedItem = {
      ...menuItem,
      categoryId: menuItem.category,
      category: {
        id: menuItem.category,
        name: allCategories.find(cat => cat.id === menuItem.category)?.name || menuItem.category,
        description: '',
        icon: ''
      }
    }

    return NextResponse.json(formattedItem)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const menuItem = await prisma.menuItem.update({
      where: { id: params.id },
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

    // Convert BigInt to Number for JSON serialization
    const serializedItem = {
      ...menuItem,
      price: Number(menuItem.price)
    }

    return NextResponse.json(serializedItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Database not available for updating menu items' },
      { status: 503 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { prisma } = await import('@/lib/database')
    
    await prisma.menuItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Database not available for deleting menu items' },
      { status: 503 }
    )
  }
}
