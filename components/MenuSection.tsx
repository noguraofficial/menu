'use client'

import { useState } from 'react'
import { Plus, Minus, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { menuItems, menuCategories } from '@/data/menu'
import { formatCurrency } from '@/utils/format'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [orderType, setOrderType] = useState('dine-in')
  const { state, dispatch } = useCart()

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const handleAddToCart = (item: typeof menuItems[0]) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    } else {
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } })
    }
  }

  const getItemQuantity = (id: string) => {
    const item = state.items.find(item => item.id === id)
    return item ? item.quantity : 0
  }

  return (
    <section id="menu" className="py-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">

        {/* Order Type Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => setOrderType('dine-in')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              orderType === 'dine-in'
                ? 'bg-white text-gray-900'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Dine In
          </button>
          <button
            onClick={() => setOrderType('take-away')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              orderType === 'take-away'
                ? 'bg-white text-gray-900'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Take Away
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            All Items
          </button>
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id)
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex">
                  {/* Thumbnail Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                    <div className="text-center text-gray-500">
                      <div className="text-2xl">🍜</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">{item.name}</h3>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        {formatCurrency(item.price)}
                      </span>
                      
                      {quantity > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="w-6 text-center font-medium">{quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.isAvailable}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            item.isAvailable
                              ? 'bg-black text-white hover:bg-gray-800'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Menu sedang tidak tersedia
            </h3>
            <p className="text-gray-600">
              Silakan pilih kategori menu lainnya.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
