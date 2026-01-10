import { useState } from 'react'

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      name: 'Ayşe Yılmaz',
      role: 'Müşteri',
      rating: 5,
      text: 'Hayatımda gittiğim en iyi spa merkezi. Personel son derece ilgili ve profesyonel. Özellikle aromaterapi masajını herkese tavsiye ederim. Kendimi yeniden doğmuş gibi hissettim.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
    {
      name: 'Mehmet Demir',
      role: 'Müşteri',
      rating: 5,
      text: 'Eşimle birlikte çift masajı paketini aldık ve çok memnun kaldık. Ortam huzur vericiydi, terapistler çok deneyimliydi. Kesinlikle tekrar geleceğiz.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    {
      name: 'Zeynep Kaya',
      role: 'Müşteri',
      rating: 5,
      text: 'Hamileliğim döneminde prenatal masaj için geldim. Çok özenli ve dikkatli bir hizmet aldım. Kendimi çok rahat ve güvende hissettim. Teşekkürler!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    },
    {
      name: 'Can Özdemir',
      role: 'Müşteri',
      rating: 5,
      text: 'Spor sonrası kas ağrılarım için derin doku masajı yaptırdım. Gerçekten işe yarıyor. Terapistler anatomiye çok hakim. Sportif performansım arttı.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    },
  ]

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Müşteri Yorumları</h2>
          <p className="text-gray-600 text-lg">
            Misafirlerimizin deneyimleri bizim için çok değerli
          </p>
        </div>

        {/* Review Card */}
        <div className="relative bg-gradient-to-br from-[#8b6f47] to-[#6d5635] rounded-2xl shadow-2xl p-8 md:p-12 text-white">
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 text-white/20">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-xl text-center mb-8 leading-relaxed">
              "{reviews[currentIndex].text}"
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="w-16 h-16 rounded-full border-4 border-white object-cover"
              />
              <div className="text-left">
                <div className="font-bold text-lg">{reviews[currentIndex].name}</div>
                <div className="text-white/80">{reviews[currentIndex].role}</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentIndex === index ? 'bg-[#8b6f47] w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
