function BranchDetail({ branch, onBack }) {
  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Back Button */}
      <div className="px-6 py-4 border-b border-gray-200 animate-fadeIn" style={{ animationDelay: '50ms' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-olive hover:text-olive-dark transition-all duration-300 group hover:gap-3 hover:scale-105 active:scale-95"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 group-hover:scale-110 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-semibold">Geri</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Branch Image */}
        <div className="relative h-64 overflow-hidden animate-fadeIn group/image" style={{ animationDelay: '100ms' }}>
          <img
            src={branch.imageUrl || branch.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'}
            alt={branch.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover/image:from-black/60"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-2xl font-bold animate-fadeIn drop-shadow-lg transition-all duration-300 group-hover/image:text-3xl group-hover/image:translate-y-[-4px]" style={{ animationDelay: '150ms' }}>
              {branch.name}
            </h3>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            {/* Call Button */}
            <a
              href={`tel:${branch.phone}`}
              className="flex items-center justify-center gap-2 bg-olive text-white py-4 rounded-xl hover:bg-olive-dark transition-all duration-300 font-semibold shadow-md hover:shadow-xl hover:shadow-olive/50 hover:scale-[1.03] active:scale-[0.98] group hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Arama
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${(branch.whatsapp || branch.phone).replace(/\s/g, '').replace(/^0/, '90')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl hover:bg-[#20BA5A] transition-all duration-300 font-semibold shadow-md hover:shadow-xl hover:shadow-[#25D366]/50 hover:scale-[1.03] active:scale-[0.98] group hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 p-4 bg-stone-light rounded-xl hover:shadow-lg hover:shadow-olive/10 transition-all duration-300 group animate-fadeIn hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer" style={{ animationDelay: '300ms' }}>
            <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-olive/20 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-6 h-6 text-olive group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-espresso mb-1 group-hover:text-olive transition-colors duration-300">Adres</h4>
              <p className="text-text-muted text-sm group-hover:text-espresso transition-colors duration-300">{branch.address}</p>
              {branch.district && branch.city && (
                <p className="text-text-muted text-sm group-hover:text-espresso transition-colors duration-300">{branch.district} / {branch.city}</p>
              )}
              {!branch.district && branch.city && (
                <p className="text-text-muted text-sm group-hover:text-espresso transition-colors duration-300">{branch.city}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 p-4 bg-stone-light rounded-xl hover:shadow-lg hover:shadow-olive/10 transition-all duration-300 group animate-fadeIn hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer" style={{ animationDelay: '400ms' }}>
            <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-olive/20 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-6 h-6 text-olive group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-espresso mb-1 group-hover:text-olive transition-colors duration-300">Telefon</h4>
              <a
                href={`tel:${branch.phone}`}
                className="text-olive font-semibold hover:text-olive-dark transition-all duration-300 inline-block group-hover:scale-105"
              >
                {branch.phone}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-start gap-4 p-4 bg-stone-light rounded-xl hover:shadow-lg hover:shadow-olive/10 transition-all duration-300 group animate-fadeIn hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer" style={{ animationDelay: '500ms' }}>
            <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-olive/20 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-6 h-6 text-olive group-hover:scale-110 group-hover:rotate-180 transition-all duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-espresso mb-1 group-hover:text-olive transition-colors duration-300">Çalışma Saatleri</h4>
              <p className="text-text-muted text-sm group-hover:text-espresso transition-colors duration-300">Her Gün: {branch.hours || '09:00 - 23:00'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BranchDetail
