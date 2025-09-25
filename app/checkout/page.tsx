'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()

  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: cartItemId })
    } else {
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { cartItemId, quantity } })
    }
  }


  const handleClearCart = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
      dispatch({ type: 'CLEAR_CART' })
      router.push('/')
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-black mb-4">Keranjang Kosong</h1>
          <p className="text-gray-600 mb-8">Silakan pilih menu terlebih dahulu</p>
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Checkout Page */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Your Order</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Order Items - Mobile Optimized */}
        <div className="p-4 space-y-3">
          {state.items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              {/* Item Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{formatCurrency(item.price)} per item</p>
                </div>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Order Type Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.dineInAvailable && !item.takeawayAvailable
                    ? 'bg-blue-100 text-blue-700' 
                    : item.takeawayAvailable && !item.dineInAvailable
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.dineInAvailable && !item.takeawayAvailable 
                    ? 'Dine In' 
                    : item.takeawayAvailable && !item.dineInAvailable
                    ? 'Take Away'
                    : 'Both Available'
                  }
                </span>
                {item.takeawayAvailable && item.useRestaurantPackaging && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                    Kemasan Resto (+Rp 8.000)
                  </span>
                )}
                {item.takeawayAvailable && !item.useRestaurantPackaging && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Bawa Sendiri
                  </span>
                )}
              </div>

              {/* Quantity Controls and Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-lg">
                    {formatCurrency((item.price + (item.packagingOption && item.useRestaurantPackaging ? 8000 : 0)) * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions - Sticky Bottom */}
        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
          <div className="flex space-x-3">
            <button
              onClick={handleClearCart}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={() => router.push('/order-summary')}
              className="flex-1 bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
