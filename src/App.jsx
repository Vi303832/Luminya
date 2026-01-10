import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PopularTherapies from './components/PopularTherapies'
import WellnessPackages from './components/WellnessPackages'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import Mission from './components/Mission'
import Reviews from './components/Reviews'
import Subscribe from './components/Subscribe'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <Header />
      <Hero />
      <PopularTherapies />
      <WellnessPackages />
      <WhyUs />
      <Gallery />
      <Mission />
      <Reviews />
      <Subscribe />
      <Reservation />
      <Footer />
    </div>
  )
}

export default App
