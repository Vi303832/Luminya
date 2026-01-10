function PopularTherapies() {
  const therapies = [
    {
      title: 'İsveç Masajı',
      description: 'Geleneksel İsveç masaj teknikleri ile derin rahatlama',
      duration: '60 dakika',
      price: '₺850',
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    },
    {
      title: 'Aromaterapi Masajı',
      description: 'Doğal yağlarla zihin ve beden dengesini bulun',
      duration: '75 dakika',
      price: '₺950',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    },
    {
      title: 'Sıcak Taş Masajı',
      description: 'Isıtılmış bazalt taşlarıyla kas gevşemesi',
      duration: '90 dakika',
      price: '₺1,100',
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    },
    {
      title: 'Derin Doku Masajı',
      description: 'Kronik kas gerginliği için yoğun terapi',
      duration: '60 dakika',
      price: '₺900',
      rating: 4.8,
      reviews: 276,
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80',
    },
    {
      title: 'Thai Masajı',
      description: 'Geleneksel Tayland teknikleri ve esneme',
      duration: '90 dakika',
      price: '₺1,050',
      rating: 4.9,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    },
    {
      title: 'Refleksoloji',
      description: 'Ayak masajı ile tüm vücut dengelemesi',
      duration: '45 dakika',
      price: '₺650',
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80',
    },
    {
      title: 'Hamam ve Kese',
      description: 'Geleneksel Türk hamamı deneyimi',
      duration: '60 dakika',
      price: '₺750',
      rating: 4.8,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80',
    },
    {
      title: 'Prenatal Masaj',
      description: 'Hamilelik dönemine özel yumuşak masaj',
      duration: '60 dakika',
      price: '₺950',
      rating: 4.9,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    },
    {
      title: 'Çift Masajı',
      description: 'Sevdiğinizle birlikte özel deneyim',
      duration: '90 dakika',
      price: '₺2,000',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    },
  ]

  return (
    <section id="therapies" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Popüler Terapilerimiz</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Uzman terapistlerimiz eşliğinde size özel hazırlanmış terapi seçeneklerimizi keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapies.map((therapy, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={therapy.image}
                  alt={therapy.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-[#8b6f47] font-bold">{therapy.price}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{therapy.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{therapy.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-800">{therapy.rating}</span>
                    <span className="text-gray-500 text-sm">({therapy.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {therapy.duration}
                  </div>
                </div>

                <button className="w-full bg-[#8b6f47] text-white py-2.5 rounded-lg hover:bg-[#6d5635] transition font-medium">
                  Rezervasyon Yap
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularTherapies
