function Mission() {
  return (
    <section id="about" className="py-16 px-4 bg-stone-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80"
                alt="Spa interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-4">
                <div className="bg-olive text-white p-4 rounded-full">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-olive">15K+</div>
                  <div className="text-sm text-text-secondary">Mutlu Müşteri</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-heading text-4xl font-normal text-text-primary mb-6">
              Misyonumuz ve Vizyonumuz
            </h2>
            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              2010 yılından beri wellness ve spa sektöründe hizmet vermekteyiz. Amacımız, 
              misafirlerimize sadece bir hizmet değil, tam bir deneyim sunmaktır.
            </p>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Doğal ve organik ürünler kullanarak, geleneksel ve modern teknikleri birleştirerek, 
              sizlere en iyi hizmeti sunmak için çalışıyoruz. Her misafirimiz bizim için özeldir 
              ve onların mutluluğu bizim en büyük ödülümüzdür.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-olive mb-2">15+</div>
                <div className="text-text-secondary">Yıllık Deneyim</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-olive mb-2">50+</div>
                <div className="text-text-secondary">Uzman Personel</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-olive mb-2">100%</div>
                <div className="text-text-secondary">Doğal Ürünler</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-olive mb-2">4.9</div>
                <div className="text-text-secondary">Müşteri Puanı</div>
              </div>
            </div>

            <button className="bg-olive text-white px-8 py-3 rounded-lg hover:bg-olive-dark transition font-medium">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
