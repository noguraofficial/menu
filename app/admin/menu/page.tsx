'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import { MenuItem } from '@/context/CartContext'

export default function MenuManagement() {
  const [activeTab, setActiveTab] = useState<'dine-in' | 'takeaway'>('dine-in')
  const [dineInMenus, setDineInMenus] = useState<MenuItem[]>([])
  const [takeawayMenus, setTakeawayMenus] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [databaseAvailable, setDatabaseAvailable] = useState(false)

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
        setDatabaseAvailable(true) // Database is available if we get data
      }

      // Fetch takeaway menus
      const takeawayResponse = await fetch('/api/menu?orderType=takeaway')
      if (takeawayResponse.ok) {
        const takeawayData = await takeawayResponse.json()
        setTakeawayMenus(takeawayData)
        setDatabaseAvailable(true) // Database is available if we get data
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menus')
      console.error('Error fetching menus:', err)
      setDatabaseAvailable(false)
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
      category: 'ramen',
      isAvailable: true,
      dineInAvailable: activeTab === 'dine-in',
      takeawayAvailable: activeTab === 'takeaway'
    })
    setShowModal(true)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      ...item,
      price: item.price / 100, // Convert from cents to rupiah
      category: typeof item.category === 'object' ? item.category.id : item.category
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/menu/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          // Remove from local state
          setCurrentMenus(prev => prev.filter(item => item.id !== id))
        } else {
          const errorData = await response.json()
          if (response.status === 503) {
            alert('Database not available. Delete operation is not supported in fallback mode.')
          } else {
            alert(`Failed to delete item: ${errorData.error || 'Unknown error'}`)
          }
        }
      } catch (error) {
        console.error('Error deleting item:', error)
        alert('Database not available. Delete operation is not supported in fallback mode.')
      }
    }
  }

  const handleSave = async () => {
    try {
      const itemData = {
        ...formData,
        price: Math.round((formData.price || 0) * 100), // Convert to cents
        categoryId: formData.category, // Use categoryId for API
        dineInAvailable: activeTab === 'dine-in',
        takeawayAvailable: activeTab === 'takeaway'
      }

      if (editingItem) {
        // Update existing item
        const response = await fetch(`/api/menu/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemData)
        })

        if (response.ok) {
          const updatedItem = await response.json()
          setCurrentMenus(prev => 
            prev.map(item => item.id === editingItem.id ? updatedItem : item)
          )
        } else {
          const errorData = await response.json()
          if (response.status === 503) {
            alert('Database not available. Update operation is not supported in fallback mode.')
          } else {
            alert(`Failed to update item: ${errorData.error || 'Unknown error'}`)
          }
        }
      } else {
        // Create new item
        const response = await fetch('/api/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemData)
        })

        if (response.ok) {
          const newItem = await response.json()
          setCurrentMenus(prev => [...prev, newItem])
        } else {
          const errorData = await response.json()
          if (response.status === 503) {
            alert('Database not available. Create operation is not supported in fallback mode.')
          } else {
            alert(`Failed to create item: ${errorData.error || 'Unknown error'}`)
          }
        }
      }

      setShowModal(false)
      setEditingItem(null)
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Database not available. Save operation is not supported in fallback mode.')
    }
  }

  const toggleAvailability = async (item: MenuItem) => {
    try {
      const updatedItem = { ...item, isAvailable: !item.isAvailable }
      const response = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updatedItem,
          price: Math.round(updatedItem.price * 100)
        })
      })

      if (response.ok) {
        setCurrentMenus(prev => 
          prev.map(i => i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i)
        )
      } else {
        const errorData = await response.json()
        if (response.status === 503) {
          alert('Database not available. Update operation is not supported in fallback mode.')
        } else {
          alert(`Failed to update availability: ${errorData.error || 'Unknown error'}`)
        }
      }
    } catch (error) {
      console.error('Error updating availability:', error)
      alert('Database not available. Update operation is not supported in fallback mode.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading menu data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading menu data
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchMenus}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
              <p className="mt-2 text-gray-600">
                Manage your restaurant menu items
              </p>
            </div>
            <button
              onClick={fetchMenus}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Database Status Banner */}
        {!databaseAvailable && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Database Not Available
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    You are viewing menu data in fallback mode. Create, update, and delete operations are not available without a database connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {databaseAvailable && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Database Connected
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Database is connected and ready. You can create, update, and delete menu items.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dine-in')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dine-in'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dine In ({dineInMenus.length} items)
              </button>
              <button
                onClick={() => setActiveTab('takeaway')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'takeaway'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Take Away ({takeawayMenus.length} items)
              </button>
            </nav>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={handleAdd}
            disabled={!databaseAvailable}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              databaseAvailable
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            title={databaseAvailable ? 'Add new menu item' : 'Add operation not available in fallback mode'}
          >
            <Plus className="w-4 h-4" />
            <span>{databaseAvailable ? 'Add Menu Item' : 'Add Menu Item (Not Available)'}</span>
          </button>
        </div>

        {/* Menu List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {currentMenus.map((menu) => (
              <li key={menu.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍜</span>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {menu.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          menu.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {menu.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {menu.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-lg font-semibold text-gray-900">
                          {formatCurrency(menu.price)}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {typeof menu.category === 'object' ? menu.category.name : menu.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleAvailability(menu)}
                      disabled={!databaseAvailable}
                      className={`p-2 rounded-lg transition-colors ${
                        databaseAvailable
                          ? menu.isAvailable
                            ? 'text-green-600 hover:bg-green-100'
                            : 'text-red-600 hover:bg-red-100'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      title={databaseAvailable ? (menu.isAvailable ? 'Hide item' : 'Show item') : 'Update operation not available in fallback mode'}
                    >
                      {menu.isAvailable ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(menu)}
                      disabled={!databaseAvailable}
                      className={`p-2 rounded-lg transition-colors ${
                        databaseAvailable
                          ? 'text-indigo-600 hover:bg-indigo-100'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      title={databaseAvailable ? 'Edit menu item' : 'Edit operation not available in fallback mode'}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      disabled={!databaseAvailable}
                      className={`p-2 rounded-lg transition-colors ${
                        databaseAvailable
                          ? 'text-red-600 hover:bg-red-100'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      title={databaseAvailable ? 'Delete menu item' : 'Delete operation not available in fallback mode'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price (Rp)
                      </label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        value={formData.category || 'ramen'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isAvailable || false}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Available
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleSave}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}