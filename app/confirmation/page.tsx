'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, MapPin, Phone, ArrowLeft } from 'lucide-react'

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')

  useEffect(() => {
    // Generate random order number
    const orderNum = 'NG' + Math.random().toString(36).substr(2, 6).toUpperCase()
    setOrderNumber(orderNum)
    
    // Set estimated time (15-20 minutes from now)
    const now = new Date()
    const estimated = new Date(now.getTime() + (17 * 60 * 1000)) // 17 minutes
    setEstimatedTime(estimated.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Pesanan Berhasil!
          </h1>
          <p className="text-gray-600 mb-6">
            Terima kasih telah memesan di Nogura Ramen Bar. 
            Pesanan Anda sedang diproses.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nomor Pesanan:</span>
                <span className="font-semibold text-gray-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimasi Siap:</span>
                <span className="font-semibold text-gray-900">{estimatedTime}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Langkah Selanjutnya:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-0.5 text-primary-600" />
                <span>Tunggu notifikasi ketika pesanan siap</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-600" />
                <span>Ambil pesanan di counter utama</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary-600" />
                <span>Hubungi kami jika ada pertanyaan</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-primary-900 mb-2">Butuh Bantuan?</h4>
            <p className="text-sm text-primary-700">
              Hubungi kami di (021) 1234-5678 atau 
              <br />
              info@nogura.com
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors block"
            >
              Pesan Lagi
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cetak Struk
            </button>
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mt-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
