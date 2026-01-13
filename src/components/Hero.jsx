import { useState, useEffect } from 'react'

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')

  const slides = [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80', // Spa stones massage
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80', // Spa massage therapy
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1920&q=80', // Luxury spa treatment
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80', // Relaxing spa setting
    'https://images.unsplash.com/photo-1545290224-d2a4d8e50b1c?w=1920&q=80', // Spa wellness
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Arama:', { location, service })
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url(${slide})`,
            }}
          />
        ))}
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/50 to-espresso/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 via-transparent to-espresso/50 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <div className="text-center max-w-5xl animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Huzurun ve Rahatlığın<br />
            <span className="font-normal">Adresi</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Sağlıklı beden, güzel ruh için besleyici bir alan
          </p>

          {/* Search Form - Modern Design */}
          <form onSubmit={handleSearch} className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto border border-gray-100">
            <div className="grid md:grid-cols-[1fr_1fr_auto] gap-0">
              {/* Location */}
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Şehir seçin"
                  className="w-full pl-14 pr-6 py-6 bg-transparent border-0 border-r border-gray-200 focus:outline-none focus:bg-gray-50/50 transition text-gray-800 placeholder:text-gray-400"
                />
              </div>

              {/* Service */}
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full pl-14 pr-6 py-6 bg-transparent border-0 focus:outline-none focus:bg-gray-50/50 transition text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Hizmet türü seçin</option>
                  <option value="massage">Masaj Terapisi</option>
                  <option value="spa">Spa & Kaplıca</option>
                  <option value="yoga">Yoga & Meditasyon</option>
                  <option value="ayurveda">Ayurveda</option>
                  <option value="aromatherapy">Aromaterapi</option>
                  <option value="facial">Yüz Bakımı</option>
                  <option value="hamam">Türk Hamamı</option>
                  <option value="sauna">Sauna & Buhar</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-12 py-6 bg-gold text-white font-medium hover:bg-gold-dark transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Ara</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
              ? 'w-8 bg-white'
              : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Curved Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#f5f1e8"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
