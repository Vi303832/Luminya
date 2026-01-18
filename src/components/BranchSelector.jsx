import { useState, useMemo } from 'react'

function BranchSelector({ onSelectBranch, searchQuery, setSearchQuery }) {

  // Branch data
  const branches = [
    {
      id: 1,
      name: 'Zeytinburnu Şube',
      city: 'İstanbul',
      address: 'Zeytinburnu, İstanbul, Zeytinburnu Hotel',
      phone: '0212 123 45 67',
      hours: '09:00 - 23:00',
      image: 'https://lunadenspa.com.tr/wp-content/uploads/2022/03/zeytinburnu-hotel.png'
    },
    {
      id: 2,
      name: 'Nişantaşı Şube',
      city: 'İstanbul',
      address: 'Nişantaşı, İstanbul, Abdi İpekçi Cad. No:28',
      phone: '0212 901 23 45',
      hours: '09:00 - 23:00',
      image: 'https://lunadenspa.com.tr/wp-content/uploads/2025/03/589c1c00d71d7-jpg.webp'
    },
    {
      id: 3,
      name: 'Land Park Hotel Avcılar',
      city: 'İstanbul',
      address: 'Avcılar, İstanbul, Land Park Hotel',
      phone: '0212 345 67 89',
      hours: '09:00 - 23:00',
      image: 'https://lunadenspa.com.tr/wp-content/uploads/2022/03/avcilar-land-park.png'
    },
    {
      id: 4,
      name: 'Clarion Hotel Kahramanmaraş',
      city: 'Kahramanmaraş',
      address: 'Kahramanmaraş, Clarion Hotel',
      phone: '0344 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      id: 5,
      name: 'Revizyon Yapı Kahramanmaraş',
      city: 'Kahramanmaraş',
      address: 'Kahramanmaraş, Revizyon Yapı',
      phone: '0344 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      id: 6,
      name: 'Soliport Hotel Alaçatı',
      city: 'Alaçatı',
      address: 'Alaçatı, İzmir, Soliport Hotel',
      phone: '0232 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    },
    {
      id: 7,
      name: 'Korupark AVM Bursa',
      city: 'Bursa',
      address: 'Bursa, Korupark AVM',
      phone: '0224 000 00 00',
      hours: '10:00 - 22:00',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?w=800'
    },
    {
      id: 8,
      name: 'The Conforium Hotel İstanbul',
      city: 'İstanbul',
      address: 'İstanbul, The Conforium Hotel',
      phone: '0212 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      id: 9,
      name: 'Dedeman Şanlıurfa',
      city: 'Şanlıurfa',
      address: 'Şanlıurfa, Dedeman Hotel',
      phone: '0414 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    },
    {
      id: 10,
      name: 'Ramada by Wyndham Istanbul Merter',
      city: 'İstanbul',
      address: 'Merter, İstanbul, Ramada by Wyndham',
      phone: '0212 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    },
    {
      id: 11,
      name: 'Pullman Otel İstanbul',
      city: 'İstanbul',
      address: 'İstanbul, Pullman Hotel',
      phone: '0212 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    },
    {
      id: 12,
      name: 'Ramada Otel Elazığ',
      city: 'Elazığ',
      address: 'Elazığ, Ramada Hotel',
      phone: '0424 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    },
    {
      id: 13,
      name: 'Euphoria Fitness Bursa Osmangazi',
      city: 'Bursa',
      address: 'Osmangazi, Bursa, Euphoria Fitness',
      phone: '0224 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      id: 14,
      name: 'Ramada By Wyndham Çeşme',
      city: 'Çeşme',
      address: 'Çeşme, İzmir, Ramada By Wyndham',
      phone: '0232 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    },
    {
      id: 15,
      name: 'Dolce Hotels & Resorts by Wyndham Alaçatı',
      city: 'Alaçatı',
      address: 'Alaçatı, İzmir, Dolce Hotels & Resorts',
      phone: '0232 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    },
    {
      id: 16,
      name: 'Euphoria Plus Ege Park AVM İzmir Balçova',
      city: 'İzmir',
      address: 'Balçova, İzmir, Ege Park AVM, Euphoria Plus',
      phone: '0232 000 00 00',
      hours: '10:00 - 22:00',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
    },
    {
      id: 17,
      name: 'Latanya Hotel Ankara',
      city: 'Ankara',
      address: 'Ankara, Latanya Hotel',
      phone: '0312 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      id: 18,
      name: 'Büyük Mardin Oteli',
      city: 'Mardin',
      address: 'Mardin, Büyük Mardin Oteli',
      phone: '0482 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    },
    {
      id: 19,
      name: 'Sera Lake Center Hotel Trabzon',
      city: 'Trabzon',
      address: 'Trabzon, Sera Lake Center Hotel',
      phone: '0462 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    },
    {
      id: 20,
      name: 'The Green Park Hotel Diyarbakır',
      city: 'Diyarbakır',
      address: 'Diyarbakır, The Green Park Hotel',
      phone: '0412 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      id: 21,
      name: 'Days Inn & Suites by Wyndham Esenyurt İstanbul',
      city: 'İstanbul',
      address: 'Esenyurt, İstanbul, Days Inn & Suites',
      phone: '0212 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    },
    {
      id: 22,
      name: 'Casa Nova Hotel',
      city: 'İstanbul',
      address: 'İstanbul, Casa Nova Hotel',
      phone: '0212 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      id: 23,
      name: 'Sürmeli Otel İstanbul',
      city: 'İstanbul',
      address: 'İstanbul, Sürmeli Hotel',
      phone: '0212 000 00 00',
      hours: '09:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    },
  ]

  // Filter and sort branches
  const filteredBranches = useMemo(() => {
    const filtered = branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort alphabetically by city, then by name
    return filtered.sort((a, b) => {
      const cityCompare = a.city.localeCompare(b.city, 'tr')
      if (cityCompare !== 0) return cityCompare
      return a.name.localeCompare(b.name, 'tr')
    })
  }, [searchQuery])

  const handleBranchClick = (branch) => {
    if (onSelectBranch) {
      onSelectBranch(branch)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Branch List */}
      <div className="flex-1 overflow-y-auto">
        {filteredBranches.length === 0 ? (
          <div className="text-center py-16 px-6 animate-fadeIn">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ animationDuration: '2s' }}
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
            <p
              className="text-gray-500 text-xl font-medium animate-fadeIn"
              style={{ animationDelay: '200ms' }}
            >
              Şube bulunamadı
            </p>
            <p
              className="text-gray-400 text-base mt-2 animate-fadeIn"
              style={{ animationDelay: '400ms' }}
            >
              Farklı bir arama deneyin
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {filteredBranches.map((branch, index) => (
              <button
                key={branch.id}
                onClick={() => handleBranchClick(branch)}
                className="w-full text-left px-6 py-4 bg-white hover:bg-linear-to-r hover:from-stone-light hover:to-transparent shadow-sm hover:shadow-md transition-all duration-300 group border-b border-stone-dark/10 last:border-b-0 active:bg-olive/5 active:scale-[0.99] transform"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeIn 0.4s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Branch Name with City Badge */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h4 className="text-base font-bold text-espresso group-hover:text-olive transition-all duration-300 truncate group-hover:translate-x-1">
                        {branch.name}
                      </h4>
                      <span className="px-2.5 py-0.5 bg-olive/10 text-olive text-xs font-bold rounded-full shrink-0 group-hover:bg-olive group-hover:text-white group-hover:scale-110 transition-all duration-300 group-hover:shadow-md">
                        {branch.city}
                      </span>
                    </div>

                    {/* Phone */}
                    <p className="text-sm text-text-muted group-hover:text-olive flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
                      <svg
                        className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform duration-300"
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
                      <span className="font-medium">{branch.phone}</span>
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="shrink-0">
                    <svg
                      className="w-5 h-5 text-text-muted group-hover:text-olive group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Search Bar Component - can be used separately
export function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 group-focus-within:text-olive">
        <svg
          className="w-5 h-5 text-gray-400 group-focus-within:text-olive group-focus-within:scale-110 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Şehir veya şube ara..."
        className="w-full pl-11 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive hover:border-gray-300 hover:shadow-sm transition-all duration-300 text-sm transform focus:scale-[1.01]"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-olive/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group/clear animate-fadeIn"
        >
          <svg
            className="w-4 h-4 text-gray-500 group-hover/clear:text-olive group-hover/clear:rotate-90 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default BranchSelector
