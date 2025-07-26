import React, { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loader" id="loader">
      <div className="loader-content">
        <div className="loader-logo">
          <img src="assets/logo-white.png" alt="Thara Hospitality" height="80" />
          <div className="logo-glow"></div>
        </div>
        <div className="loader-brand">
          <h1 className="brand-name">ثرى للضيافة</h1>
          <p className="brand-tagline">منا وفينا</p>
        </div>
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="loader-text">جاري التحميل...</p>
        </div>
      </div>
      <div className="loader-background">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
    </div>
  )
}

export default LoadingScreen
