import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { getDb } from '../utils/firebaseLazy'

function Kampanya({ onOpenBottomSheet }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(false) // Start with false to show defaults immediately

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      // Don't show loading, just fetch in background
      // Lazy load Firebase
      const db = await getDb()
      const campaignsRef = collection(db, 'campaigns')

      // Try with orderBy first, if it fails use simple query
      let querySnapshot
      try {
        const q = query(
          campaignsRef,
          where('active', '==', true),
          orderBy('order', 'asc'),
          limit(3)
        )
        querySnapshot = await getDocs(q)
      } catch (orderByError) {
        // If orderBy fails (no index), use simple query
        try {
          const q = query(
            campaignsRef,
            where('active', '==', true),
            limit(3)
          )
          querySnapshot = await getDocs(q)
        } catch (simpleQueryError) {
          // If simple query also fails, try without where clause
          try {
            querySnapshot = await getDocs(campaignsRef)
          } catch (finalError) {
            setLoading(false)
            return
          }
        }
      }

      if (!querySnapshot || querySnapshot.empty) {
        setLoading(false)
        return
      }

      const campaignsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(campaign => campaign.active !== false) // Filter out inactive campaigns

      // Sort manually by order field
      campaignsData.sort((a, b) => (a.order || 0) - (b.order || 0))

      // Limit to 3 after sorting
      const limitedCampaigns = campaignsData.slice(0, 3)

      setCampaigns(limitedCampaigns)
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
  }

  // Default campaigns if Firebase is empty
  const defaultCampaigns = [
    {
      id: 'default-1',
      branchName: 'Kadıköy Şubesi',
      branchImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=60&fm=webp',
      description: 'Özel kampanyalarımızdan haberdar olun ve avantajlı fiyatlardan yararlanın',
      badge: 'Özel Kampanya'
    },
    {
      id: 'default-2',
      branchName: 'Beşiktaş Şubesi',
      branchImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=60&fm=webp',
      description: 'Wellness paketlerimizde özel indirimler ve hediye seçenekleri',
      badge: 'Popüler'
    },
    {
      id: 'default-3',
      branchName: 'Nişantaşı Şubesi',
      branchImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=60&fm=webp',
      description: 'Yeni açılan şubemizde özel açılış kampanyaları ve fırsatlar',
      badge: 'Yeni'
    }
  ]

  // Always show campaigns - use Firebase data if available, otherwise show defaults
  const displayCampaigns = campaigns.length > 0 ? campaigns : defaultCampaigns

  const handleBranchClick = async (campaign) => {
    if (!onOpenBottomSheet) {
      // If no callback provided, just navigate
      navigate('/#locations')
      return
    }

    try {
      // Ensure Firebase DB is available (lazy loaded)
      const db = await getDb()

      // Fetch branch data from Firebase using branchName
      const branchesRef = collection(db, 'branches')
      const q = query(branchesRef, where('active', '==', true))
      const querySnapshot = await getDocs(q)
      
      const branchesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // Find branch by name
      const branch = branchesData.find(b => b.name === campaign.branchName)
      
      if (branch) {
        // Open the global bottom sheet (also triggers Firebase preload in App)
        onOpenBottomSheet()

        // Create a custom event to open bottom sheet with branch data
        // We'll use a custom event since we need to pass branch data to App.jsx
        const event = new CustomEvent('openBranchDetail', { detail: branch })
        window.dispatchEvent(event)
      } else {
        // If branch not found, just navigate
        navigate('/#locations')
      }
    } catch (error) {
      navigate('/#locations')
    }
  }

  return (
    <section id="campaigns" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4 transform hover:scale-110 transition-transform duration-300">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-olive to-transparent mx-auto mb-6 animate-pulse"></div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-text-primary mb-4">
            Kampanyalar
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto animate-slideUp">
            Şubelerimizdeki özel kampanyalar ve avantajlı fırsatlar
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 animate-bounce-slow">
            <div className="w-2 h-2 bg-olive rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-olive rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-olive rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-olive border-t-transparent animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary text-sm">Kampanyalar yükleniyor...</p>
            </div>
          </div>
        ) : (
          <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {displayCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id || `campaign-${index}`}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative"
                variants={itemVariants}
              >
                {/* Badge */}
                {campaign.badge && (
                  <motion.div
                    className="absolute top-4 right-4 z-20 bg-olive text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                    variants={badgeVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    {campaign.badge}
                  </motion.div>
                )}

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={campaign.branchImage || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=60&fm=webp'}
                    alt={campaign.branchName}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold tracking-wide mb-2 transform group-hover:scale-105 transition-transform duration-500">{campaign.branchName}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{campaign.description}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  {/* Description */}
                  <div className="flex items-center justify-center gap-2 text-text-muted mb-6 pb-4 border-b border-stone-dark">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-base font-medium text-center">{campaign.description || 'Özel kampanyalarımızdan haberdar olun'}</span>
                  </div>

                  {/* Branch Name Display */}
                  <div className="mb-7">
                    <button
                      onClick={() => handleBranchClick(campaign)}
                      className="flex items-center justify-center gap-2 text-olive mb-4 hover:text-olive-dark transition-colors cursor-pointer group"
                      aria-label={`${campaign.branchName} şube detaylarını görüntüle`}
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-lg font-semibold group-hover:underline">{campaign.branchName}</span>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Call Button */}
                    {campaign.phone && (
                      <a
                        href={`tel:${campaign.phone}`}
                        className="flex items-center justify-center gap-2 bg-olive text-white py-3 rounded-xl hover:bg-olive-dark transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-xl"
                        aria-label={`${campaign.branchName} şubesini ara: ${campaign.phone}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Ara</span>
                      </a>
                    )}

                    {/* WhatsApp Button */}
                    {(campaign.whatsapp || campaign.phone) && (
                      <a
                        href={`https://wa.me/${(campaign.whatsapp || campaign.phone || '').replace(/\s/g, '').replace(/^0/, '90').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#20BA5A] transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-xl"
                        aria-label={`${campaign.branchName} şubesine WhatsApp ile mesaj gönder`}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.385 1.262.614 1.694.787.712.28 1.36.24 1.872.147.571-.104 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleBranchClick(campaign)}
                    className="w-full relative overflow-hidden border-2 border-olive text-olive py-4 rounded-xl hover:bg-olive hover:text-white transition-all duration-500 font-semibold text-sm tracking-wider uppercase group/btn shadow-md hover:shadow-xl"
                    aria-label={`${campaign.branchName} kampanya detaylarını görüntüle`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Detaylar
                      <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-olive transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Kampanya
