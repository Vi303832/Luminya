import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Tam ekran */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9999 }}
            onClick={onClose}
          />

          {/* Bottom Sheet - Aşağıdan yukarıya açılan */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="fixed inset-x-0 bottom-0"
            style={{
              height: 'calc(100vh - 80px)',
              maxHeight: 'calc(100vh - 80px)',
              zIndex: 10000
            }}
          >
            <div className="bg-white w-full h-full flex flex-col shadow-2xl rounded-t-3xl">
              {/* Handle Bar */}
              <div
                className="flex-shrink-0 flex justify-center pt-4 pb-2 cursor-pointer"
                onClick={onClose}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors" />
              </div>

              {/* Header */}
              <div className="flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-heading font-semibold text-espresso">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                    aria-label="Kapat"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 group-hover:text-espresso transition-colors"
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
                {searchBar && <div className="mt-3">{searchBar}</div>}
              </div>

              {/* Content */}
              <div
                className="flex-1 overflow-y-auto px-6 py-4"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default BottomSheet
