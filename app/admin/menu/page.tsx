'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import { MenuItem } from '@/context/CartContext'
import ImageUpload from '@/components/ImageUpload'

export default function MenuManagement() {
  const [activeTab, setActiveTab] = useState<'dine-in' | 'takeaway'>('dine-in')
  const [dineInMenus, setDineInMenus] = useState<MenuItem[]>([])
  const [takeawayMenus, setTakeawayMenus] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch menu data from API
  const fetchMenus = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch dine-in menus
      const dineInResponse = await fetch('/api/menu?orderType=dine-in')
      if (dineInResponse.ok) {
        const dineInData = await dineInResponse.json()
        setDineInMenus(dineInData)
      }

      // Fetch takeaway menus
      const takeawayResponse = await fetch('/api/menu?orderType=takeaway')
      if (takeawayResponse.ok) {
        const takeawayData = await takeawayResponse.json()
        setTakeawayMenus(takeawayData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menus')
      console.error('Error fetching menus:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  })

  // Get current menu based on active tab
  const currentMenus = activeTab === 'dine-in' ? dineInMenus : takeawayMenus
  const setCurrentMenus = activeTab === 'dine-in' ? setDineInMenus : setTakeawayMenus

  const categories = [
    { id: 'ramen', name: 'Ramen' },
    { id: 'appetizer', name: 'Appetizer' },
    { id: 'rice', name: 'Rice Bowl' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'drink', name: 'Minuman' }
  ]

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'ramen',
      isAvailable: true,
      dineInAvailable: activeTab === 'dine-in',
      takeawayAvailable: activeTab === 'takeaway'
    })
    setShowModal(true)
  }

  const handleEdit = (item: MenuItem) => {
    console.log('Editing item:', item) // Debug log
    setEditingItem(item)
    setFormData({
      name: item.name || '',
      description: item.description || '',
      price: item.price || 0,
      image: item.image || '',
      category: typeof item.category === 'object' ? (item.category as any).id : item.category,
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
      dineInAvailable: item.dineInAvailable !== undefined ? item.dineInAvailable : true,
      takeawayAvailable: item.takeawayAvailable !== undefined ? item.takeawayAvailable : false
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    console.log('Deleting item with ID:', id) // Debug log

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCurrentMenus(prev => prev.filter(item => item.id !== id))
        console.log('Item deleted successfully')
      } else {
        const errorData = await response.json()
        console.error('Delete failed:', errorData)
        alert(`Failed to delete item: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }

  const handleSave = async () => {
    console.log('Form data:', formData) // Debug log
    console.log('Editing item:', editingItem) // Debug log

    if (!formData.name || !formData.description || !formData.price) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const itemData = {
        name: formData.name,
        description: formData.description,
        price: formData.price || 0, // Price is already in Rupiah
        image: formData.image || '',
        categoryId: formData.category, // Use categoryId for API
        isAvailable: formData.isAvailable !== undefined ? formData.isAvailable : true,
        dineInAvailable: activeTab === 'dine-in',
        takeawayAvailable: activeTab === 'takeaway'
      }

      console.log('Sending data:', itemData) // Debug log

      if (editingItem) {
        // Update existing item
        console.log('Updating item with ID:', editingItem.id) // Debug log
        const response = await fetch(`/api/menu/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemData)
        })

        if (response.ok) {
          const updatedItem = await response.json()
          console.log('Updated item:', updatedItem) // Debug log
          setCurrentMenus(prev => prev.map(item => 
            item.id === editingItem.id ? updatedItem : item
          ))
        } else {
          const errorData = await response.json()
          console.error('Update failed:', errorData) // Debug log
          alert(`Failed to update item: ${errorData.error || 'Unknown error'}`)
        }
      } else {
        // Create new item
        console.log('Creating new item') // Debug log
        const response = await fetch('/api/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemData)
        })

        if (response.ok) {
          const newItem = await response.json()
          console.log('Created item:', newItem) // Debug log
          setCurrentMenus(prev => [...prev, newItem])
        } else {
          const errorData = await response.json()
          console.error('Create failed:', errorData) // Debug log
          alert(`Failed to create item: ${errorData.error || 'Unknown error'}`)
        }
      }

      setShowModal(false)
      setEditingItem(null)
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Failed to save item. Please try again.')
    }
  }

  const toggleAvailability = async (item: MenuItem) => {
    try {
      const response = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...item,
          isAvailable: !item.isAvailable,
          categoryId: typeof item.category === 'object' ? (item.category as any).id : item.category
        })
      })

        if (response.ok) {
          const updatedItem = await response.json()
          setCurrentMenus(prev => prev.map(menuItem => 
            menuItem.id === (item as any).id ? updatedItem : menuItem
          ))
      } else {
        const errorData = await response.json()
        alert(`Failed to update availability: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating availability:', error)
      alert('Failed to update availability. Please try again.')
    }
  }

  if (loading) {
    return (
      <section id="menu" className="py-6 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Loading menu data...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="menu" className="py-6 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading menu
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchMenus}
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-gray-600 mt-2">Manage your restaurant menu items</p>
            </div>
            <button
              onClick={fetchMenus}
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Order Type Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('dine-in')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'dine-in'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            Dine In ({dineInMenus.length})
          </button>
          <button
            onClick={() => setActiveTab('takeaway')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'takeaway'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            Takeaway ({takeawayMenus.length})
          </button>
        </div>

        {/* Add Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 bg-black text-white hover:bg-gray-800 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Menu Item</span>
          </button>
        </div>

        {/* Menu Items List */}
        <div className="space-y-4">
          {currentMenus.map((menu) => (
            <div
              key={menu.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start sm:items-center p-4">
                {/* Thumbnail Image */}
                <div className="w-24 h-24 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 mr-3 sm:mr-4">
                  {menu.image ? (
                    <img
                      src={menu.image}
                      alt={menu.name}
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
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{menu.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          menu.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {menu.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{menu.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-gray-900">
                          {formatCurrency(menu.price)}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {typeof menu.category === 'object' ? (menu.category as any).name : menu.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex-shrink-0 flex items-center space-x-2">
                      <button
                        onClick={() => toggleAvailability(menu)}
                        className={`p-2 rounded-lg transition-colors ${
                          menu.isAvailable
                            ? 'text-green-600 hover:bg-green-100'
                            : 'text-red-600 hover:bg-red-100'
                        }`}
                        title={menu.isAvailable ? 'Hide item' : 'Show item'}
                      >
                        {menu.isAvailable ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(menu)}
                        className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
                        title="Edit item"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(menu.id)}
                        className="p-2 rounded-lg transition-colors text-red-600 hover:bg-red-100"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentMenus.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No menu items found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by adding your first menu item.
            </p>
            <button
              onClick={handleAdd}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
            >
              Add Menu Item
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-6 py-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => {
                          console.log('Name changed:', e.target.value) // Debug log
                          setFormData({ ...formData, name: e.target.value })
                        }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-colors text-gray-900 placeholder-gray-500"
                        placeholder="Enter item name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => {
                          console.log('Description changed:', e.target.value) // Debug log
                          setFormData({ ...formData, description: e.target.value })
                        }}
                        rows={3}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-colors resize-none text-gray-900 placeholder-gray-500"
                        placeholder="Enter item description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (Rp)
                      </label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => {
                          console.log('Price changed:', e.target.value) // Debug log
                          setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
                        }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-colors text-gray-900 placeholder-gray-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category || 'ramen'}
                        onChange={(e) => {
                          console.log('Category changed:', e.target.value) // Debug log
                          setFormData({ ...formData, category: e.target.value })
                        }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-colors text-gray-900"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <ImageUpload
                      value={formData.image || ''}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isAvailable || false}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Available
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-black text-sm font-medium text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                  >
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}