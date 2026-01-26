import { useState, useEffect } from 'react'

function Hero({ onOpenBottomSheet }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80', // Spa stones massage
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80',

    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80', // Spa candles and wellness
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Spa wellness
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // If not on home page or section doesn't exist, scroll to packages
      const packagesSection = document.getElementById('packages')
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url(${slide})`,
            }}
          >
            {/* Ken Burns Effect Layer */}
            <div 
              className={`absolute inset-0 bg-cover bg-center animate-kenBurns`} 
              style={{ backgroundImage: `url(${slide})` }}
              aria-hidden="true"
            />
          </div>
        ))}

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-espresso/80 via-espresso/40 to-espresso/90 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-espresso/40 via-transparent to-espresso/40 pointer-events-none" />

        {/* Decorative Texture/Grain (optional but adds "beauty") */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-white px-4 pt-8 ">
        <div className="text-center max-w-5xl w-full flex flex-col items-center justify-center">
          {/* Subtle Tagline */}
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-fadeIn">
            <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-cream">Spa & Masaj Hizmetleri</span>
          </div>

          {/* Main Heading */}
          <div className="mb-4 md:mb-6 space-y-1 md:space-y-2">
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extralight leading-tight tracking-tighter animate-fadeIn">
              Huzurun <span className="italic font-light">Derinliğini</span>
            </h1>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal text-cream leading-tight animate-fadeIn">
              Keşfedin
            </h2>
          </div>

          {/* Subheading & Description */}
          <div className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8 animate-fadeIn">
            <div className="w-12 md:w-20 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed font-heading px-2">
              Bedeniniz için bir tapınak, <br className="hidden md:block" />
              ruhunuz için bir sığınak.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-3xl mx-auto animate-fadeIn">
            <button
              onClick={onOpenBottomSheet}
              className="group relative w-full sm:w-auto min-w-[200px] px-8 md:px-10 py-4 md:py-5 bg-white text-espresso font-bold text-sm md:text-base rounded-full overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 z-30 cursor-pointer"
              aria-label="Randevu almak için şube seç"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cream to-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center justify-center gap-3">
                <span className="uppercase tracking-widest">Randevu Al</span>
                <div className="w-6 h-6 rounded-full bg-espresso text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={scrollToServices}
              className="group relative w-full sm:w-auto min-w-[200px] px-8 md:px-10 py-4 md:py-5 bg-transparent text-white font-bold text-sm md:text-base rounded-full border border-white/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white hover:-translate-y-1 active:scale-95 z-30 cursor-pointer"
              aria-label="Hizmetler bölümüne git"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center justify-center gap-3 group-hover:text-espresso transition-colors duration-300">
                <span className="uppercase tracking-widest">Hizmetler</span>
                <svg className="w-4 h-4 animate-floating" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Minimal Design */}
      <div className="absolute bottom-10 md:bottom-20 left-6 md:left-10 z-20 flex flex-row md:flex-col gap-3 md:gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group flex items-center gap-2 md:gap-4 focus:outline-none p-2"
            aria-label={`Slide ${index + 1}`}
          >
            <div className={`h-[2px] transition-all duration-700 ${index === currentSlide ? 'w-8 md:w-12 bg-cream' : 'w-4 md:w-6 bg-white/30 group-hover:w-8 group-hover:bg-white/60'
              }`} />
            <span className={`text-[10px] tracking-tighter transition-all duration-700 hidden md:block ${index === currentSlide ? 'text-cream opacity-100 translate-x-0' : 'text-white opacity-0 -translate-x-2'
              }`}>
              0{index + 1}
            </span>
          </button>
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
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
