import { useState, useEffect } from 'react'
import './Header.css'

const NAV = [
  { label: 'Regional Guide',        href: '#regional-guide' },
  { label: 'Experiences',           href: '#experiences'    },
  { label: 'Practical Information', href: '#practical-info' },
  { label: 'Essential Information', href: '#essential-info' },
  { label: 'Contact',               href: '#contact'        },
]

export default function Header() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`hdr${scrolled ? ' hdr--s' : ''}`} role="banner">
      <div className="hdr__in container">
        <a href="#" className="hdr__logo" aria-label="Taiwan Explorer home">
          <img src="/images/logo.svg" alt="" aria-hidden="true" width="200" height="40" />
        </a>

        <nav aria-label="Main navigation">
          <ul id="main-nav" className={`hdr__nav${open ? ' open' : ''}`} role="list">
            {NAV.map(l => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {open && <div className="hdr__backdrop" aria-hidden="true" onClick={() => setOpen(false)} />}

        <button
          className={`hdr__burger${open ? ' active' : ''}`}
          onClick={() => setOpen(p => !p)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-nav"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}