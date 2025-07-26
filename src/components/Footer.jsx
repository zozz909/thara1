import React from 'react'

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="footer-brand">
              <img src="/assets/logo-white.png" alt="Thara Hospitality" height="50" className="mb-3" />
              <h4>مؤسسة ثرى للضيافة</h4>
              <p>نرتقي بتجربة الضيافة السعودية إلى مستوى جديد من الاحتراف والتميّز</p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <h5 className="footer-title">تواصل معنا</h5>
            <div className="contact-info">
              <div className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <span>0547443133</span>
              </div>
              <div className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <span>thara-@outlook.ks</span>
              </div>
              <div className="contact-item">
                <i className="bi bi-geo-alt-fill"></i>
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <h5 className="footer-title">تابعنا</h5>
            <div className="social-links mb-3">
              <a 
                href="https://www.tiktok.com/@tharaa_saudi?_t=ZS-8yGpqMtn1E1&_r=1" 
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-tiktok"></i>
              </a>
              <a 
                href="https://www.instagram.com/tharaa_saudi?igsh=MTk0dWFnbTN1ZXJhMA%3D%3D&utm_source=qr" 
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a 
                href="https://wa.me/966547443133" 
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
              <a 
                href="https://www.linkedin.com/company/%D8%B6%D9%8A%D8%A7%D9%81%D8%A9-%D8%AB%D8%B1%D9%89/" 
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
            <a 
              href="/assets/company-profile.pdf" 
              className="btn btn-outline-light" 
              download
            >
              <i className="bi bi-download me-2"></i>
              تحميل ملف الشركة
            </a>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="footer-copyright">
              &copy; 2025 مؤسسة ثرى للضيافة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
