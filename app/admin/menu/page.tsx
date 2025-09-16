'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { formatCurrency } from '@/utils/format'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  isAvailable: boolean
  dineInAvailable: boolean
  takeawayAvailable: boolean
  image?: string
}

export default function MenuManagement() {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Tori Paitan',
      description: 'Ramen dengan kaldu ayam yang kental dan creamy',
      price: 40000,
      category: 'ramen',
      isAvailable: true,
      dineInAvailable: true,
      takeawayAvailable: true
    },
    {
      id: '2',
      name: 'Tonkotsu Ramen',
      description: 'Ramen dengan kaldu tulang babi yang kental dan gurih',
      price: 45000,
      category: 'ramen',
      isAvailable: true,
      dineInAvailable: true,
      takeawayAvailable: false
    },
    {
      id: '3',
      name: 'Gyoza (6 pcs)',
      description: 'Dumpling isi daging babi dan sayuran',
      price: 25000,
      category: 'appetizer',
      isAvailable: true,
      dineInAvailable: true,
      takeawayAvailable: true
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  })

  const categories = [
    { id: 'ramen', name: 'Ramen' },
    { id: 'appetizer', name: 'Appetizer' },
    { id: 'rice', name: 'Rice Bowl' },
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
      dineInAvailable: true,
      takeawayAvailable: true
    })
    setShowModal(true)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      setMenus(menus.map(menu => 
        menu.id === editingItem.id 
          ? { ...formData as MenuItem, id: editingItem.id }
          : menu
      ))
    } else {
      // Add new item
      const newItem: MenuItem = {
        ...formData as MenuItem,
        id: Date.now().toString()
      }
      setMenus([...menus, newItem])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      setMenus(menus.filter(menu => menu.id !== id))
    }
  }

  const toggleAvailability = (id: string) => {
    setMenus(menus.map(menu => 
      menu.id === id 
        ? { ...menu, isAvailable: !menu.isAvailable }
        : menu
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola menu untuk Dine In dan Take Away
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Menu
        </button>
      </div>

      {/* Menu List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {menus.map((menu) => (
            <li key={menu.id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-2xl">🍜</div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{menu.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          menu.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {menu.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                        <button
                          onClick={() => toggleAvailability(menu.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {menu.isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{menu.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(menu.price)}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {categories.find(cat => cat.id === menu.category)?.name}
                      </span>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          menu.dineInAvailable 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          Dine In
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          menu.takeawayAvailable 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          Take Away
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(menu)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
                    {editingItem ? 'Edit Menu' : 'Add New Menu'}
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
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={formData.category || 'ramen'}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isAvailable || false}
                          onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">Available</label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.dineInAvailable || false}
                          onChange={(e) => setFormData({...formData, dineInAvailable: e.target.checked})}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">Dine In Available</label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.takeawayAvailable || false}
                          onChange={(e) => setFormData({...formData, takeawayAvailable: e.target.checked})}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">Take Away Available</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingItem ? 'Update' : 'Create'}
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
