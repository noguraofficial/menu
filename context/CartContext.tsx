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
}

export interface CartItem extends MenuItem {
  quantity: number
  notes?: string
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
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_NOTES'; payload: { id: string; notes: string } }
  | { type: 'SET_ORDER_TYPE'; payload: 'dine-in' | 'takeaway' }
  | { type: 'SET_CUSTOMER_INFO'; payload: { name: string; phone: string; tableNumber?: string } }
  | { type: 'CLEAR_CART' }

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
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      } else {
        const newItem = { ...action.payload, quantity: 1 }
        const updatedItems = [...state.items, newItem]
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }
    
    case 'UPDATE_NOTES': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, notes: action.payload.notes }
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

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
