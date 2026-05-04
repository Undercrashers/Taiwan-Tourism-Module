import { useState, useEffect } from "react";
import axios from "axios";
import "./RegionalGuide.css";

export default function RegionalGuide() {
  const [regions, setRegions] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/regions")
      .then((r) => {
        const normalized = (r.data ?? []).map((region) => ({
          ...region,
          attractions: region.attractions ?? region.attraction ?? [],
        }));
        setRegions(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch regions:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getRegionStyle = (key) => {
    switch (key) {
      case "north":
        return { top: "5%", left: "15%", width: "65%", height: "28%" };
      case "central":
        return { top: "32%", left: "15%", width: "65%", height: "28%" };
      case "south":
        return { top: "58%", left: "15%", width: "65%", height: "35%" };
      case "east":
        return { top: "12%", left: "68%", width: "28%", height: "75%" };
      default:
        return {};
    }
  };

  const toggle = (key) => {
    setActive((p) => (p === key ? null : key));
    setTimeout(() => {
      document
        .querySelector(`.rg__card[data-key="${key}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  if (loading) {
    return (
      <section id="regional-guide" aria-labelledby="rg-title">
        <div className="container">
          <h2 id="rg-title" className="section-title">
            Regional Guide
          </h2>
          <p className="section-sub">Loading regions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="regional-guide" aria-labelledby="rg-title">
        <div className="container">
          <h2 id="rg-title" className="section-title">
            Regional Guide
          </h2>
          <p className="section-sub" style={{ color: "red" }}>
            Error loading regions: {error}
          </p>
        </div>
      </section>
    );
  }

  if (regions.length === 0) {
    return (
      <section id="regional-guide" aria-labelledby="rg-title">
        <div className="container">
          <h2 id="rg-title" className="section-title">
            Regional Guide
          </h2>
          <p className="section-sub">No regions available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="regional-guide" aria-labelledby="rg-title">
      <div className="container">
        <h2 id="rg-title" className="section-title">
          Regional Guide
        </h2>
        <p className="section-sub">Click a region on the map to explore.</p>

        <div className="rg__layout">
          <div className="rg__map">
            <div className="rg__map-wrapper">
              <img
                src="/images/taiwan-map.svg"
                alt="Map of Taiwan showing four regions"
              />
              <div className="rg__overlay">
                {regions.map((r) => (
                  <div
                    key={r.key}
                    className={`rg__region ${active === r.key ? "active" : ""}`}
                    style={{
                      ...getRegionStyle(r.key),
                      "--rc": r.color,
                    }}
                    onClick={() => toggle(r.key)}
                    title={r.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rg__cards">
            {regions.map((r) => (
              <article
                key={r.key}
                data-key={r.key}
                className={`rg__card${active === r.key ? " active" : ""}`}
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
                    {(r.attractions ?? []).map((a) => (
                      <li key={a.name}>
                        <img
                          src="/icons/icon-pin.svg"
                          alt=""
                          aria-hidden="true"
                          width="14"
                          height="14"
                          className="rg__pin-icon"
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
