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
    <section id="menu" className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all border-2 ${
                activeCategory === category.id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-black overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-100 flex items-center justify-center border-b-2 border-black">
                <div className="text-center text-gray-600">
                  <div className="text-4xl mb-2">🍜</div>
                  <p className="text-sm">Gambar Menu</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                  <div className="flex items-center space-x-1 text-black">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-black">
                    {formatCurrency(item.price)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.isAvailable}
                    className={`flex items-center space-x-2 px-4 py-2 border-2 font-medium transition-colors ${
                      item.isAvailable
                        ? 'bg-black text-white border-black hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{item.isAvailable ? 'Tambah' : 'Habis'}</span>
                  </button>
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
