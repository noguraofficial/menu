'use client'

import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

export default function CartSummary() {
  const { state } = useCart()

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0)

  if (totalItems === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-40">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-300">Total ({totalItems} items)</p>
          <p className="text-xl font-bold">{formatCurrency(state.total)}</p>
        </div>
        <Link
          href="/checkout"
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          View Cart
        </Link>
      </div>
    </div>
  )
}
