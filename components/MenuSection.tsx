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
      <div className="px-4">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">
            Menu Pilihan Kami
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nikmati berbagai pilihan ramen autentik dan hidangan Jepang lainnya, 
            dibuat dengan cinta dan bahan-bahan terbaik.
          </p>
        </div>

        {/* Category Tabs - Mobile Optimized */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Placeholder - Mobile Optimized */}
              <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-3xl mb-1">🍜</div>
                  <p className="text-xs">Gambar Menu</p>
                </div>
              </div>

              {/* Content - Mobile Optimized */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">{item.name}</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3 text-xs leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    {formatCurrency(item.price)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.isAvailable}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.isAvailable
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-3 h-3" />
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
