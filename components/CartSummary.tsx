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
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white z-40 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="text-sm text-gray-300 mb-1">Total ({totalItems} items)</p>
            <p className="text-2xl font-bold">{formatCurrency(state.total)}</p>
          </div>
          <Link
            href="/checkout"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-sm ml-4"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  )
}
