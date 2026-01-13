function WellnessPackages() {
  const packages = [
    {
      title: 'Wellness Paketi',
      description: 'Tam gün wellness deneyimi',
      services: ['Hamam', 'Masaj', 'Cilt Bakımı', 'Öğle Yemeği'],
      duration: '6 saat',
      price: '₺2,500',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    },
    {
      title: 'Detoks Paketi',
      description: 'Vücudunuzu arındırın',
      services: ['Detoks Masajı', 'Sauna', 'Özel Çay', 'Diyet Önerisi'],
      duration: '4 saat',
      price: '₺1,800',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    },
    {
      title: 'Romantik Çift Paketi',
      description: 'Sevdiğinizle özel anlar',
      services: ['Çift Masajı', 'Şampanya', 'Özel Oda', 'Çiçek'],
      duration: '3 saat',
      price: '₺3,200',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    },
    {
      title: 'Anti-Stress Paketi',
      description: 'Stresinizden arının',
      services: ['Aromaterapi', 'Baş Masajı', 'Meditasyon', 'Çay Servisi'],
      duration: '3 saat',
      price: '₺1,500',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    },
    {
      title: 'Güzellik Paketi',
      description: 'Cilt ve vücut bakımı',
      services: ['Yüz Bakımı', 'Vücut Peelingi', 'Nemlendirme', 'Manikür'],
      duration: '4 saat',
      price: '₺2,100',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    },
    {
      title: 'Hafta Sonu Kaçamağı',
      description: '2 gün 1 gece konaklama',
      services: ['Konaklama', 'Kahvaltı', '2 Masaj', 'Havuz', 'Akşam Yemeği'],
      duration: '2 gün',
      price: '₺5,500',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    },
    {
      title: 'Prenatal Bakım',
      description: 'Hamileler için özel',
      services: ['Prenatal Masaj', 'Özel Yağlar', 'Gevşeme', 'Bitki Çayı'],
      duration: '2 saat',
      price: '₺1,200',
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80',
    },
    {
      title: 'Spor Sonrası Bakım',
      description: 'Sporcu paketleri',
      services: ['Spor Masajı', 'Kas Gevşetme', 'Soğuk Kompres', 'Protein Shake'],
      duration: '2 saat',
      price: '₺1,300',
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80',
    },
    {
      title: 'VIP Lüks Paket',
      description: 'Özel hizmet ve ayrıcalıklar',
      services: ['Özel Suite', 'Premium Masaj', 'Şampanya', 'Transfer', 'Akşam Yemeği'],
      duration: '8 saat',
      price: '₺6,500',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    },
  ]

  return (
    <section id="packages" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-normal text-text-primary mb-4">Wellness Paketlerimiz</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            İhtiyaçlarınıza özel hazırlanmış komple wellness paketlerimizi inceleyin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-stone-light rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">{pkg.title}</h3>
                <p className="text-text-secondary mb-4 text-sm">{pkg.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Paket İçeriği:</h4>
                  <ul className="space-y-1">
                    {pkg.services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="w-4 h-4 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4 pt-4 border-t border-stone-dark">
                  <div className="flex items-center gap-1 text-text-muted text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.duration}
                  </div>
                  <span className="text-2xl font-bold text-olive">{pkg.price}</span>
                </div>

                <button className="w-full bg-olive text-white py-2.5 rounded-lg hover:bg-olive-dark transition font-medium">
                  Paketi Seç
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WellnessPackages
