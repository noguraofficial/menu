'use client'

import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

export default function CartSummary() {
  const pathname = usePathname()
  const { state } = useCart()

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0)

  // Only show cart summary on the main page (/) and when there are items
  if (pathname !== '/' || totalItems === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 shadow-lg z-40">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Cart Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              {/* Cart Icon with Badge */}
              <div className="relative">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h6M17 18a2 2 0 100 4 2 2 0 000-4zM9 18a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              </div>

              {/* Cart Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
                </p>
                <p className="text-lg font-bold text-white">
                  {formatCurrency(state.total)}
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            href="/checkout"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex-shrink-0 shadow-md"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
