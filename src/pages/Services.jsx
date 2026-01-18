import { motion } from "framer-motion";
import { Sparkles, Heart, Droplets, Wind, Flower, Flame, Leaf, Star } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Türk Hamamı",
    description: "Geleneksel Türk hamamı deneyimi. Kese, köpük masajı ve peştemal.",
    duration: "60 dakika",
    price: "450₺",
    features: ["Kese & Köpük", "Göbek Taşı", "Geleneksel Masaj", "Peştemal Hizmeti"]
  },
  {
    icon: Heart,
    title: "Aroma Terapi",
    description: "Özel yağlarla yapılan aromatik masaj ile ruh ve beden dinginliği.",
    duration: "75 dakika",
    price: "550₺",
    features: ["Özel Yağ Karışımı", "Rahatlatıcı Masaj", "Aromaterapi Buhar", "Sıcak Havlu"]
  },
  {
    icon: Flame,
    title: "Hot Stone Masaj",
    description: "Sıcak taşlarla yapılan derin doku masajı. Kasları gevşetir.",
    duration: "90 dakika",
    price: "650₺",
    features: ["Volkanik Taşlar", "Derin Doku Masajı", "Enerji Dengeleme", "Aromaterapi"]
  },
  {
    icon: Flower,
    title: "Spa & Cilt Bakımı",
    description: "Profesyonel cilt bakımı ile cildinizi yenileyin ve canlandırın.",
    duration: "90 dakika",
    price: "600₺",
    features: ["Cilt Analizi", "Peeling & Maske", "Nemlendirme", "Anti-Aging Bakım"]
  },
  {
    icon: Wind,
    title: "Thai Masaj",
    description: "Gerinme ve baskı teknikleri ile esneklik ve enerji artışı.",
    duration: "90 dakika",
    price: "700₺",
    features: ["Gerinme Egzersizleri", "Akupresur", "Enerji Hatları", "Yoga Teknikleri"]
  },
  {
    icon: Leaf,
    title: "Ayurvedik Terapi",
    description: "Hint kökenli holistik yaklaşımla vücut ve zihin dengesi.",
    duration: "120 dakika",
    price: "800₺",
    features: ["Dosha Analizi", "Bitki Yağları", "Shirodhara", "Marma Noktaları"]
  },
  {
    icon: Sparkles,
    title: "İsveç Masajı",
    description: "Klasik masaj teknikleriyle kasları gevşeten yumuşak terapi.",
    duration: "60 dakika",
    price: "500₺",
    features: ["Klasik Teknikler", "Kas Gevşetme", "Dolaşım Artışı", "Stres Giderme"]
  },
  {
    icon: Star,
    title: "Refleksoloji",
    description: "Ayak masajı ile tüm vücutta enerji dengeleme ve rahatlama.",
    duration: "45 dakika",
    price: "400₺",
    features: ["Refleks Noktaları", "Akupresur", "Enerji Dengeleme", "Rahatlatıcı"]
  }
];

const packages = [
  {
    name: "Huzur Paketi",
    duration: "3 saat",
    price: "1.200₺",
    services: ["Türk Hamamı", "Aroma Terapi", "Cilt Bakımı", "İkramlar"],
    popular: false
  },
  {
    name: "Lüks Paket",
    duration: "4 saat",
    price: "1.800₺",
    services: ["Hot Stone Masaj", "Thai Masaj", "Cilt Bakımı", "Özel Yemek", "VIP Oda"],
    popular: true
  },
  {
    name: "Romantik Çift Paketi",
    duration: "3.5 saat",
    price: "3.200₺",
    services: ["Çift Odası", "Aromaterapi", "Şampanya & İkramlar", "Özel Havuz", "Masaj Seansı"],
    popular: false
  }
];

const Services = () => {
  return (
    <div className="bg-cream min-h-screen">
      {/* Packages Section */}
      <section className="pt-32 pb-20 md:py-32 bg-cream relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-olive rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-72 h-72 bg-espresso rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-1.5 mb-4 rounded-full bg-olive/15 backdrop-blur-md border border-olive/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-olive-dark">ÖZEL PAKETLER</span>
            </motion.div>
            <h2 className="font-heading text-4xl md:text-5xl font-extralight text-espresso mb-4">
              Kampanya & <span className="italic font-light text-olive-dark">Wellness Paketleri</span>
            </h2>
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-16 h-px bg-linear-to-r from-transparent via-olive/60 to-transparent" />
              <p className="text-espresso/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Birden fazla hizmeti bir arada deneyimleyin, avantajlı fiyatlardan yararlanın
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`group relative bg-white rounded-3xl p-8 overflow-hidden border ${pkg.popular ? 'border-olive ring-2 ring-olive/20 shadow-2xl' : 'border-stone-dark/10 shadow-lg'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, shadow: "2xl" }}
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-linear-to-br from-olive/5 via-olive/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {pkg.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-olive text-white rounded-full text-xs font-medium tracking-wider shadow-lg"
                    initial={{ scale: 0, rotate: -5 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    ✨ En Popüler
                  </motion.div>
                )}

                <div className="text-center mb-6 relative">
                  <motion.h3
                    className="font-heading text-2xl font-bold text-espresso mb-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {pkg.name}
                  </motion.h3>
                  <div className="text-espresso/60 text-sm mb-4 font-light">{pkg.duration}</div>
                  <div className="font-heading text-4xl font-bold text-olive-dark">
                    {pkg.price}
                  </div>
                </div>

                <div className="space-y-3 mb-6 relative">
                  {pkg.services.map((service, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-espresso/80"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <div className="w-5 h-5 bg-olive/25 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 bg-olive-dark rounded-full" />
                      </div>
                      {service}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className={`relative w-full py-3 rounded-full font-bold text-sm tracking-wider overflow-hidden ${pkg.popular
                    ? 'bg-olive text-white'
                    : 'bg-olive/10 text-olive'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`absolute inset-0 ${pkg.popular ? 'bg-olive-dark' : 'bg-olive'} translate-y-full group-hover:translate-y-0 transition-transform duration-300`} />
                  <div className={`relative flex items-center justify-center gap-2 ${!pkg.popular && 'group-hover:text-white'} transition-colors duration-300`}>
                    <span className="uppercase">Randevu Al</span>
                    <div className={`w-5 h-5 rounded-full ${pkg.popular ? 'bg-white text-olive' : 'bg-olive text-white'} flex items-center justify-center group-hover:rotate-45 transition-transform duration-300`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-cream">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-1.5 mb-4 rounded-full bg-espresso/10 backdrop-blur-md border border-espresso/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-espresso">MASAJ & TERAPİ</span>
            </motion.div>
            <h2 className="font-heading text-4xl md:text-5xl font-extralight text-espresso mb-4">
              Profesyonel <span className="italic font-light text-olive-dark">Hizmetlerimiz</span>
            </h2>
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-16 h-px bg-linear-to-r from-transparent via-espresso/50 to-transparent" />
              <p className="text-espresso/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Uzman terapistlerimizle size en uygun hizmeti sunuyoruz
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-6 overflow-hidden border border-stone-dark/10 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, shadow: "2xl" }}
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-olive/5 via-olive/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="relative w-14 h-14 bg-olive/15 rounded-full flex items-center justify-center mb-4 group-hover:bg-olive/25"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <service.icon className="w-7 h-7 text-olive-dark" />
                </motion.div>

                <motion.h3
                  className="relative font-heading text-xl font-semibold text-espresso mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>

                <p className="relative text-espresso/70 text-sm mb-4 leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="relative space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-espresso/60"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <div className="w-5 h-5 bg-olive/25 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 bg-olive-dark rounded-full" />
                      </div>
                      {feature}
                    </motion.div>
                  ))}
                </div>

                <div className="relative text-center pt-4 border-t border-stone-dark/10">
                  <div className="text-xs text-espresso/60 mb-3 font-light">{service.duration}</div>
                  <motion.button
                    className="relative w-full py-3 rounded-full font-bold text-sm tracking-wider overflow-hidden bg-olive/15 text-olive-dark"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-olive translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                      <span className="uppercase">Randevu Al</span>
                      <div className="w-5 h-5 rounded-full bg-olive-dark text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-espresso to-espresso/90 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-olive" />
            <h2 className="font-heading text-4xl md:text-5xl font-normal mb-6">
              Kendinize Zaman Ayırın
            </h2>
            <p className="text-cream/90 text-lg mb-8 leading-relaxed">
              Profesyonel ekibimiz ve lüks olanaklarımızla size özel bir deneyim sunuyoruz.
              Hemen randevu alın, kendinizi şımartın.
            </p>
            <motion.a
              href="tel:+905331334339"
              className="inline-block px-8 py-4 bg-olive text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hemen Randevu Al
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
