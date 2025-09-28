import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    console.log('Updating category:', id, body)

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        icon: body.icon,
        isActive: body.isActive,
        priority: body.priority,
      }
    })

    console.log('Updated category:', updatedCategory)
    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category', details: error instanceof Error ? error.message : 'Unknown error' },
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
    
    console.log('Deleting category:', id)

    await prisma.category.delete({
      where: { id }
    })

    console.log('Deleted category successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

