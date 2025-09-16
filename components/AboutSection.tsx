import { Award, Users, Clock, Heart } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tentang Nogura Ramen Bar
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Sejak 2018, Nogura Ramen Bar telah menghadirkan pengalaman kuliner Jepang 
              yang autentik di Jakarta. Kami berkomitmen untuk menyajikan ramen berkualitas 
              tinggi dengan resep tradisional yang telah diturunkan dari generasi ke generasi.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Setiap mangkuk ramen kami dibuat dengan cinta dan perhatian terhadap detail, 
              menggunakan bahan-bahan pilihan terbaik dan teknik memasak yang telah disempurnakan 
              selama bertahun-tahun.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Kualitas Terjamin</h3>
                  <p className="text-sm text-gray-600">
                    Bahan-bahan segar dan berkualitas tinggi
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pelayanan Ramah</h3>
                  <p className="text-sm text-gray-600">
                    Tim yang berpengalaman dan ramah
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Siap Saji Cepat</h3>
                  <p className="text-sm text-gray-600">
                    Pesanan siap dalam waktu singkat
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dibuat dengan Cinta</h3>
                  <p className="text-sm text-gray-600">
                    Setiap hidangan dibuat dengan passion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🍜</div>
                <h3 className="text-2xl font-bold mb-4">Pengalaman Ramen Autentik</h3>
                <p className="text-primary-100 mb-6">
                  Rasakan kelezatan ramen Jepang yang sesungguhnya dengan 
                  kaldu yang kaya rasa dan mie yang kenyal sempurna.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">1000+</div>
                    <div className="text-sm text-primary-200">Pelanggan Puas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">5+</div>
                    <div className="text-sm text-primary-200">Tahun Pengalaman</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
