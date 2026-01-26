import { useState, useEffect, useCallback } from 'react'

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=60&fm=webp',
    category: 'spa',
    title: 'Lüks Spa Deneyimi',
    description: 'Huzurun ve rahatlığın buluşma noktası'
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=60&fm=webp',
    category: 'massage',
    title: 'Profesyonel Masaj Terapisi',
    description: 'Uzman ellerle yenilenme zamanı'
  },
  {
    url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1920&q=60&fm=webp',
    category: 'facility',
    title: 'Şık Otel Lobisi',
    description: 'Konforlu ve modern lobide keyifli bir deneyim'
  },
  {
    url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=60&fm=webp',
    category: 'massage',
    title: 'Sıcak Taş Masajı',
    description: 'Derin gevşeme ve arınma'
  },
  {
    url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=60&fm=webp',
    category: 'spa',
    title: 'Termal Spa Havuzu',
    description: 'Doğanın şifa gücüyle tanışın'
  },
  {
    url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=1920&q=60&fm=webp',
    category: 'facility',
    title: 'Premium Dinlenme Alanları',
    description: 'Size özel huzur köşeleri'
  },
]

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState('right')
  const [isHovered, setIsHovered] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload images for smooth transitions
  useEffect(() => {
    const imagePromises = galleryImages.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = image.url
        img.onload = resolve
        img.onerror = reject
      })
    })

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)) // Continue even if some images fail
  }, [])

  const nextSlide = useCallback(() => {
    setDirection('right')
    setActiveIndex((prev) => (prev + 1) % galleryImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection('left')
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  const goToSlide = (index) => {
    setDirection(index > activeIndex ? 'right' : 'left')
    setActiveIndex(index)
  }

  // Auto-play with faster and more stable interval
  useEffect(() => {
    if (!isPlaying || isHovered || !imagesLoaded) return
    const interval = setInterval(nextSlide, 3500)
    return () => clearInterval(interval)
  }, [isPlaying, isHovered, imagesLoaded, nextSlide])

  return (
    <section id="gallery" className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background ambient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-olive/10 via-transparent to-stone/20" />

      {/* Main Gallery Container */}
      <div
        className="relative h-full w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Images with animated transitions */}
        {galleryImages.map((image, index) => {
          const isActive = index === activeIndex
          const isPrev = index === (activeIndex - 1 + galleryImages.length) % galleryImages.length
          const isNext = index === (activeIndex + 1) % galleryImages.length

          return (
            <div
              key={image.url}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                } ${isPrev && direction === 'right' ? '-translate-x-full' : ''} ${isNext && direction === 'left' ? 'translate-x-full' : ''
                }`}
              style={{ willChange: isActive ? 'transform, opacity' : 'auto' }}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={isActive ? "high" : "low"}
              />

              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            </div>
          )
        })}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 lg:p-16">
          {/* Center Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto">
              <div
                key={activeIndex}
                className="animate-fade-in"
              >
                <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                  {galleryImages[activeIndex].title}
                </h2>
                <p className="text-white/80 text-lg md:text-xl lg:text-2xl tracking-wide">
                  {galleryImages[activeIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <footer className="flex items-end justify-between gap-4">
            {/* Thumbnail Gallery */}
            <div className="hidden lg:flex items-center gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={image.url}
                  onClick={() => goToSlide(index)}
                  className={`relative w-20 h-14 overflow-hidden rounded transition-all duration-300 group ${index === activeIndex
                    ? 'ring-2 ring-white scale-110'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                >
                  <img
                    src={image.url}
                    alt={`${image.title} küçük resim`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${index === activeIndex ? 'opacity-0' : 'group-hover:opacity-0'
                      }`}
                  />
                </button>
              ))}
            </div>

            {/* Progress Dots (Mobile) */}
            <div className="flex lg:hidden items-center gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${index === activeIndex
                    ? 'w-8 h-2 bg-white rounded-full'
                    : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
                    }`}
                  aria-label={`Slayt ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 flex items-center justify-center border border-white/30 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 rounded-full"
                aria-label={isPlaying ? 'Duraklat' : 'Oynat'}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>

              {/* Prev/Next */}
              <div className="flex items-center">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 flex items-center justify-center border border-white/30 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                  aria-label="Önceki"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 flex items-center justify-center border border-white/30 border-l-0 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                  aria-label="Sonraki"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </div>

        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div
            key={activeIndex}
            className="h-full bg-olive"
            style={{
              width: isPlaying && !isHovered ? '100%' : '0%',
              transition: isPlaying && !isHovered ? 'width 3.5s linear' : 'none',
            }}
          />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden lg:block animate-pulse" />
        <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden lg:block animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Corner Decorations */}
        <div className="absolute top-6 right-6 md:top-12 md:right-12 lg:top-16 lg:right-16 w-16 h-16 border-t border-r border-white/20 z-20 hidden md:block" />
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 w-16 h-16 border-b border-l border-white/20 z-20 hidden md:block" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}

export default Gallery
