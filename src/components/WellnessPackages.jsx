import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function WellnessPackages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

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

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-stone-light rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative"
              variants={itemVariants}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-text-primary">{pkg.title}</h3>
                  <div className="flex items-center gap-1 text-text-muted text-xs">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.duration}
                  </div>
                </div>
                <p className="text-text-secondary mb-4 text-sm">{pkg.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Paket İçeriği:</h4>
                  <ul className="space-y-1">
                    {pkg.services.map((service, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-text-secondary group/item hover:bg-gradient-to-r hover:from-stone-dark hover:to-transparent px-2 py-1.5 rounded-lg transition-all duration-300 transform hover:translate-x-1"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                      >
                        <svg className="w-4 h-4 text-olive group-hover/item:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="group-hover/item:text-olive transition-colors duration-300">{service}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <button className="w-full relative overflow-hidden bg-olive text-white py-2.5 rounded-lg hover:bg-olive-dark transition-all duration-500 font-medium shadow-md hover:shadow-xl group/btn">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Paketi Seç
                    <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-olive-dark transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WellnessPackages
