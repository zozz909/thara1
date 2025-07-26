import React, { useState, useEffect } from 'react'
import LazyImage from './LazyImage'

const ServiceCard = ({ service }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % service.images.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [service.images.length])

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  const whatsappUrl = `https://wa.me/966547443133?text=${encodeURIComponent(service.whatsappText)}`

  return (
    <div className="service-card animate-on-scroll">
      <div className="service-image">
        <div className="service-slideshow" data-service={service.id}>
          {service.images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img
                src={image}
                alt={`${service.title} - صورة ${index + 1}`}
                className="img-fluid service-slide-image"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  filter: 'brightness(1.05) contrast(1.1) saturate(1.1)',
                  imageRendering: '-webkit-optimize-contrast',
                  backgroundColor: '#f8f9fa'
                }}
              />
            </div>
          ))}
          <div className="slideshow-indicators">
            {service.images.map((_, index) => (
              <span 
                key={index}
                className={`slideshow-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className="service-overlay">
          <div className="service-icon">
            <i className={`bi ${service.icon}`}></i>
          </div>
        </div>
      </div>
      <div className="service-content">
        <h4 className="service-title">{service.title}</h4>
        <p className="service-description">
          {service.description}
        </p>
        <div className="service-features">
          {service.features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
        <a 
          href={whatsappUrl}
          className="btn btn-primary service-btn" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp me-2"></i>
          استفسر الآن
        </a>
      </div>
    </div>
  )
}

export default ServiceCard
