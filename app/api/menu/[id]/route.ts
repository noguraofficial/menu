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
    console.error('Error fetching menu item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu item' },
      { status: 500 }
    )
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

    // Price is already in Rupiah, no conversion needed
    const menuItem = await prisma.menuItem.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: price, // Price in Rupiah
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
      { error: 'Failed to update menu item' },
      { status: 500 }
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
      { error: 'Failed to delete menu item' },
      { status: 500 }
    )
  }
}
