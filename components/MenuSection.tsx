'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useMenu, MenuItem } from '@/hooks/useMenu'
import { formatCurrency } from '@/utils/format'
import AddToCartModal from './AddToCartModal'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { state, dispatch } = useCart()

  // Get menu data from database
  const { menuItems, categories, loading, error } = useMenu(orderType)

  // Filter items based on category and search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  // Remove getItemQuantity function as we no longer need it

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  if (loading) {
    return (
      <section id="menu" className="py-6 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Loading menu...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="menu" className="py-6 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading menu
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" className="py-6 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Order Type Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => {
              setOrderType('dine-in')
              setActiveCategory('all')
              setSearchQuery('')
            }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              orderType === 'dine-in'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            Dine In
          </button>
          <button
            onClick={() => {
              setOrderType('takeaway')
              setActiveCategory('all')
              setSearchQuery('')
            }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              orderType === 'takeaway'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            Take Away
          </button>
        </div>

        {/* Category Dropdown and Search */}
        <div className="mb-8 flex flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
          {/* Category Dropdown */}
          <div className="relative flex-shrink-0">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-3 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm hover:border-gray-400 transition-colors duration-200 w-32 sm:min-w-[200px]"
            >
              <option value="all">All Items</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pl-10 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm hover:border-gray-400 transition-colors duration-200"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            // Remove quantity calculation as we no longer need it
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start sm:items-center p-4">
                  {/* Thumbnail Image */}
                  <div className="w-24 h-24 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 mr-3 sm:mr-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-3xl sm:text-2xl text-gray-400">🍜</div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        <span className="text-xl font-bold text-gray-900">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.isAvailable}
                          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            item.isAvailable
                              ? 'bg-black text-white hover:bg-gray-800 shadow-md'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Order
                        </button>
                      </div>
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

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem ? {
          ...selectedItem,
          category: typeof selectedItem.category === 'object' 
            ? (selectedItem.category as any).id 
            : selectedItem.category
        } : null}
      />
    </section>
  )
}
