import { useState } from "react";
import "./EssentialInfo.css";

export default function EssentialInfo() {
  const [speaking, setSpeaking] = useState(false);
  const [ttsSupported] = useState("speechSynthesis" in window);

  const ttsText = `Taiwan Tourism Bureau: Phone plus eight eight six dash two dash zero zero zero zero dash zero zero zero zero. Email info at taiwan dot com. Official site at taiwan dot com. For urgent help, dial zero zero zero for police or zero zero zero for emergencies.`;

  const readAloud = () => {
    if (!ttsSupported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(ttsText);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  return (
    <section
      id="essential-info"
      aria-labelledby="ei-title"
      style={{ background: "#f5f5f5" }}
    >
      <div className="container">
        <h2 id="ei-title" className="section-title fade-in">
          Essential Information
        </h2>
        <p className="section-sub fade-in">
          Official support and key contacts for your trip to Taiwan.
        </p>

        <div className="ei__top fade-in">
          <div className="ei__card" aria-label="Taiwan Tourism Bureau">
            <h3>
              <img
                src="/icons/icon-pin.svg"
                alt=""
                aria-hidden="true"
                width="18"
                height="18"
              />
              Taiwan Tourism Bureau
            </h3>
            <ul className="ei__list">
              <li>
                <img
                  src="/icons/icon-pin.svg"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="14"
                />
                <span>+886-2-0000-0000</span>
              </li>
              <li>
                <img
                  src="/icons/icon-globe.svg"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="14"
                />
                <a href="mailto:info@taiwan.com">info@taiwan.com</a>
              </li>
              <li>
                <img
                  src="/icons/icon-landmark.svg"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="14"
                />
                <a
                  href="https://taiwan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  taiwan.com
                </a>
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={readAloud}
                style={{ fontSize: "0.82rem", padding: "8px 16px" }}
                aria-label={speaking ? "Stop reading" : "Read aloud"}
              >
                {speaking ? "⏹ Stop" : "▶ Read aloud"}
              </button>
              {!ttsSupported && (
                <p style={{ fontSize: "0.8rem", color: "var(--gray)" }}>
                  Text-to-Speech is not supported in this browser.
                </p>
              )}
            </div>
          </div>

          <div
            className="ei__card ei__card--qr"
            aria-label="Official Website QR"
          >
            <h3>
              <img
                src="/icons/icon-globe.svg"
                alt=""
                aria-hidden="true"
                width="18"
                height="18"
              />
              Official Website QR
            </h3>
            <p
              style={{
                color: "var(--gray)",
                fontSize: "0.88rem",
                marginBottom: 16,
              }}
            >
              Scan to visit the official tourism website.
            </p>
            <img
              src="/images/qr.svg"
              alt="QR code linking to the official tourism website"
              width="120"
              height="120"
              style={{ display: "block", margin: "0 auto" }}
            />

            <a
              href="https://taiwan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
              style={{
                fontSize: "0.85rem",
                padding: "8px 20px",
                marginTop: 16,
              }}
            >
              Open site →
            </a>
          </div>

          <div
            className="ei__card ei__card--emergency"
            aria-label="Emergency contacts"
          >
            <h3>
              <img
                src="/icons/icon-pin.svg"
                alt=""
                aria-hidden="true"
                width="18"
                height="18"
              />
              Emergency & Safety Contacts
            </h3>
            <ul className="ei__emergency">
              <li>
                <img
                  src="/icons/icon-pin.svg"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="14"
                />
                <span>
                  Police: <strong>000</strong>
                </span>
              </li>
              <li>
                <img
                  src="/icons/icon-pin.svg"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="14"
                />
                <span>
                  Fire/Ambulance: <strong>000</strong>
                </span>
              </li>
              <li>
                <img
                  src="/icons/icon-pin.svg"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="14"
                />
                <span>
                  Tourist Hotline: <strong>0800-000-000</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="ei__download fade-in"
          aria-label="Downloadable travel guide"
        >
          <div>
            <h3>Downloadable Travel Guide</h3>
            <p>
              Comprehensive PDF guide with maps, itineraries, and essential tips
              for your Taiwan adventure.
            </p>
          </div>
          <a
            href="/taiwan-travel-guide.pdf"
            download
            className="btn btn-primary"
            aria-label="Download Taiwan travel guide PDF"
          >
            Download Travel Guide (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
