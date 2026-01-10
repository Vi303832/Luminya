import { useState } from 'react'

function Hero() {
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')

  return (
    <section className="relative h-[600px] flex items-center justify-center text-white">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Ruhunuzu Yenileyin</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Doğanın kucağında huzur dolu anlar
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Location */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#8b6f47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Konum
                </span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Şehir seçin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b6f47] focus:border-transparent text-gray-700"
              />
            </div>

            {/* Service */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#8b6f47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Hizmet
                </span>
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b6f47] focus:border-transparent text-gray-700"
              >
                <option value="">Hizmet türü seçin</option>
                <option value="massage">Masaj Terapisi</option>
                <option value="spa">Spa & Kaplıca</option>
                <option value="yoga">Yoga & Meditasyon</option>
                <option value="ayurveda">Ayurveda</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-[#8b6f47] text-white px-6 py-2.5 rounded-lg hover:bg-[#6d5635] transition font-medium">
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
