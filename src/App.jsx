import { useState, useEffect } from 'react'
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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Reveal elements on scroll
      const reveals = document.querySelectorAll('.scroll-reveal')
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-[#f5f1ed]">
      <Header />
      <Hero />
      <div className="scroll-reveal">
        <PopularTherapies />
      </div>
      <div className="scroll-reveal">
        <WellnessPackages />
      </div>
      <div className="scroll-reveal">
        <WhyUs />
      </div>
      <div className="scroll-reveal">
        <Gallery />
      </div>
      <div className="scroll-reveal">
        <Mission />
      </div>
      <div className="scroll-reveal">
        <Reviews />
      </div>
      <div className="scroll-reveal">
        <Subscribe />
      </div>
      <div className="scroll-reveal">
        <Reservation />
      </div>
      <Footer />
    </div>
  )
}

export default App
