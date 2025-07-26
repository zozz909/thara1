import React, { useEffect, useRef } from 'react'

const Vision = () => {
  const visionRef = useRef(null)

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

    const animateElements = visionRef.current?.querySelectorAll('.animate-on-scroll')
    animateElements?.forEach(element => {
      observer.observe(element)
    })

    return () => {
      animateElements?.forEach(element => {
        observer.unobserve(element)
      })
    }
  }, [])

  return (
    <section id="vision" className="section-padding bg-light" ref={visionRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="vision-content animate-on-scroll">
              <h2 className="section-title">رؤيتنا</h2>
              <p className="vision-text">
                أن نكون الخيار الأول في مجال الضيافة بالمملكة العربية السعودية، 
                ونموذجاً يُحتذى به في تقديم خدمات الضيافة المتميزة التي تعكس قيم وتراث المملكة.
              </p>
              <div className="vision-icon">
                <i className="bi bi-eye"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
