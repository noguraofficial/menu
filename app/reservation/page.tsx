'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/utils/format'
import { ArrowLeft, MessageCircle, Clock, User } from 'lucide-react'
import Link from 'next/link'

export default function ReservationPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = () => {
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
    
    // Clear cart and reset form after a short delay
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' })
      setIsSubmitting(false)
      setCustomerName('')
      router.push('/confirmation')
    }, 2000)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍜</div>
          <h1 className="text-2xl font-bold text-black mb-4">Keranjang Kosong</h1>
          <p className="text-gray-600 mb-6">Silakan pilih menu terlebih dahulu</p>
          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Kembali ke Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            href="/checkout"
            className="mr-4 p-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-black">Reservasi Pesanan</h1>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Ringkasan Pesanan
          </h2>
          
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <div className="flex-1">
                  <h3 className="font-medium text-black">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-gray-500 mt-1">Catatan: {item.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-black">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-black">Total:</span>
              <span className="text-xl font-bold text-black">{formatCurrency(state.total)}</span>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Informasi Reservasi
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <MessageCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Kirim ke WhatsApp</h3>
                  <p className="text-sm text-blue-700">
                    Pesanan akan dikirim sebagai draft ke nomor WhatsApp Nogura Ramen Bar (+62 857-7117-1335)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link
              href="/checkout"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Kembali
            </Link>
            <button
              onClick={handleSubmit}
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
                  Kirim ke WhatsApp
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
