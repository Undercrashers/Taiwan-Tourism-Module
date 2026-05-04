import { useState, useEffect } from "react";
import "./Header.css";

const NAV = [
  {
    label: "Regional Guide",
    href: "#regional-guide",
    icon: "/icons/icon-pin.svg",
  },
  {
    label: "Experiences",
    href: "#experiences",
    icon: "/icons/icon-utensils.svg",
  },
  {
    label: "Practical Information",
    href: "#practical-info",
    icon: "/icons/icon-globe.svg",
  },
  {
    label: "Essential Information",
    href: "#essential-info",
    icon: "/icons/icon-landmark.svg",
  },
  { label: "Contact", href: "#contact", icon: "/icons/icon-accommodation.svg" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`hdr${scrolled ? " hdr--s" : ""}`} role="banner">
      <div className="hdr__in container">
        <a href="#" className="hdr__logo" aria-label="Taiwan Explorer home">
          <img
            src="/images/logo.svg"
            alt=""
            aria-hidden="true"
            width="150"
            height="32"
          />
        </a>

        <nav aria-label="Main navigation">
          <ul
            id="main-nav"
            className={`hdr__nav${open ? " open" : ""}`}
            role="list"
          >
            <li className="hdr__nav-header">
              <span>Menu</span>
              <button
                className="hdr__close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </li>
            {NAV.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <img
                    src={l.icon}
                    alt=""
                    aria-hidden="true"
                    width="18"
                    height="18"
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {open && (
          <div
            className="hdr__backdrop"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
        )}

        <button
          className={`hdr__burger${open ? " active" : ""}`}
          onClick={() => setOpen((p) => !p)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
