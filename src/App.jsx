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
import { CartProvider } from './contexts/CartContext'

import './App.css'

// Code Splitting - Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const Store = lazy(() => import('./pages/Store'))
const Checkout = lazy(() => import('./pages/Checkout'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const PaymentFailed = lazy(() => import('./pages/PaymentFailed'))
const MesafeliSatisSozlesmesi = lazy(() => import('./pages/MesafeliSatisSozlesmesi'))
const OnBilgilendirmeFormu = lazy(() => import('./pages/OnBilgilendirmeFormu'))
const IptalVeIadeKosullari = lazy(() => import('./pages/IptalVeIadeKosullari'))
const KvkkAydinlatmaMetni = lazy(() => import('./pages/KvkkAydinlatmaMetni'))
const UyelikSozlesmesi = lazy(() => import('./pages/UyelikSozlesmesi'))
const NotFound = lazy(() => import('./pages/NotFound'))
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'

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
      <CartProvider>
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
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              </Suspense>
            }
          />

          {/* Customer Auth Routes */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<PageLoader />}>
                <Register />
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
                    <Route path="/store" element={<Store />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/failed" element={<PaymentFailed />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/mesafeli-satis-sozlesmesi" element={<MesafeliSatisSozlesmesi />} />
                    <Route path="/on-bilgilendirme-formu" element={<OnBilgilendirmeFormu />} />
                    <Route path="/iptal-ve-iade-kosullari" element={<IptalVeIadeKosullari />} />
                    <Route path="/kvkk-aydinlatma-metni" element={<KvkkAydinlatmaMetni />} />
                    <Route path="/uyelik-sozlesmesi" element={<UyelikSozlesmesi />} />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute redirectTo="/login">
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
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
      </CartProvider>
    </AuthProvider>
  )
}

export default App
