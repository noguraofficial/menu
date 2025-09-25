'use client'

import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function ConfirmationPage() {

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


          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors block"
            >
              Pesan Lagi
            </Link>
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

      </div>
    </div>
  )
}
