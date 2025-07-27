import React, { useEffect } from 'react'
import HeroVideo from './HeroVideo'

const Hero = () => {
  useEffect(() => {
    // Parallax effect (disabled on mobile for performance)
    let ticking = false

    const updateParallax = () => {
      if (window.innerWidth <= 768) return // Skip parallax on mobile

      const scrolled = window.pageYOffset
      const heroSection = document.querySelector('.hero-section')

      if (heroSection) {
        const rate = scrolled * -0.2
        heroSection.style.transform = `translateY(${rate}px)`
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  return (
    <section id="home" className="hero-section">
      {/* Background Video - Local Video */}
      <HeroVideo
        videoSrc="assets/vido.mp4"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        enableSound={true}
      />

      {/* Alternative: Simple YouTube with Auto Sound */}
      {/* <SimpleYouTubeVideo
        videoId="IyHhWFIecc8"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      /> */}

      {/* Alternative: Advanced YouTube Video */}
      {/* <YouTubeVideo
        videoId="IyHhWFIecc8"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        enableSound={true}
      /> */}
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              {/* العنوان محذوف حسب الطلب */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
