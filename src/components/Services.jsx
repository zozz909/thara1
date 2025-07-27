import React, { useEffect, useRef } from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
  const servicesRef = useRef(null)

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

    const animateElements = servicesRef.current?.querySelectorAll('.animate-on-scroll')
    animateElements?.forEach(element => {
      observer.observe(element)
    })

    return () => {
      animateElements?.forEach(element => {
        observer.unobserve(element)
      })
    }
  }, [])

  const services = [
    {
      id: 'coffee',
      title: 'ضيافة القهوة السعودية',
      description: 'نقدم خدمة ضيافة القهوة السعودية الأصيلة في الفعاليات الداخلية والخارجية والمناسبات الخاصة، مع الحفاظ على التراث السعودي العريق في تحضير وتقديم القهوة.',
      
      features: ['فعاليات داخلية', 'فعاليات خارجية', 'مناسبات خاصة'],
      images: [
        'https://zozz909.github.io/thara1/assets/coffee-service1.png',
        'https://zozz909.github.io/thara1/assets/coffee-service2.jpg',
        'https://zozz909.github.io/thara1/assets/thara12.jpg',
        
      ],
      whatsappText: 'أريد الاستفسار عن خدمة ضيافة القهوة السعودية'
    },
    {
      id: 'food',
      title: 'ضيافة الأكل السعودي والثقافة',
      description: 'نقدم الأكل السعودي الأصيل ونعرض الثقافة السعودية في المعارض الداخلية والخارجية، مع خدمات VIP للمشاركين المميزين.',
      
      features: ['معارض داخلية', 'معارض خارجية', 'خدمات VIP'],
      images: [
        'https://zozz909.github.io/thara1/assets/eatsa1.jpg',
        'https://zozz909.github.io/thara1/assets/eatsa2.jpg',
        'https://zozz909.github.io/thara1/assets/eatsa3.jpg',
        'https://zozz909.github.io/thara1/assets/eatsa5.jpg'
      ],
      whatsappText: 'أريد الاستفسار عن خدمة ضيافة الأكل السعودي والثقافة'
    },
    {
      id: 'drinks',
      title: 'مشروبات وموكتيلات بنكهات سعودية',
      description: 'نبتكر مشروبات وموكتيلات فريدة بنكهات سعودية أصيلة، تجمع بين التراث والحداثة لتقديم تجربة مذاق لا تُنسى لضيوفكم.',
      
      features: ['نكهات أصيلة', 'موكتيلات مبتكرة', 'تجربة فريدة'],
      images: [
        'https://zozz909.github.io/thara1/assets/dringsa1.jpg',
        'https://zozz909.github.io/thara1/assets/dringsa2.jpg',
        
      ],
      whatsappText: 'أريد الاستفسار عن خدمة المشروبات والموكتيلات بالنكهات السعودية'
    },
    {
      id: 'corporate',
      title: 'ضيافة الشركات والهيئات',
      description: 'نوفر خدمات ضيافة متخصصة للشركات والهيئات والوزارات، مع التركيز على الاحترافية والتميز في تقديم الخدمة لتعكس صورة مؤسستكم المتميزة.',
      
      features: ['شركات', 'هيئات حكومية', 'وزارات'],
      images: [
        'https://zozz909.github.io/thara1/assets/eatsa4.jpg',
        'https://zozz909.github.io/thara1/assets/copny.jpg',
        
      ],
      whatsappText: 'أريد الاستفسار عن خدمة ضيافة الشركات والهيئات'
    }
  ]

  return (
    <section id="services" className="section-padding bg-light" ref={servicesRef}>
      <div>
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="section-title animate-on-scroll">خدماتنا</h2>
            <p className="section-text animate-on-scroll">
              نقدم مجموعة متنوعة من خدمات الضيافة المتميزة التي تلبي احتياجاتكم
            </p>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={service.id} className={`col-lg-6 col-md-6 mb-4`}>
              <ServiceCard service={service} />
            </div>
          ))}

          {/* Workshop Service - Full Width */}
          <div className="col-lg-12 col-md-12 mb-4">
            <div className="service-card service-card-wide animate-on-scroll">
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="service-image">
                    <div className="service-slideshow" data-service="workshop">
                      <div className="slide active">
                        <img
                          src="https://zozz909.github.io/thara1/assets/coofesa1.jpg"
                          alt="ضيافة ورش العمل - كوفي بريك"
                          className="img-fluid"
                          loading="lazy"
                          style={{
                            objectFit: 'contain',
                            backgroundColor: '#f8f9fa'
                          }}
                        />
                      </div>
                      <div className="slide">
                        <img
                          src="https://zozz909.github.io/thara1/assets/coofebric2.jpg"
                          alt="ورشة عمل تفاعلية"
                          className="img-fluid"
                          loading="lazy"
                          style={{
                            objectFit: 'contain',
                            backgroundColor: '#f8f9fa'
                          }}
                        />
                      </div>
                      <div className="slide">
                        <img
                          src="hhttps://zozz909.github.io/thara1/assets/coofesa3.jpg"
                          alt="استراحة كوفي بريك"
                          className="img-fluid"
                          loading="lazy"
                          style={{
                            objectFit: 'contain',
                            backgroundColor: '#f8f9fa'
                          }}
                        />
                      </div>
                   
                      <div className="slideshow-indicators">
                        <span className="slideshow-dot active"></span>
                        <span className="slideshow-dot"></span>
                        <span className="slideshow-dot"></span>
                        <span className="slideshow-dot"></span>
                      </div>
                    </div>
                    <div >
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="service-content">
                    <h4 className="service-title">ضيافة ورش العمل - خدمة كوفي بريك</h4>
                    <p className="service-description">
                      نقدم خدمات ضيافة متكاملة لورش العمل والدورات التدريبية، تشمل خدمة الكوفي بريك
                      المتميزة التي تساعد على تجديد النشاط والحيوية للمشاركين.
                    </p>
                    <div className="service-features mb-3">
                      <span className="feature-tag">ورش عمل</span>
                      <span className="feature-tag">دورات تدريبية</span>
                      <span className="feature-tag">كوفي بريك</span>
                      <span className="feature-tag">خدمة متكاملة</span>
                    </div>
                    <a
                      href="https://wa.me/966547443133?text=أريد الاستفسار عن خدمة ضيافة ورش العمل والكوفي بريك"
                      className="btn btn-primary service-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-whatsapp me-2"></i>
                      استفسر الآن
                    </a>
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

export default Services
