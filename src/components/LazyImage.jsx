import React, { useState, useRef, useEffect } from 'react'

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={`lazy-image-container ${className || ''}`} {...props}>
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
            loading="lazy"
          />
          {!isLoaded && (
            <div className="image-placeholder" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999'
            }}>
              <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default LazyImage
