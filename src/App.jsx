import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import BottomSheet from './components/BottomSheet'
import BranchSelector, { SearchBar } from './components/BranchSelector'
import BranchDetail from './components/BranchDetail'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'

import './App.css'

function App() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(null)

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch)
    setSearchQuery('')
  }

  const handleBackToBranchList = () => {
    setSelectedBranch(null)
  }

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false)
    setSelectedBranch(null)
    setSearchQuery('')
  }

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true)
  }

  return (
    <Router>
      <div className="bg-white">
        <Header onOpenBottomSheet={handleOpenBottomSheet} />
        <Routes>
          <Route path="/" element={<Home onOpenBottomSheet={handleOpenBottomSheet} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services onOpenBottomSheet={handleOpenBottomSheet} />} />
        </Routes>
        <Footer />
        <WhatsAppButton />

        {/* Global Bottom Sheet */}
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseBottomSheet}
          title={selectedBranch ? selectedBranch.name : "Şube Seçin"}
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
    </Router>
  )
}

export default App
