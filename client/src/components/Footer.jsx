import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">

       
        <div className="footer__left">
          <a href="#" className="footer__logo" aria-label="Taiwan Explorer home">
            <img src="/images/logo.svg" alt="" aria-hidden="true" width="100" height="28" />
            <span>Taiwan Explorer</span>
          </a>
          <p className="footer__copy">© {year} Taiwan Explorer</p>
          <nav aria-label="Footer legal links">
            <ul className="footer__links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
          </nav>
        </div>

        
        <div className="footer__social" aria-label="Social media links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Taiwan Explorer on Facebook"
          >
            <img src="/icons/icon-facebook.svg" alt="" aria-hidden="true" width="24" height="24" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Taiwan Explorer on Instagram"
          >
            <img src="/icons/icon-instagram.svg" alt="" aria-hidden="true" width="24" height="24" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Taiwan Explorer on YouTube"
          >
            <img src="/icons/icon-youtube.svg" alt="" aria-hidden="true" width="24" height="24" />
          </a>
        </div>

      </div>
    </footer>
  )
}