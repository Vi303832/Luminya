import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'

function ReservationFloatingButton({ onClick }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Sayfa yüklendikten kısa bir süre sonra butonu göster
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Randevu Butonu */}
      <button
        onClick={onClick}
        className={`reservation-button ${isVisible ? 'visible' : ''}`}
        aria-label="Randevu Al"
      >
        <Calendar className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>

      {/* CSS Stilleri */}
      <style jsx>{`
        .reservation-button {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 1000;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #E87A5D 0%, #D96A4D 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(232, 122, 93, 0.4),
                      0 2px 4px rgba(0, 0, 0, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: scale(0) translateY(20px);
        }

        .reservation-button.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .reservation-button:active {
          transform: scale(0.95);
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Mobil için ayarlamalar */
        @media (max-width: 640px) {
          .reservation-button {
            width: 52px;
            height: 52px;
            bottom: 20px;
            left: 20px;
          }
        }

        /* Tablet için ayarlamalar */
        @media (min-width: 641px) and (max-width: 1024px) {
          .reservation-button {
            width: 60px;
            height: 60px;
            bottom: 28px;
            left: 28px;
          }
        }

        /* Büyük ekranlar için */
        @media (min-width: 1025px) {
          .reservation-button {
            width: 64px;
            height: 64px;
            bottom: 32px;
            left: 32px;
          }
        }

        /* Erişilebilirlik: Klavye odağı */
        .reservation-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(232, 122, 93, 0.3),
                      0 8px 20px rgba(232, 122, 93, 0.5);
        }
      `}</style>
    </>
  )
}

export default ReservationFloatingButton
