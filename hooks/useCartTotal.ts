import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { usePackagingFee } from './usePackagingFee'

export function useCartTotal() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartTotal must be used within a CartProvider')
  }
  
  const { state } = context
  const packagingFee = usePackagingFee()
  
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = subtotal + packagingFee
  
  return {
    subtotal,
    packagingFee,
    total,
    totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0)
  }
}

