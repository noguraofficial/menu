import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { usePackagingFee } from './usePackagingFee'

export function useCartTotal() {
  const { cart } = useContext(CartContext)
  const packagingFee = usePackagingFee()
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = subtotal + packagingFee
  
  return {
    subtotal,
    packagingFee,
    total,
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0)
  }
}

