import { useState, useMemo } from 'react'

function BranchSelector({ onSelectBranch, searchQuery, setSearchQuery }) {

  // Sample branch data - you can replace this with real data later
  const branches = [
    { id: 1, name: 'Adana Şube', city: 'Adana', address: 'Seyhan Merkez', phone: '0322 123 45 67' },
    { id: 2, name: 'Ankara Çankaya', city: 'Ankara', address: 'Çankaya Merkez', phone: '0312 234 56 78' },
    { id: 3, name: 'Ankara Kızılay', city: 'Ankara', address: 'Kızılay Meydanı', phone: '0312 345 67 89' },
    { id: 4, name: 'Antalya Lara', city: 'Antalya', address: 'Lara Plajı Yanı', phone: '0242 456 78 90' },
    { id: 5, name: 'Bursa Nilüfer', city: 'Bursa', address: 'Nilüfer Merkez', phone: '0224 567 89 01' },
    { id: 6, name: 'Eskişehir Şube', city: 'Eskişehir', address: 'Odunpazarı', phone: '0222 678 90 12' },
    { id: 7, name: 'İstanbul Beşiktaş', city: 'İstanbul', address: 'Beşiktaş İskele', phone: '0212 789 01 23' },
    { id: 8, name: 'İstanbul Kadıköy', city: 'İstanbul', address: 'Moda Caddesi', phone: '0216 890 12 34' },
    { id: 9, name: 'İstanbul Nişantaşı', city: 'İstanbul', address: 'Teşvikiye', phone: '0212 901 23 45' },
    { id: 10, name: 'İzmir Alsancak', city: 'İzmir', address: 'Kordon Boyu', phone: '0232 012 34 56' },
    { id: 11, name: 'İzmir Bornova', city: 'İzmir', address: 'Bornova Merkez', phone: '0232 123 45 67' },
    { id: 12, name: 'Kocaeli Şube', city: 'Kocaeli', address: 'İzmit Merkez', phone: '0262 234 56 78' },
    { id: 13, name: 'Muğla Bodrum', city: 'Muğla', address: 'Bodrum Marina', phone: '0252 345 67 89' },
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
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {filteredBranches.length === 0 ? (
          <div className="text-center py-16 animate-fadeIn">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-4"
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
            <p className="text-gray-500 text-xl font-medium">Şube bulunamadı</p>
            <p className="text-gray-400 text-base mt-2">Farklı bir arama deneyin</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBranches.map((branch, index) => (
              <button
                key={branch.id}
                onClick={() => handleBranchClick(branch)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-olive hover:bg-olive/5 hover:shadow-lg transition-all duration-300 group bg-white active:scale-[0.98]"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeIn 0.4s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Branch Name with City Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-base font-bold text-espresso group-hover:text-olive transition-colors duration-200 truncate">
                        {branch.name}
                      </h4>
                      <span className="px-2 py-0.5 bg-olive/10 text-olive text-xs font-semibold rounded-full shrink-0">
                        {branch.city}
                      </span>
                    </div>

                    {/* Phone */}
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-olive shrink-0"
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
                      className="w-6 h-6 text-gray-300 group-hover:text-olive group-hover:translate-x-1 transition-all duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
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
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
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
        className="w-full pl-11 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all duration-200 text-sm"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <svg
            className="w-4 h-4 text-gray-500"
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
