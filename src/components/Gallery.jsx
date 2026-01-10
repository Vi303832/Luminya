import { useState } from 'react'

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'massage', name: 'Masaj' },
    { id: 'spa', name: 'Spa' },
    { id: 'facility', name: 'Tesis' },
  ]

  const images = [
    { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', category: 'spa' },
    { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', category: 'massage' },
    { url: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80', category: 'facility' },
    { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', category: 'massage' },
    { url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', category: 'spa' },
    { url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80', category: 'facility' },
  ]

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">İnteraktif Galeri</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Tesislerimizi ve hizmetlerimizi daha yakından tanıyın
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-[#8b6f47] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-lg"
            >
              <img
                src={image.url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
