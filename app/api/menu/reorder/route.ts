import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/database')
    const body = await request.json()
    const { items } = body

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid request body: items must be an array' },
        { status: 400 }
      )
    }

    // Use a transaction to update multiple items
    await prisma.$transaction(
      items.map((item: { id: string; priority: number }) =>
        prisma.menuItem.update({
          where: { id: item.id },
          data: { priority: item.priority },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering menu items:', error)
    return NextResponse.json(
      { error: 'Failed to reorder menu items' },
      { status: 500 }
    )
  }
}

