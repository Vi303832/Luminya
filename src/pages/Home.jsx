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
import SEO, { organizationSchema, generateBreadcrumbSchema } from '../components/SEO'

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

  // Breadcrumb schema for homepage
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "https://luminya.com/" }
  ]);

  // Combined structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      breadcrumbSchema,
      {
        "@type": "WebSite",
        "name": "Luminya Wellness & Spa Center",
        "url": "https://luminya.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://luminya.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Luminya Wellness & Spa Center | Türkiye'nin En İyi Spa ve Masaj Merkezi"
        description="Luminya Wellness Center olarak 13+ şubemizde İsveç masajı, Thai masajı, aromaterapi, Türk hamamı, cilt bakımı ve wellness paketleri sunuyoruz. 15 yıllık deneyim, uzman kadro. Hemen randevu alın!"
        keywords="spa merkezi, wellness center, masaj salonu, hamam, türk hamamı, kese köpük, aromaterapi, isveç masajı, thai masajı, hot stone masaj, cilt bakımı, refleksoloji, spa paketleri, masaj terapisi, relaxation, istanbul spa, ankara spa, izmir spa, luminya"
        canonical="/"
        ogImage="https://luminya.com/og-image.jpg"
        structuredData={structuredData}
      />
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
