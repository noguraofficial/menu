'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isAvailable: boolean
  dineInAvailable?: boolean
  takeawayAvailable?: boolean
  packagingOption?: boolean // true if can choose own packaging or restaurant packaging
}

export interface CartItem extends MenuItem {
  quantity: number
  notes?: string
  useRestaurantPackaging?: boolean // true if using restaurant packaging (+Rp 8000)
  cartItemId: string // Unique ID for each cart entry
}

interface CartState {
  items: CartItem[]
  total: number
  orderType: 'dine-in' | 'takeaway' | null
  customerName: string
  customerPhone: string
  tableNumber?: string
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem & { quantity?: number; notes?: string; useRestaurantPackaging?: boolean } }
  | { type: 'REMOVE_ITEM'; payload: string } // cartItemId
  | { type: 'UPDATE_ITEM_QUANTITY'; payload: { cartItemId: string; quantity: number } }
  | { type: 'UPDATE_ITEM_NOTES'; payload: { cartItemId: string; notes: string } }
  | { type: 'UPDATE_ITEM_PACKAGING'; payload: { cartItemId: string; useRestaurantPackaging: boolean } }
  | { type: 'SET_ORDER_TYPE'; payload: 'dine-in' | 'takeaway' }
  | { type: 'SET_CUSTOMER_INFO'; payload: { name: string; phone: string; tableNumber?: string } }
  | { type: 'CLEAR_CART' }

// Helper function to calculate item total including packaging fee
const calculateItemTotal = (item: CartItem): number => {
  const packagingFee = (item.packagingOption && item.useRestaurantPackaging) ? 8000 : 0 // 8000 rupiah
  return (item.price + packagingFee) * item.quantity
}

const initialState: CartState = {
  items: [],
  total: 0,
  orderType: null,
  customerName: '',
  customerPhone: '',
  tableNumber: ''
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Always create a new cart entry, even for the same menu item
      const cartItemId = `${action.payload.id}-${Date.now()}`
      const newItem: CartItem = {
        ...action.payload,
        cartItemId,
        quantity: action.payload.quantity || 1,
        notes: action.payload.notes || '',
        useRestaurantPackaging: action.payload.useRestaurantPackaging || false
      }
      const updatedItems = [...state.items, newItem]
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.cartItemId !== action.payload)
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
      }
    }
    
    case 'UPDATE_ITEM_QUANTITY': {
      const existingItem = state.items.find(item => item.cartItemId === action.payload.cartItemId)
      
      if (existingItem) {
        // Update existing item
        const updatedItems = state.items.map(item =>
          item.cartItemId === action.payload.cartItemId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
        }
      } else {
        // Item not found in cart, this should not happen with UPDATE_ITEM_QUANTITY
        return state
      }
    }
    
            case 'UPDATE_ITEM_NOTES': {
              const updatedItems = state.items.map(item =>
                item.cartItemId === action.payload.cartItemId
                  ? { ...item, notes: action.payload.notes }
                  : item
              )
              return { ...state, items: updatedItems }
            }

            case 'UPDATE_ITEM_PACKAGING': {
              const updatedItems = state.items.map(item =>
                item.cartItemId === action.payload.cartItemId
                  ? { ...item, useRestaurantPackaging: action.payload.useRestaurantPackaging }
                  : item
              )
              return { ...state, items: updatedItems }
            }
    
    case 'SET_ORDER_TYPE':
      return { ...state, orderType: action.payload }
    
    case 'SET_CUSTOMER_INFO':
      return {
        ...state,
        customerName: action.payload.name,
        customerPhone: action.payload.phone,
        tableNumber: action.payload.tableNumber
      }
    
    case 'CLEAR_CART':
      return initialState
    
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nogura-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        if (parsedCart.items) {
          parsedCart.items.forEach((item: CartItem) => {
            dispatch({ type: 'ADD_ITEM', payload: item })
          })
        }
        if (parsedCart.orderType) {
          dispatch({ type: 'SET_ORDER_TYPE', payload: parsedCart.orderType })
        }
        if (parsedCart.customerName) {
          dispatch({ 
            type: 'SET_CUSTOMER_INFO', 
            payload: { 
              name: parsedCart.customerName, 
              phone: parsedCart.customerPhone,
              tableNumber: parsedCart.tableNumber
            } 
          })
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('nogura-cart', JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext }

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
