import { useState, useEffect } from "react";
import axios from "axios";
import "./PracticalInfo.css";

const TABS = ["transportation", "accommodation", "shopping"];

export default function PracticalInfo() {
  const [tab, setTab] = useState("transportation");
  const [items, setItems] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);
  const [mobile, setMobile] = useState(window.innerWidth <= 760);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 760);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    axios.get(`/api/info/${tab}`).then((r) => {
      setItems(r.data);
      setOpenIdx(null);
    });
  }, [tab]);

  return (
    <section id="practical-info" aria-labelledby="pi-title">
      <div className="container">
        <h2 id="pi-title" className="section-title">
          Practical Information
        </h2>
        <p className="section-sub">Pack the essentials—travel made simple.</p>

        <div
          className="pi__tabs"
          role="tablist"
          aria-label="Practical information categories"
        >
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={`pi__tab${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="pi__content" role="tabpanel" aria-label={tab}>
          {items.map((item, i) =>
            mobile ? (
              <div
                key={item._id}
                className={`pi__acc${openIdx === i ? " open" : ""}`}
              >
                <button
                  className="pi__acc-hd"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`acc-${i}`}
                >
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width="20"
                    height="20"
                  />
                  <span>{item.title}</span>
                  <span className="pi__acc-arrow" aria-hidden="true">
                    ›
                  </span>
                </button>
                <div id={`acc-${i}`} className="pi__acc-bd">
                  <p>{item.body}</p>
                </div>
              </div>
            ) : (
              <div key={item._id} className="pi__card ">
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  width="32"
                  height="32"
                  className="pi__icon"
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
