import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { prisma } = await import('@/lib/database')
    
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Database not available, using fallback data:', error)
    
    // Fallback to static data
    const { dineInCategories } = await import('@/data/menu-dine-in')
    
    const category = dineInCategories.find(cat => cat.id === params.id)
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    const formattedCategory = {
      ...category,
      isActive: true,
      description: '',
      icon: ''
    }

    return NextResponse.json(formattedCategory)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { prisma } = await import('@/lib/database')
    const body = await request.json()
    const { name, description, icon, isActive, priority } = body

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        description,
        icon,
        isActive,
        priority: priority !== undefined ? priority : 0,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Database not available for updating categories' },
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
    
    await prisma.category.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Database not available for deleting categories' },
      { status: 503 }
    )
  }
}
