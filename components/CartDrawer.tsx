'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }
  }

  const handleNotesChange = (id: string, notes: string) => {
    dispatch({ type: 'UPDATE_NOTES', payload: { id, notes } })
  }

  const handleCheckout = () => {
    if (state.items.length === 0) return
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      onClose()
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer - Mobile Optimized */}
      <div className="absolute right-0 top-0 h-full w-full bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header - Mobile Optimized */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Keranjang Saya</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items - Mobile Optimized */}
          <div className="flex-1 overflow-y-auto p-3">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-12 h-12 mb-3 text-gray-300" />
                <p className="text-base font-medium">Keranjang kosong</p>
                <p className="text-xs">Tambahkan menu favorit Anda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-2">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-600">{formatCurrency(item.price)}</p>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls - Mobile Optimized */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Notes Input - Mobile Optimized */}
                    <textarea
                      placeholder="Catatan khusus (opsional)"
                      value={item.notes || ''}
                      onChange={(e) => handleNotesChange(item.id, e.target.value)}
                      className="w-full p-2 text-xs border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Mobile Optimized */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-3 space-y-3">
              <div className="flex justify-between items-center text-base font-semibold">
                <span>Total:</span>
                <span className="text-gray-800">{formatCurrency(state.total)}</span>
              </div>
              
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors text-center block"
              >
                Lanjut ke Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
