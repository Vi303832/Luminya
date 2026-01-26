import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ReservationFloatingButton from './components/ReservationFloatingButton'
import BottomSheet from './components/BottomSheet'
import BranchSelector, { SearchBar } from './components/BranchSelector'
import BranchDetail from './components/BranchDetail'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import BlogPage from './pages/BlogPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'

import './App.css'

function App() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [bottomSheetMode, setBottomSheetMode] = useState('reservation') // 'whatsapp' veya 'reservation'

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

  const handleOpenBottomSheetWhatsApp = () => {
    setBottomSheetMode('whatsapp')
    setIsBottomSheetOpen(true)
  }

  const handleOpenBottomSheetReservation = () => {
    setBottomSheetMode('reservation')
    setIsBottomSheetOpen(true)
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="bg-white overflow-x-hidden">
                <Header onOpenBottomSheet={handleOpenBottomSheetReservation} />
                <Routes>
                  <Route path="/" element={<Home onOpenBottomSheet={handleOpenBottomSheetReservation} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services onOpenBottomSheet={handleOpenBottomSheetReservation} />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
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
