import React, { useEffect, useRef } from 'react'

const Story = () => {
  const storyRef = useRef(null)

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

    const animateElements = storyRef.current?.querySelectorAll('.animate-on-scroll')
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
    <section id="story" className="section-padding" ref={storyRef}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <div className="story-image-container animate-on-scroll">
              <div className="story-image-wrapper">
                <img
                  src="assets/story-image.jpg"
                  alt="قصتنا"
                  className="img-fluid rounded-3 shadow story-image-animated"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <i className="bi bi-book overlay-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="story-content animate-on-scroll">
              <div className="content-wrapper">
                <h2 className="section-title">قصتنا</h2>
                <p className="section-text enhanced-text">
                  تأسست مؤسسة ثرى للضيافة من رؤية واضحة لتقديم خدمات ضيافة متميزة تعكس كرم الضيافة السعودية الأصيلة.
                  نحن نؤمن بأن الضيافة فن وعلم، ولذلك نحرص على تقديم تجربة فريدة تجمع بين التراث العريق والحداثة المعاصرة.
                </p>
                <p className="section-text enhanced-text">
                  بخبرة تمتد لسنوات في مجال الضيافة والفعاليات، نقدم خدماتنا للشركات والمؤسسات والأفراد،
                  مع التركيز على أدق التفاصيل لضمان تجربة لا تُنسى لضيوفكم.
                </p>
                <div className="story-features">
                  <div className="feature-item enhanced-feature">
                    <div className="feature-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <span>خبرة واسعة في مجال الضيافة</span>
                  </div>
                  <div className="feature-item enhanced-feature">
                    <div className="feature-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <span>فريق محترف ومدرب</span>
                  </div>
                  <div className="feature-item enhanced-feature">
                    <div className="feature-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <span>خدمات متكاملة ومخصصة</span>
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

export default Story
