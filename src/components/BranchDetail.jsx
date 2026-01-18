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
            src={branch.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'}
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
          <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            {/* Call Button */}
            <a
              href={`tel:${branch.phone}`}
              className="w-full flex items-center justify-center gap-3 bg-olive text-white py-4 rounded-xl hover:bg-olive-dark transition-all duration-300 font-semibold shadow-md hover:shadow-xl hover:shadow-olive/50 hover:scale-[1.03] active:scale-[0.98] group hover:-translate-y-0.5"
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
              Hemen Ara
            </a>

            {/* Appointment Button */}
            <button className="w-full flex items-center justify-center gap-3 border-2 border-olive text-olive py-4 rounded-xl hover:bg-olive hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md hover:shadow-olive/30 hover:scale-[1.03] active:scale-[0.98] group hover:-translate-y-0.5">
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Randevu Al
            </button>

            {/* Directions Button */}
            <button className="w-full flex items-center justify-center gap-3 bg-stone-light text-espresso py-4 rounded-xl hover:bg-stone-dark/20 transition-all duration-300 font-semibold shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98] group hover:-translate-y-0.5">
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Yol Tarifi Al
            </button>
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
              <p className="text-text-muted text-sm group-hover:text-espresso transition-colors duration-300">{branch.city}</p>
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
              <p className="text-text-muted text-sm group-hover:text-espresso transition-colors duration-300">Hafta İçi: 09:00 - 20:00</p>
              <p className="text-text-muted text-sm group-hover:text-espresso transition-colors duration-300">Hafta Sonu: 10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BranchDetail
