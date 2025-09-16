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
    <section id="menu" className="py-6 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4">

        {/* Order Type Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => setOrderType('dine-in')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              orderType === 'dine-in'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            Dine In
          </button>
          <button
            onClick={() => setOrderType('take-away')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              orderType === 'take-away'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            Take Away
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            All Items
          </button>
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
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
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors duration-200"
              >
                <div className="flex">
                  {/* Thumbnail Image */}
                  <div className="w-20 h-20 bg-gray-50 flex items-center justify-center flex-shrink-0 border-r border-gray-200">
                    <div className="text-center text-gray-500">
                      <div className="text-2xl">🍜</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 pr-3">
                        <h3 className="text-base font-semibold text-black mb-1">{item.name}</h3>
                        <span className="text-lg font-bold text-black">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      
                      {quantity > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, quantity - 1)}
                            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-300"
                          >
                            <Minus className="w-3 h-3 text-gray-700" />
                          </button>
                          <span className="w-6 text-center font-semibold text-black text-sm">{quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, quantity + 1)}
                            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-300"
                          >
                            <Plus className="w-3 h-3 text-gray-700" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.isAvailable}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            item.isAvailable
                              ? 'bg-black text-white hover:bg-gray-800'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
