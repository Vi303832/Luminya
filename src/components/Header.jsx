import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white tracking-wide">Luminya</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-[#d4a574] transition font-medium">ANASAYFA</a>
            <a href="#about" className="text-white hover:text-[#d4a574] transition font-medium">HAKKIMIZDA</a>
            <a href="#services" className="text-white hover:text-[#d4a574] transition font-medium">HİZMETLERİMİZ</a>
            <a href="#branches" className="text-white hover:text-[#d4a574] transition font-medium">ŞUBELERİMİZ</a>
            <a href="#contact" className="text-white hover:text-[#d4a574] transition font-medium">İLETİŞİM</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="bg-[#8b6f47] text-white px-6 py-2.5 rounded hover:bg-[#6d5635] transition font-medium">
              Randevu Al
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
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
          <div className="md:hidden py-4 border-t border-white/20 bg-gray-900/95 backdrop-blur-sm -mx-4 px-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-[#d4a574] transition">ANASAYFA</a>
              <a href="#about" className="text-white hover:text-[#d4a574] transition">HAKKIMIZDA</a>
              <a href="#services" className="text-white hover:text-[#d4a574] transition">HİZMETLERİMİZ</a>
              <a href="#branches" className="text-white hover:text-[#d4a574] transition">ŞUBELERİMİZ</a>
              <a href="#contact" className="text-white hover:text-[#d4a574] transition">İLETİŞİM</a>
              <button className="bg-[#8b6f47] text-white px-6 py-2.5 rounded hover:bg-[#6d5635] transition mt-2">
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
