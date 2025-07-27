import React, { useEffect, useRef, useState } from 'react'

const Statistics = () => {
  const statsRef = useRef(null)
  const [counters, setCounters] = useState({
    clients: 0,
    events: 0,
    awards: 0,
    experience: 0
  })

  const animateCounter = (element, target) => {
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 20)
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated')
        }
      })
    }, observerOptions)

    // Stats counter observer
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'))
          animateCounter(entry.target, target)
          statsObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    const animateElements = statsRef.current?.querySelectorAll('.animate-on-scroll')
    const statNumbers = statsRef.current?.querySelectorAll('.stat-number')

    animateElements?.forEach(element => {
      observer.observe(element)
    })

    statNumbers?.forEach(stat => {
      statsObserver.observe(stat)
    })

    return () => {
      animateElements?.forEach(element => {
        observer.unobserve(element)
      })
      statNumbers?.forEach(stat => {
        statsObserver.unobserve(stat)
      })
    }
  }, [])

  return (
    <section className="stats-section section-padding" ref={statsRef}>
      <div>
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="section-title">إنجازاتنا بالأرقام</h2>
            <p className="section-text">نفخر بما حققناه من نجاحات في مجال الضيافة</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-item animate-on-scroll">
              <div className="stat-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="stat-number" data-target="500">0</div>
              <div className="stat-label">عميل راضٍ</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-item animate-on-scroll">
              <div className="stat-icon">
                <i className="bi bi-calendar-event"></i>
              </div>
              <div className="stat-number" data-target="1200">0</div>
              <div className="stat-label">فعالية ناجحة</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-item animate-on-scroll">
              <div className="stat-icon">
                <i className="bi bi-award-fill"></i>
              </div>
              <div className="stat-number" data-target="15">0</div>
              <div className="stat-label">جائزة تميز</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-item animate-on-scroll">
              <div className="stat-icon">
                <i className="bi bi-clock-fill"></i>
              </div>
              <div className="stat-number" data-target="8">0</div>
              <div className="stat-label">سنوات خبرة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics
