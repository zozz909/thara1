import React, { useEffect, useState } from 'react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background change
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Handle active section highlighting
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id')
        }
      })
      
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const targetSection = document.querySelector(targetId)
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse')
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    }
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home" onClick={(e) => handleNavClick(e, '#home')}>
          <img src="/assets/logo.png" alt="Thara Hospitality" height="40" className="me-2" />
          ثرى للضيافة
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} 
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
              >
                الرئيسية
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'story' ? 'active' : ''}`} 
                href="#story"
                onClick={(e) => handleNavClick(e, '#story')}
              >
                قصتنا
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'vision' ? 'active' : ''}`} 
                href="#vision"
                onClick={(e) => handleNavClick(e, '#vision')}
              >
                رؤيتنا
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'mission' ? 'active' : ''}`} 
                href="#mission"
                onClick={(e) => handleNavClick(e, '#mission')}
              >
                رسالتنا
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} 
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
              >
                خدماتنا
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                تواصل معنا
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
