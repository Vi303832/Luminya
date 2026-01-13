function PopularTherapies() {
  const services = [
    {
      title: 'SAUNA',
      subtitle: 'Luna Den Spa & Wellness',
      description: 'Geleneksel sauna deneyimi ile vücudunuzdaki toksinlerden arının ve stresden uzaklaşın',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      price: '₺450',
      duration: '60 dakika',
      badge: 'Popüler',
      items: [
        { name: 'Sıcak Duş', description: 'Rahatlatıcı sıcak duş' },
        { name: 'Sauna', description: 'Geleneksel Fin saunası' },
        { name: 'Hamam', description: 'Türk hamamı deneyimi' },
        { name: 'İkramlar', description: 'Özel çay ve atıştırmalıklar' },
        { name: 'Bakım Yağları', description: 'Premium cilt bakım ürünleri' }
      ]
    },
    {
      title: 'KESE KÖPÜK',
      subtitle: 'Luna Den Spa & Wellness',
      description: 'Derin temizlik ve yenilenme için geleneksel Türk hamamı ritüeli',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
      price: '₺650',
      duration: '90 dakika',
      badge: 'En Çok Tercih Edilen',
      items: [
        { name: 'Kese', description: 'Profesyonel kese ile derin temizlik' },
        { name: 'Köpük', description: 'Doğal sabun köpük masajı' },
        { name: 'Havuz', description: 'Isıtılmalı havuz kullanımı' },
        { name: 'Soğuk Şok Duş', description: 'Terapi amaçlı soğuk duş' },
        { name: 'Kar Banyosu', description: 'Ferahlatıcı kar banyosu' }
      ]
    },
    {
      title: 'MASAJLAR',
      subtitle: 'Luna Den Spa & Wellness',
      description: 'Uzman terapistlerimiz ile profesyonel masaj terapileri',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      price: '₺850',
      duration: '75 dakika',
      badge: 'Premium',
      items: [
        { name: 'Aromaterapi Masajı', description: 'Doğal yağlarla terapi' },
        { name: 'Klasik Masaj', description: 'Geleneksel masaj teknikleri' },
        { name: 'İsveç Masajı', description: 'Derin rahatlama masajı' },
        { name: 'Refleksoloji', description: 'Ayak taban masajı' },
        { name: 'Sıcak Taş Masajı', description: 'Isıtılmış volkanik taşlarla' }
      ]
    }
  ]

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4 transform hover:scale-110 transition-transform duration-300">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-olive to-transparent mx-auto mb-6 animate-pulse"></div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-text-primary mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto animate-slideUp">
            Profesyonel ekibimiz ve lüks tesislerimizle size özel hizmetler sunuyoruz
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 animate-bounce-slow">
            <div className="w-2 h-2 bg-olive rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-olive rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-olive rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-olive text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse">
                {service.badge}
              </div>

              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs opacity-90 mb-2 tracking-wider uppercase group-hover:opacity-100 transition-opacity">{service.subtitle}</p>
                  <h3 className="text-3xl font-bold tracking-wide mb-2 transform group-hover:scale-105 transition-transform duration-500">{service.title}</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{service.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                {/* Price & Duration */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-dark">
                  <div className="flex items-center gap-2">
                    <div className="bg-olive text-white px-4 py-2 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                      <span className="font-bold text-base">{service.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{service.duration}</span>
                  </div>
                </div>

                {/* Services List */}
                <ul className="space-y-2.5 mb-7">
                  {service.items.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="group/item hover:bg-gradient-to-r hover:from-stone-light hover:to-transparent px-3 py-2.5 rounded-xl transition-all duration-300 transform hover:translate-x-1"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-olive group-hover/item:scale-150 group-hover/item:bg-gradient-to-r group-hover/item:from-olive group-hover/item:to-olive-light transition-all duration-300"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-secondary group-hover/item:text-olive transition-colors duration-300">{item.name}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className="w-full relative overflow-hidden border-2 border-olive text-olive py-4 rounded-xl hover:bg-olive hover:text-white transition-all duration-500 font-semibold text-sm tracking-wider uppercase group/btn shadow-md hover:shadow-xl">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Detaylar
                    <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-olive transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center animate-bounce-slow">
          <button className="relative group/main bg-olive text-white px-12 py-5 rounded-2xl hover:bg-olive-dark transition-all duration-500 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-6 h-6 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Tüm Hizmetlerimizi Görüntüle
              <svg className="w-6 h-6 group-hover/main:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover/main:translate-x-full transition-transform duration-1000"></div>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-2xl bg-olive animate-ping opacity-20"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularTherapies
