'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Home, Utensils } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state } = useCart()

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo - Mobile Optimized */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Nogura Ramen Bar</h1>
                <p className="text-xs text-gray-500">Authentic Japanese Ramen</p>
              </div>
            </Link>

            {/* Cart Button - Mobile Optimized */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
