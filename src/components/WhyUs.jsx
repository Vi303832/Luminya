function WhyUs() {
  const features = [
    {
      title: 'Size Özel Sabunlar',
      description: 'Cildinizi ölü hücrelerden arındırarak okşijen alımını sağlar, canlılık verir.',
      image: 'https://images.unsplash.com/photo-1600857544200-b9dc8df2956f?w=800&q=80',
    },
    {
      title: 'Özel Kokular',
      description: 'Bitkilerden elde edilen kokular, vücutta rahatlatıcı etki gösterir.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
    },
    {
      title: 'Rahatlatıcı Yağlar',
      description: 'Cildinizi nemlendirerek canlı ve parlak bir görüntü sağlar.',
      image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&q=80',
    },
  ]

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-white via-[#faf8f5] to-white overflow-hidden">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4a574]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8b6f47]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with balanced animations */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <p className="text-[#d4a574] text-sm tracking-[0.3em] uppercase mb-2 font-semibold">
              Luna Den Spa
            </p>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
            Sizler için <span className="bg-gradient-to-r from-[#8b6f47] via-[#d4a574] to-[#8b6f47] bg-clip-text text-transparent">Hazırlanmış</span> Ürünlerimiz
          </h2>

          {/* Simple decorative dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 bg-[#d4a574] rounded-full"></div>
            <div className="w-2 h-2 bg-[#8b6f47] rounded-full"></div>
            <div className="w-2 h-2 bg-[#d4a574] rounded-full"></div>
          </div>
        </div>

        {/* Features Grid with balanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card container */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                
                {/* Image with fancy border */}
                <div className="relative mb-8 flex justify-center">
                  {/* Animated outer circle - only on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-56 h-56 rounded-full border-[2px] border-dashed border-[#d4a574]/40 animate-spin-slow"></div>
                  </div>

                  {/* Image container with gradient border */}
                  <div className="relative z-10 w-48 h-48 rounded-full p-1 bg-gradient-to-br from-[#d4a574] via-[#8b6f47] to-[#d4a574] group-hover:scale-105 transition-transform duration-500 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Subtle overlay gradient on hover */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#8b6f47]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-4 relative z-10">
                  <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-[#8b6f47] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Animated Details Button */}
                  <button className="relative inline-block mt-6 text-[#d4a574] font-semibold uppercase tracking-widest text-sm overflow-hidden group/btn">
                    <span className="relative z-10 flex items-center gap-2 group-hover/btn:gap-3 transition-all duration-300">
                      DETAYLAR
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4a574] to-[#8b6f47] group-hover/btn:w-full transition-all duration-300"></div>
                  </button>
                </div>

                {/* Subtle corner decoration */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#d4a574]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#d4a574]/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
