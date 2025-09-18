import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if database is available
    const { prisma } = await import('@/lib/database')
    
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Database not available, using fallback data:', error)
    
    // Fallback to static data
    const { dineInCategories } = await import('@/data/menu-dine-in')
    
    const fallbackCategories = dineInCategories.map(cat => ({
      ...cat,
      isActive: true,
      description: '',
      icon: ''
    }))

    return NextResponse.json(fallbackCategories)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/database')
    const body = await request.json()
    const { name, description, icon, isActive } = body

    const category = await prisma.category.create({
      data: {
        name,
        description,
        icon,
        isActive,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Database not available for creating categories' },
      { status: 503 }
    )
  }
}
