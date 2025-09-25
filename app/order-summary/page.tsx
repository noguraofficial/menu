'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'

export default function OrderSummaryPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateWhatsAppMessage = () => {
    let message = `Halo Nogura, saya pesan ini ya :\n\n`
    
    // Group items by order type
    const dineInItems = state.items.filter(item => item.dineInAvailable && !item.takeawayAvailable)
    const takeawayItems = state.items.filter(item => item.takeawayAvailable && !item.dineInAvailable)
    const bothItems = state.items.filter(item => item.dineInAvailable && item.takeawayAvailable)
    
    if (dineInItems.length > 0 || bothItems.length > 0) {
      message += `Dine in :\n`
      const allDineInItems = [...dineInItems, ...bothItems]
      allDineInItems.forEach((item) => {
        const itemTotal = (item.price + (item.packagingOption && item.useRestaurantPackaging ? 8000 : 0)) * item.quantity
        message += `• ${item.name} x${item.quantity} - ${formatCurrency(itemTotal)}\n`
      })
    } else {
      message += `Dine in :\n-`
    }
    
    message += `\nTake away :\n`
    if (takeawayItems.length > 0) {
      takeawayItems.forEach((item) => {
        const packagingFee = item.packagingOption && item.useRestaurantPackaging ? 8000 : 0
        const itemTotal = (item.price + packagingFee) * item.quantity
        message += `• ${item.name} x${item.quantity} - ${formatCurrency(itemTotal)}\n`
      })
    } else {
      message += `-`
    }
    
    message += `\nTotal: ${formatCurrency(state.total)}`
    message += `\n\nReservasi atas nama: ${customerName}`
    
    return message
  }

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      alert('Mohon isi nama untuk reservasi')
      return
    }

    setIsSubmitting(true)
    
    const message = generateWhatsAppMessage()
    const whatsappNumber = '6285771171335'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Clear cart and redirect after a short delay
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' })
      setIsSubmitting(false)
      setCustomerName('')
      router.push('/confirmation')
    }, 2000)
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
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Order Summary with Receipt Style */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Summary Pesanan</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>


        {/* Order Items - Receipt Style but Responsive */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm border border-gray-100">
          {state.items.map((item) => (
            <div key={item.cartItemId} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium text-gray-900 mb-1">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(item.price)} x {item.quantity}
                    {item.packagingOption && item.useRestaurantPackaging && (
                      <span className="text-orange-600 font-medium"> + Kemasan</span>
                    )}
                  </div>
                </div>
                <div className="text-base font-semibold text-gray-900 ml-4">
                  {formatCurrency((item.price + (item.packagingOption && item.useRestaurantPackaging ? 8000 : 0)) * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total - Responsive */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">TOTAL</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(state.total)}
            </span>
          </div>
        </div>

        {/* Reservation Form - Responsive */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Reservasi Atas Nama</h3>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-base placeholder-gray-500"
          />
        </div>

        {/* Actions - Sticky Bottom */}
        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
          <button
            onClick={handleWhatsAppOrder}
            disabled={!customerName.trim() || isSubmitting}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Mengirim...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 mr-2" />
                Order via WhatsApp
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
