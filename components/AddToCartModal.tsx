'use client'

import { useState, useEffect } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    name: string
    description: string
    price: number
    image?: string
  } | null
}

export default function AddToCartModal({ isOpen, onClose, item }: AddToCartModalProps) {
  const { state, dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)

  // Get current quantity from cart
  const currentQuantity = item ? state.items.find(cartItem => cartItem.id === item.id)?.quantity || 0 : 0

  useEffect(() => {
    if (item) {
      setQuantity(currentQuantity > 0 ? currentQuantity : 1)
    }
  }, [item, currentQuantity])

  if (!isOpen || !item) return null

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  const handleUpdateCart = () => {
    if (quantity > 0) {
      dispatch({ 
        type: 'UPDATE_ITEM_QUANTITY', 
        payload: { id: item.id, quantity } 
      })
    }
    onClose()
  }

  const handleRemoveFromCart = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id })
    onClose()
  }

  const totalPrice = item.price * quantity

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">Add to Cart</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Item Image */}
          <div className="w-full h-32 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl">🍜</div>
            </div>
          </div>

          {/* Item Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-2">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {item.description}
            </p>
            <p className="text-lg font-bold text-black">{formatCurrency(item.price)}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-black">Quantity</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>
              <span className="w-8 text-center font-semibold text-black">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-300"
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-black">Total:</span>
            <span className="text-lg font-bold text-black">{formatCurrency(totalPrice)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {currentQuantity > 0 && (
              <button
                onClick={handleRemoveFromCart}
                className="px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-200 transition-colors"
              >
                Remove
              </button>
            )}
            <button
              onClick={handleUpdateCart}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {currentQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
