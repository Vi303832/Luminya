import { useState, useEffect } from 'react'

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Sayfa yüklendikten kısa bir süre sonra butonu göster
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    // WhatsApp numarasını buraya ekleyin (ör: 905xxxxxxxxx)
    const phoneNumber = '905xxxxxxxxx' // Telefon numarasını güncelleyin
    const message = 'Merhaba, bilgi almak istiyorum.' // Varsayılan mesaj
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* WhatsApp Butonu */}
      <button
        onClick={handleClick}
        className={`whatsapp-button ${isVisible ? 'visible' : ''}`}
        aria-label="WhatsApp ile iletişime geç"
      >
        {/* WhatsApp İkonu */}
        <svg 
          viewBox="0 0 32 32" 
          className="w-7 h-7 sm:w-8 sm:h-8"
          fill="currentColor"
        >
          <path d="M16.002 0C7.164 0 0 7.163 0 16c0 2.825.737 5.482 2.028 7.784L.699 29.351l5.71-1.5A15.93 15.93 0 0016.002 32C24.84 32 32 24.837 32 16S24.84 0 16.002 0zm0 29.333c-2.616 0-5.074-.754-7.144-2.054l-.513-.309-5.313 1.393 1.416-5.178-.338-.531A13.28 13.28 0 012.667 16c0-7.364 5.971-13.333 13.335-13.333S29.337 8.636 29.337 16c0 7.364-5.971 13.333-13.335 13.333z"/>
          <path d="M23.547 19.463c-.392-.196-2.317-1.144-2.677-1.275-.36-.131-.622-.196-.884.196-.262.392-1.014 1.275-1.243 1.537-.229.262-.458.295-.85.098-.392-.196-1.654-.609-3.15-1.943-1.164-1.038-1.95-2.321-2.179-2.713-.229-.392-.024-.604.172-.799.176-.176.392-.458.588-.687.196-.229.262-.392.392-.654.131-.262.065-.491-.033-.687-.098-.196-.884-2.129-1.212-2.917-.318-.767-.642-.663-.884-.675-.229-.011-.491-.013-.753-.013s-.687.098-1.047.491c-.36.392-1.374 1.341-1.374 3.274s1.407 3.798 1.603 4.059c.196.262 2.765 4.221 6.7 5.919.936.404 1.668.645 2.238.826.94.298 1.796.256 2.472.155.754-.113 2.317-.947 2.643-1.862.326-.915.326-1.7.229-1.862-.098-.164-.36-.262-.753-.458z"/>
        </svg>

        {/* Pulse animasyon dairesi */}
        <span className="whatsapp-pulse"></span>
      </button>

      {/* CSS Stilleri */}
      <style jsx>{`
        .whatsapp-button {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4),
                      0 2px 4px rgba(0, 0, 0, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: scale(0) translateY(20px);
        }

        .whatsapp-button.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .whatsapp-button:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.5),
                      0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .whatsapp-button:active {
          transform: scale(0.95);
        }

        /* Pulse animasyonu */
        .whatsapp-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.4);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
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
          .whatsapp-button {
            width: 52px;
            height: 52px;
            bottom: 20px;
            right: 20px;
          }
        }

        /* Tablet için ayarlamalar */
        @media (min-width: 641px) and (max-width: 1024px) {
          .whatsapp-button {
            width: 60px;
            height: 60px;
            bottom: 28px;
            right: 28px;
          }
        }

        /* Büyük ekranlar için */
        @media (min-width: 1025px) {
          .whatsapp-button {
            width: 64px;
            height: 64px;
            bottom: 32px;
            right: 32px;
          }
        }

        /* Erişilebilirlik: Klavye odağı */
        .whatsapp-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.3),
                      0 8px 20px rgba(37, 211, 102, 0.5);
        }

        /* Hover'da ek animasyon */
        .whatsapp-button:hover .whatsapp-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  )
}

export default WhatsAppButton
