import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__ov" aria-hidden="true" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "#fff",
          padding: "0 24px",
          maxWidth: 760,
          textAlign: "center",
        }}
      >
        <h1
          id="hero-title"
          style={{
            fontSize: "clamp(2.8rem,7vw,5rem)",
            letterSpacing: "-1px",
            marginBottom: 24,
            textShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          Taiwan: Small Island,
          <br />
          Big Adventures
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem,2vw,1.3rem)",
            fontWeight: 300,
            opacity: 0.9,
            marginBottom: 44,
            lineHeight: 1.7,
          }}
        >
          From marble gorges to neon nights—discover four regions, countless
          experiences.
        </p>
        <a href="#regional-guide" className="btn btn-outline">
          Explore Regions
        </a>
      </div>
    </section>
  );
}
