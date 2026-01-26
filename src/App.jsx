import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ReservationFloatingButton from './components/ReservationFloatingButton'
import BottomSheet from './components/BottomSheet'
import BranchSelector, { SearchBar } from './components/BranchSelector'
import BranchDetail from './components/BranchDetail'
import { setupFirebaseScrollTrigger, triggerFirebaseOnFormOpen } from './utils/firebaseTrigger'
import { AuthProvider } from './contexts/AuthContext'

import './App.css'

// Code Splitting - Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
import ProtectedRoute from './components/ProtectedRoute'

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive"></div>
  </div>
)

function App() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [bottomSheetMode, setBottomSheetMode] = useState('reservation') // 'whatsapp' veya 'reservation'

  // Firebase lazy load trigger - scroll veya form açıldığında yükle
  useEffect(() => {
    setupFirebaseScrollTrigger()
  }, [])

  // Listen for custom event to open branch detail from campaign
  useEffect(() => {
    const handleOpenBranchDetail = (event) => {
      const branch = event.detail
      if (branch) {
        setSelectedBranch(branch)
        setBottomSheetMode('reservation')
        setIsBottomSheetOpen(true)
      }
    }

    window.addEventListener('openBranchDetail', handleOpenBranchDetail)
    return () => {
      window.removeEventListener('openBranchDetail', handleOpenBranchDetail)
    }
  }, [])

  const handleBranchSelect = (branch) => {
    // Eğer WhatsApp modu aktifse direkt WhatsApp'a yönlendir
    if (bottomSheetMode === 'whatsapp') {
      const phoneNumber = (branch.whatsapp || branch.phone).replace(/\s/g, '').replace(/^0/, '90')
      window.open(`https://wa.me/${phoneNumber}`, '_blank')
      handleCloseBottomSheet()
    } else {
      // Rezervasyon modu - şube detayını göster
      setSelectedBranch(branch)
      setSearchQuery('')
    }
  }

  const handleBackToBranchList = () => {
    setSelectedBranch(null)
  }

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false)
    setSelectedBranch(null)
    setSearchQuery('')
  }


  const handleOpenBottomSheetReservation = () => {
    // Form açıldığında Firebase'i yükle
    triggerFirebaseOnFormOpen()
    setBottomSheetMode('reservation')
    setIsBottomSheetOpen(true)
  }

  const handleOpenBottomSheetWhatsApp = () => {
    // Form açıldığında Firebase'i yükle
    triggerFirebaseOnFormOpen()
    setBottomSheetMode('whatsapp')
    setIsBottomSheetOpen(true)
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route 
            path="/admin/login" 
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminLogin />
              </Suspense>
            } 
          />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="bg-white overflow-x-hidden">
                <Header onOpenBottomSheet={handleOpenBottomSheetReservation} />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home onOpenBottomSheet={handleOpenBottomSheetReservation} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services onOpenBottomSheet={handleOpenBottomSheetReservation} />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Footer />
                <WhatsAppButton onClick={handleOpenBottomSheetWhatsApp} />
                <ReservationFloatingButton onClick={handleOpenBottomSheetReservation} />

                {/* Global Bottom Sheet */}
                <BottomSheet
                  isOpen={isBottomSheetOpen}
                  onClose={handleCloseBottomSheet}
                  title={selectedBranch ? selectedBranch.name : (bottomSheetMode === 'whatsapp' ? "WhatsApp için Şube Seçin" : "Şube Seçin")}
                  searchBar={!selectedBranch && <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
                >
                  {selectedBranch ? (
                    <BranchDetail
                      branch={selectedBranch}
                      onBack={handleBackToBranchList}
                    />
                  ) : (
                    <BranchSelector
                      onSelectBranch={handleBranchSelect}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                  )}
                </BottomSheet>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
