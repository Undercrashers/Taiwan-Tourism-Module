import { useState, useEffect } from "react";
import axios from "axios";
import "./RegionalGuide.css";

export default function RegionalGuide() {
  const [regions, setRegions] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    axios
      .get("/api/regions")
      .then((r) => {
        console.log("Regions loaded:", r.data);
        setRegions(r.data);
      })
      .catch((err) => {
        console.error("Failed to fetch regions:", err);
      });
  }, []);

  const toggle = (key) => setActive((prev) => (prev === key ? null : key));

  return (
    <section id="regional-guide" aria-labelledby="rg-title">
      <div className="container">
        <h2 id="rg-title" className="section-title fade-in">
          Regional Guide
        </h2>
        <p className="section-sub fade-in">
          Click a region on the map to explore.
        </p>

        <div className="rg__layout">
          <div className="rg__map fade-in">
            <img
              src="/images/taiwan-map.svg"
              alt="Map of Taiwan showing four regions"
            />
            <div className="rg__map-btns">
              {regions.map((r) => (
                <button
                  key={r.key}
                  className={`rg__map-btn rg__map-btn--${r.key}${active === r.key ? " active" : ""}`}
                  style={{ "--rc": r.color }}
                  onClick={() => toggle(r.key)}
                  aria-pressed={active === r.key}
                  aria-label={`Explore ${r.name} Taiwan`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
          <div className="rg__cards">
            {regions.length === 0 ? (
              <p>Loading regions...</p>
            ) : (
              regions.map((r) => (
                <article
                  key={r.key}
                  className={`rg__card${
                    active === r.key ? " active" : ""
                  }`}
                  style={{ "--rc": r.color }}
                  onClick={() => toggle(r.key)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && toggle(r.key)}
                  aria-expanded={active === r.key}
                  aria-label={`${r.name} region`}
                >
                  <div className="rg__front">
                    <span
                      className="rg__dot"
                      style={{ background: r.color }}
                      aria-hidden="true"
                    />
                    <h3>{r.name}</h3>
                    <p>{r.summary}</p>
                    <span className="rg__hint">Click to see attractions</span>
                  </div>

                  <div className="rg__back" aria-hidden={active !== r.key}>
                    <h4>Top Attractions</h4>
                    <ul>
                      {r.attraction && r.attraction.length > 0 ? (
                        r.attraction.map((a) => (
                          <li key={a.name}>
                            <strong>{a.name}</strong> — {a.description}
                          </li>
                        ))
                      ) : (
                        <li>No attractions available</li>
                      )}
                    </ul>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
