import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    console.log('Fetching categories...')
    
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        priority: 'asc'
      }
    })

    console.log('Categories fetched:', categories.length)
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Creating category:', body)

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description || null,
        icon: body.icon || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
        priority: body.priority || 0,
      }
    })

    console.log('Created category:', newCategory)
    return NextResponse.json(newCategory)
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
