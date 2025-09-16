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
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white border-l-2 border-black transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            <h2 className="text-lg font-semibold text-black">Keranjang Saya</h2>
            <button
              onClick={onClose}
              className="p-2 text-black hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <ShoppingBag className="w-16 h-16 mb-4 text-gray-400" />
                <p className="text-lg font-medium">Keranjang kosong</p>
                <p className="text-sm">Tambahkan menu favorit Anda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 border-2 border-black p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-black">{item.name}</h3>
                        <p className="text-sm text-gray-600">{formatCurrency(item.price)}</p>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        className="p-1 text-black hover:text-gray-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 border-2 border-black hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-black">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 border-2 border-black hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-medium text-black">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Notes Input */}
                    <textarea
                      placeholder="Catatan khusus (opsional)"
                      value={item.notes || ''}
                      onChange={(e) => handleNotesChange(item.id, e.target.value)}
                      className="w-full p-2 text-sm border-2 border-black resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t-2 border-black p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-black">Total:</span>
                <span className="text-black">{formatCurrency(state.total)}</span>
              </div>
              
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full bg-black text-white py-3 px-4 font-medium hover:bg-gray-800 transition-colors text-center block border-2 border-black"
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
