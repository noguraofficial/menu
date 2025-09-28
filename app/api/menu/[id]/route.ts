import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    console.log('Updating menu item:', id, body)

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        categoryId: body.categoryId,
        isAvailable: body.isAvailable,
        dineInAvailable: body.dineInAvailable,
        takeawayAvailable: body.takeawayAvailable,
        packagingOption: body.packagingOption || false,
      },
      include: {
        category: true
      }
    })

    console.log('Updated item:', updatedItem)
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to update menu item', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    console.log('Deleting menu item:', id)

    await prisma.menuItem.delete({
      where: { id }
    })

    console.log('Deleted item successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Failed to delete menu item', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

