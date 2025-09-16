'use client'

import { useState } from 'react'
import { Save, Clock, MapPin, Phone, Mail } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    restaurantName: 'Nogura Ramen Bar',
    address: 'Jl. Sudirman No. 123, Jakarta',
    phone: '+62 857-7117-1335',
    email: 'info@nogura.com',
    operatingHours: {
      monday: '11:00 - 22:00',
      tuesday: '11:00 - 22:00',
      wednesday: '11:00 - 22:00',
      thursday: '11:00 - 22:00',
      friday: '11:00 - 22:00',
      saturday: '11:00 - 22:00',
      sunday: '11:00 - 22:00'
    },
    packagingFee: 8000,
    taxRate: 10,
    serviceCharge: 5
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola pengaturan restoran dan aplikasi
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Restaurant Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Restaurant Information
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
              <input
                type="text"
                value={settings.restaurantName}
                onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="focus:ring-black focus:border-black block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="focus:ring-black focus:border-black block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="focus:ring-black focus:border-black block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Operating Hours
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(settings.operatingHours).map(([day, hours]) => (
              <div key={day}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {day}
                </label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => handleInputChange(`operatingHours.${day}`, e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  placeholder="e.g., 11:00 - 22:00"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Pricing Settings
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Packaging Fee (Take Away)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  type="number"
                  value={settings.packagingFee}
                  onChange={(e) => handleInputChange('packagingFee', parseInt(e.target.value))}
                  className="focus:ring-black focus:border-black block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleInputChange('taxRate', parseInt(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Service Charge (%)</label>
              <input
                type="number"
                value={settings.serviceCharge}
                onChange={(e) => handleInputChange('serviceCharge', parseInt(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Integration */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            WhatsApp Integration
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">✓</span>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-green-800">WhatsApp Integration Active</h4>
                <p className="mt-1 text-sm text-green-700">
                  Orders are automatically sent to WhatsApp number: {settings.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
