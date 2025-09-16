'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  icon: string
  isActive: boolean
  menuCount: number
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Ramen',
      description: 'Authentic Japanese ramen with rich broth',
      icon: '🍜',
      isActive: true,
      menuCount: 6
    },
    {
      id: '2',
      name: 'Appetizer',
      description: 'Japanese appetizers and side dishes',
      icon: '🥟',
      isActive: true,
      menuCount: 4
    },
    {
      id: '3',
      name: 'Rice Bowl',
      description: 'Hearty rice bowls with various toppings',
      icon: '🍚',
      isActive: true,
      menuCount: 3
    },
    {
      id: '4',
      name: 'Minuman',
      description: 'Japanese drinks and beverages',
      icon: '🥤',
      isActive: true,
      menuCount: 4
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    description: '',
    icon: '🍜',
    isActive: true
  })

  const availableIcons = ['🍜', '🥟', '🍚', '🥤', '🍱', '🍣', '🍤', '🍥', '🥢', '🍵']

  const handleAdd = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      description: '',
      icon: '🍜',
      isActive: true
    })
    setShowModal(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData(category)
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...formData as Category, id: editingCategory.id, menuCount: editingCategory.menuCount }
          : cat
      ))
    } else {
      // Add new category
      const newCategory: Category = {
        ...formData as Category,
        id: Date.now().toString(),
        menuCount: 0
      }
      setCategories([...categories, newCategory])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      setCategories(categories.filter(cat => cat.id !== id))
    }
  }

  const toggleActive = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, isActive: !cat.isActive }
        : cat
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola kategori menu untuk organisasi yang lebih baik
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{category.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    category.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => toggleActive(category.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {category.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.menuCount} menu items
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <div className="grid grid-cols-5 gap-2">
                        {availableIcons.map((icon) => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => setFormData({...formData, icon})}
                            className={`p-3 text-2xl rounded-lg border-2 transition-colors ${
                              formData.icon === icon
                                ? 'border-black bg-gray-100'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive || false}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">Active</label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
