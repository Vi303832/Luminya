import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import PopularTherapies from '../components/PopularTherapies'
import WellnessPackages from '../components/WellnessPackages'
import Stats from '../components/Stats'
import WhyUs from '../components/WhyUs'
import Gallery from '../components/Gallery'
import Branches from '../components/Branches'
import Mission from '../components/Mission'
import Reviews from '../components/Reviews'
import Blog from '../components/Blog'
import Reservation from '../components/Reservation'

function Home({ onOpenBottomSheet }) {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
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
    <>
      <Hero onOpenBottomSheet={onOpenBottomSheet} />
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
      <div className="scroll-reveal" id="locations">
        <Branches />
      </div>
      <div className="scroll-reveal">
        <Mission />
      </div>
      <div className="scroll-reveal">
        <Reviews />
      </div>
      <div className="scroll-reveal">
        <Blog />
      </div>
      <div className="scroll-reveal">
        <Stats />
      </div>
      <div className="scroll-reveal" id="reservation">
        <Reservation />
      </div>
    </>
  )
}

export default Home
