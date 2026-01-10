import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#8b6f47]">Ruhunuzu</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#8b6f47] transition">Anasayfa</a>
            <a href="#therapies" className="text-gray-700 hover:text-[#8b6f47] transition">Terapiler</a>
            <a href="#packages" className="text-gray-700 hover:text-[#8b6f47] transition">Paketler</a>
            <a href="#about" className="text-gray-700 hover:text-[#8b6f47] transition">Hakkımızda</a>
            <a href="#contact" className="text-gray-700 hover:text-[#8b6f47] transition">İletişim</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-[#8b6f47] text-white px-6 py-2.5 rounded-lg hover:bg-[#6d5635] transition">
              Randevu Al
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-[#8b6f47] transition">Anasayfa</a>
              <a href="#therapies" className="text-gray-700 hover:text-[#8b6f47] transition">Terapiler</a>
              <a href="#packages" className="text-gray-700 hover:text-[#8b6f47] transition">Paketler</a>
              <a href="#about" className="text-gray-700 hover:text-[#8b6f47] transition">Hakkımızda</a>
              <a href="#contact" className="text-gray-700 hover:text-[#8b6f47] transition">İletişim</a>
              <button className="bg-[#8b6f47] text-white px-6 py-2.5 rounded-lg hover:bg-[#6d5635] transition text-left">
                Randevu Al
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
