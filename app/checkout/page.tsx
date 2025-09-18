'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    } else {
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } })
    }
  }

  const generateWhatsAppMessage = () => {
    const orderType = state.orderType || 'dine-in'
    const orderTypeText = orderType === 'dine-in' ? 'Dine In' : 'Take Away'
    
    let message = `🍜 *PESANAN NOGURA RAMEN BAR* 🍜\n\n`
    message += `📋 *Detail Pesanan:*\n`
    message += `👤 Atas Nama: ${customerName}\n`
    message += `📅 Tipe Pesanan: ${orderTypeText}\n`
    message += `🕐 Waktu: ${new Date().toLocaleString('id-ID')}\n\n`
    
    message += `📝 *Daftar Menu:*\n`
    state.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   💰 Harga: ${formatCurrency(item.price)}\n`
      message += `   🔢 Jumlah: ${item.quantity}x\n`
      message += `   💵 Subtotal: ${formatCurrency(item.price * item.quantity)}\n`
      if (item.notes) {
        message += `   📝 Catatan: ${item.notes}\n`
      }
      message += `\n`
    })
    
    message += `💰 *TOTAL PEMBAYARAN: ${formatCurrency(state.total)}*\n\n`
    message += `📞 *Konfirmasi pesanan ini melalui WhatsApp atau datang langsung ke restoran.*\n`
    message += `📍 *Lokasi: Nogura Ramen Bar*\n`
    message += `⏰ *Jam Operasional: 11:00 - 22:00 WIB*`
    
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

  const handleClearCart = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
      dispatch({ type: 'CLEAR_CART' })
      router.push('/')
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-black mb-4">Keranjang Kosong</h1>
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
    <div className="min-h-screen bg-white">
      {/* Your Order Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">Your Order</h2>
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Type Selection */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => dispatch({ type: 'SET_ORDER_TYPE', payload: 'dine-in' })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  state.orderType === 'dine-in'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dine In
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_ORDER_TYPE', payload: 'takeaway' })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  state.orderType === 'takeaway'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Take Away
              </button>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                {/* Item Thumbnail */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-2xl">🍜</div>
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-black text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{formatCurrency(item.price)}</p>
                  
                  {/* Order Type Tags */}
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      state.orderType === 'dine-in' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {state.orderType === 'dine-in' ? 'Dine In' : 'Take Away'}
                    </span>
                    {state.orderType === 'takeaway' && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        Kemasan (+Rp 8.000)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-semibold text-black">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="font-bold text-black text-lg">
                    {formatCurrency((item.price + (item.packagingOption && item.useRestaurantPackaging ? 8000 : 0)) * item.quantity)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Reservation Form */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-4">Reservasi Atas Nama :</h3>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            />
          </div>

          {/* Total and Actions */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-black">Total:</span>
              <span className="text-2xl font-bold text-black">
                {formatCurrency(state.total)}
              </span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleClearCart}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={handleWhatsAppOrder}
                disabled={!customerName.trim() || isSubmitting}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
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
      </div>
    </div>
  )
}
