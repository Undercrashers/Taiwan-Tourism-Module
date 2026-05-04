import { useState } from 'react'
import './EssentialInfo.css'

export default function EssentialInfo() {
  const [speaking, setSpeaking] = useState(false)
  const [ttsSupported] = useState('speechSynthesis' in window)

  const ttsText = `Taiwan Tourism Bureau:  
    Phone plus eight eight six dash two dash zero zero zero zero dash zero zero zero zero. 
    Email info at taiwan dot com. 
    Official site at taiwan dot com. 
    For urgent help, dial zero zero zero for police or zero zero zero for emergencies.`

  const readAloud = () => {  // refered from google
    if (!ttsSupported) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utter = new SpeechSynthesisUtterance(ttsText)
    utter.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utter)
    setSpeaking(true)
  }

  return (
    <section
      id="essential-info"
      aria-labelledby="ei-title"
      style={{ background: '#f5f0e8' }}
    >
      <div className="container">

        <h2 id="ei-title" className="section-title fade-in">
          Essential Information
        </h2>
        <p className="section-sub fade-in">
          Official support and key contacts for your trip to Taiwan.
        </p>

        <div className="ei__grid fade-in">

          
          <div className="ei__card" aria-label="Taiwan Tourism Bureau contact details">
            <h3>Taiwan Tourism Bureau</h3>
            <ul className="ei__list">
              <li>
                <img src="/icons/icon-pin.svg" alt="" aria-hidden="true" width="18" height="18" />
                <span>+886-2-0000-0000</span>
              </li>
              <li>
                <img src="/icons/icon-globe.svg" alt="" aria-hidden="true" width="18" height="18" />
                <a href="mailto:info@taiwan.com">info@taiwan.com</a>
              </li>
              <li>
                <img src="/icons/icon-landmark.svg" alt="" aria-hidden="true" width="18" height="18" />
                <a href="https://taiwan.com" target="_blank" rel="noopener noreferrer">
                  taiwan-tourism.com
                </a>
              </li>
            </ul>
            <div className="ei__tts">
              <button
                className="btn btn-primary"
                onClick={readAloud}
                aria-label={speaking ? 'Stop reading aloud' : 'Read contact details aloud'}
                style={{ fontSize: '0.85rem', padding: '8px 20px' }}
              >
                {speaking ? 'Stop' : 'Read aloud'}
              </button>
              {!ttsSupported && (
                <p className="ei__tts-msg" role="alert">
                  Text-to-Speech is not supported in this browser.
                </p>
              )}
            </div>
          </div>

          
          <div
            className="ei__card ei__card--emergency"
            aria-label="Emergency and safety contacts"
          >
            <h3>Emergency & Safety Contacts</h3>
            <ul className="ei__emergency">
              <li>
                <span className="ei__badge">Police</span>
                <strong>000</strong>
              </li>
              <li>
                <span className="ei__badge">Fire/Ambulance</span>
                <strong>000</strong>
              </li>
              <li>
                <span className="ei__badge">Tourist Hotline</span>
                <strong>0800-000-000</strong>
              </li>
            </ul>
          </div>

         
          <div className="ei__card" aria-label="Downloadable travel guide">
            <h3>Downloadable Travel Guide</h3>
            <p style={{ color: 'var(--gray)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 20 }}>
              Comprehensive PDF guide with maps, itineraries, and essential tips
              for your Taiwan adventure.
            </p>
            <a
              href="/taiwan-travel-guide.pdf"
              download
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', padding: '10px 24px' }}
              aria-label="Download Taiwan travel guide PDF"
            >
              Download Travel Guide (PDF)
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}