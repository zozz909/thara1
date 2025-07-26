import { useEffect } from 'react'

const useMobileOptimization = () => {
  useEffect(() => {
    // Comprehensive mobile optimization
    if (window.innerWidth <= 768) {
      // Reduce image quality on mobile for better performance
      const images = document.querySelectorAll('img[src*=".jpg"], img[src*=".png"]')
      images.forEach(img => {
        if (img.src.includes('unsplash')) {
          img.src = img.src.replace('w=1920&q=80', 'w=800&q=60')
        }
      })

      // Disable parallax effects on mobile for better performance
      document.body.classList.add('mobile-device')

      // Reduce animation complexity on mobile
      const animatedElements = document.querySelectorAll('.animate-on-scroll')
      animatedElements.forEach(el => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      })
    }

    // Detect if device is mobile
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobileDevice) {
      document.body.classList.add('is-mobile')
    }

    // Set viewport height for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVH()
    window.addEventListener('resize', setVH)

    return () => {
      window.removeEventListener('resize', setVH)
    }
  }, [])
}

export default useMobileOptimization
