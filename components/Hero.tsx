import { ArrowDown, Clock, MapPin, Phone } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nogura Ramen Bar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Nikmati Kelezatan Ramen Autentik Jepang
          </p>
          <p className="text-lg mb-12 text-primary-200 max-w-3xl mx-auto">
            Rasakan cita rasa asli Jepang dengan ramen berkualitas tinggi, 
            dibuat dengan resep tradisional dan bahan-bahan pilihan terbaik.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#menu"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
            >
              Lihat Menu
            </a>
            <a
              href="#about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Tentang Kami
            </a>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Clock className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <h3 className="font-semibold text-lg mb-2">Jam Operasional</h3>
              <p className="text-primary-200">
                Senin - Minggu<br />
                11:00 - 22:00
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <h3 className="font-semibold text-lg mb-2">Lokasi</h3>
              <p className="text-primary-200">
                Jl. Sudirman No. 123<br />
                Jakarta Pusat
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <h3 className="font-semibold text-lg mb-2">Kontak</h3>
              <p className="text-primary-200">
                (021) 1234-5678<br />
                info@nogura.com
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white" />
      </div>
    </section>
  )
}
