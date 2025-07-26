import React, { useEffect, useRef } from 'react'

const Mission = () => {
  const missionRef = useRef(null)

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

    const animateElements = missionRef.current?.querySelectorAll('.animate-on-scroll')
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
    <section id="mission" className="section-padding" ref={missionRef}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="mission-image-container animate-on-scroll">
              <div className="mission-image-wrapper">
                <img
                  src="/assets/mission-image.jpg"
                  alt="رسالتنا"
                  className="img-fluid rounded-3 shadow mission-image-animated"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <i className="bi bi-target overlay-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mission-content animate-on-scroll">
              <div className="content-wrapper">
                <h2 className="section-title">رسالتنا</h2>
                <p className="section-text enhanced-text">
                  تقديم تجربة ضيافة راقية تعتمد على التفاصيل، والاحترافية، وروح الضيافة السعودية الأصيلة.
                  نسعى لتحقيق رضا عملائنا من خلال الابتكار المستمر وتطوير خدماتنا لتواكب أحدث المعايير العالمية.
                </p>
                <div className="mission-values">
                  <div className="value-item enhanced-feature">
                    <div className="value-icon">
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div className="value-content">
                      <h5>التميز</h5>
                      <p>نسعى للتميز في كل ما نقدمه</p>
                    </div>
                  </div>
                  <div className="value-item enhanced-feature">
                    <div className="value-icon">
                      <i className="bi bi-heart-fill"></i>
                    </div>
                    <div className="value-content">
                      <h5>الاهتمام</h5>
                      <p>نهتم بأدق التفاصيل لإسعاد ضيوفكم</p>
                    </div>
                  </div>
                  <div className="value-item enhanced-feature">
                    <div className="value-icon">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <div className="value-content">
                      <h5>الثقة</h5>
                      <p>نبني علاقات طويلة الأمد مع عملائنا</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
