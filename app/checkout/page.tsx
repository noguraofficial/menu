'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, User, Phone, MapPin, Clock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency, formatPhoneNumber } from '@/utils/format'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: state.customerName || '',
    phone: state.customerPhone || '',
    tableNumber: state.tableNumber || '',
    orderType: state.orderType || 'dine-in'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOrderTypeChange = (type: 'dine-in' | 'takeaway') => {
    setFormData(prev => ({ ...prev, orderType: type }))
    dispatch({ type: 'SET_ORDER_TYPE', payload: type })
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.phone) {
        alert('Mohon lengkapi nama dan nomor telepon')
        return
      }
      dispatch({ 
        type: 'SET_CUSTOMER_INFO', 
        payload: { 
          name: formData.name, 
          phone: formData.phone,
          tableNumber: formData.tableNumber
        } 
      })
    }
    setCurrentStep(prev => prev + 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart and redirect to confirmation
    dispatch({ type: 'CLEAR_CART' })
    router.push('/confirmation')
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h1>
          <p className="text-gray-600 mb-8">Silakan pilih menu terlebih dahulu</p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 ml-4">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm font-medium">Informasi</span>
            </div>
            
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-sm font-medium">Konfirmasi</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informasi Pesanan</h2>
                
                {/* Order Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipe Pesanan
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleOrderTypeChange('dine-in')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.orderType === 'dine-in'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">Dine In</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleOrderTypeChange('takeaway')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.orderType === 'takeaway'
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">Takeaway</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="08xxxxxxxxxx"
                        required
                      />
                    </div>
                  </div>

                  {formData.orderType === 'dine-in' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Meja (Opsional)
                      </label>
                      <input
                        type="text"
                        name="tableNumber"
                        value={formData.tableNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Contoh: Meja 5"
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full mt-8 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Lanjut ke Konfirmasi
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Konfirmasi Pesanan</h2>
                
                {/* Order Summary */}
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        {item.notes && (
                          <p className="text-xs text-gray-500 mt-1">Catatan: {item.notes}</p>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Detail Pesanan</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nama:</span>
                      <span className="text-gray-900">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telepon:</span>
                      <span className="text-gray-900">{formatPhoneNumber(formData.phone)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipe:</span>
                      <span className="text-gray-900 capitalize">
                        {formData.orderType === 'dine-in' ? 'Dine In' : 'Takeaway'}
                      </span>
                    </div>
                    {formData.orderType === 'dine-in' && formData.tableNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Meja:</span>
                        <span className="text-gray-900">{formData.tableNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Memproses...' : 'Konfirmasi Pesanan'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
              
              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600">{formatCurrency(state.total)}</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <p>* Pesanan akan diproses setelah konfirmasi</p>
                <p>* Estimasi waktu: 15-20 menit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
