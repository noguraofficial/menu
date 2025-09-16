'use client'

import { useState } from 'react'
import { Plus, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { menuItems, menuCategories } from '@/data/menu'
import { formatCurrency } from '@/utils/format'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('ramen')
  const { dispatch } = useCart()

  const filteredItems = menuItems.filter(item => item.category === activeCategory)

  const handleAddToCart = (item: typeof menuItems[0]) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  return (
    <section id="menu" className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4">

        {/* Category Tabs - Responsive */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items List - Compact */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="flex">
                {/* Thumbnail Image - Compact */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                  <div className="text-center text-gray-500">
                    <div className="text-2xl md:text-3xl">🍜</div>
                  </div>
                </div>

                {/* Content - Compact List */}
                <div className="flex-1 p-3 md:p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 flex-1 pr-2">{item.name}</h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-bold text-gray-800">
                      {formatCurrency(item.price)}
                    </span>
                    
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isAvailable}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                        item.isAvailable
                        ? 'bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-300'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>{item.isAvailable ? 'Tambah' : 'Habis'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
