import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <a href="#" className="footer__logo" aria-label="Taiwan Explorer home">
            <img src="/images/logo.svg" alt="" aria-hidden="true" width="150" height="28" />
            
          </a>
          <div className="footer__social" aria-label="Social media links">
            <a href="https://facebook.com"  target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/icons/icon-facebook.svg"  alt="" aria-hidden="true" width="20" height="20" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/icons/icon-instagram.svg" alt="" aria-hidden="true" width="20" height="20" />
            </a>
            <a href="https://youtube.com"   target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src="/icons/icon-youtube.svg"   alt="" aria-hidden="true" width="20" height="20" />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Taiwan Explorer</p>
          <nav aria-label="Footer legal links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Conditions</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}