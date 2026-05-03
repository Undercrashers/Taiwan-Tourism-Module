import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RegionalGuide from "./components/RegionalGuide";
import Experiences from "./components/Experiences";
import PracticalInfo from "./components/PracticalInfo";
import EssentialInfo from "./components/EssentialInfo";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <RegionalGuide />
        <Experiences />
        <PracticalInfo />
        <EssentialInfo />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
