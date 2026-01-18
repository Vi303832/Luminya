import { useEffect } from 'react'

function BottomSheet({ isOpen, onClose, title, children, searchBar }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-all duration-500 ease-out animate-fadeIn cursor-pointer"
        onClick={onClose}
        style={{ backdropFilter: 'blur(4px)' }}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
        <div className="bg-white rounded-t-3xl shadow-2xl h-[90vh] flex flex-col transition-all duration-500 ease-out transform">
          {/* Handle Bar */}
          <div className="flex justify-center pt-3 pb-2 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-olive hover:w-16 transition-all duration-300 ease-out cursor-grab active:cursor-grabbing active:bg-olive-dark" />
          </div>

          {/* Header */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h2
                className="text-xl font-heading font-semibold text-espresso animate-fadeIn transition-all duration-300"
                style={{ animationDelay: '150ms' }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-olive/10 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95 group animate-fadeIn"
                style={{ animationDelay: '200ms' }}
                aria-label="Kapat"
              >
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-olive transition-colors duration-300"
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
            </div>
            {/* Search Bar */}
            {searchBar && (
              <div
                className="mt-3 animate-fadeIn transition-all duration-300"
                style={{ animationDelay: '250ms' }}
              >
                {searchBar}
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="flex-1 overflow-y-auto animate-fadeIn transition-all duration-300"
            style={{ animationDelay: '300ms' }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomSheet
