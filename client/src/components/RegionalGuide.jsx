import { useState, useEffect } from "react";
import axios from "axios";
import "./RegionalGuide.css";

export default function RegionalGuide() {
  const [regions, setRegions] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    axios.get("/api/regions").then((r) => setRegions(r.data));
  }, []);

  const toggle = (key) => setActive((p) => (p === key ? null : key));

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
          </div>

          <div className="rg__cards">
            {regions.map((r) => (
              <article
                key={r.key}
                className={`rg__card fade-in${active === r.key ? " active" : ""}`}
                style={{ "--rc": r.color }}
                onClick={() => toggle(r.key)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggle(r.key)}
                aria-expanded={active === r.key}
                aria-label={`${r.name} region`}
              >
                <div className="rg__card-top">
                  <h3>{r.name}</h3>
                  <span
                    className="rg__dot"
                    style={{ background: r.color }}
                    aria-hidden="true"
                  />
                </div>
                <p className="rg__summary">{r.summary}</p>

                {active === r.key && (
                  <ul className="rg__attractions">
                    {r.attractions.map((a) => (
                      <li key={a.name}>
                        <img
                          src="/icons/icon-pin.svg"
                          alt=""
                          aria-hidden="true"
                          width="14"
                          height="14"
                        />
                        <span>
                          <strong>{a.name}:</strong> {a.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
