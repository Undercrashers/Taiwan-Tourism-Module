import { useState } from 'react'
import './Experiences.css'

const DATA = {
  cultural: {
    label: 'Cultural',
    items: [
      { title:'Temple Etiquette Walk', desc:'Learn incense rituals, fortune sticks, and local customs.', img:'/images/cultural-1.jpg', imgLow:'/images/cultural-1-low-res.jpg' },
      { title:'Aboriginal Crafts',     desc:'Textiles & woodcrafts with indigenous artisans.',          img:'/images/cultural-2.jpg', imgLow:'/images/cultural-2-low-res.jpg' },
      { title:'Tea Ceremony in Alishan',desc:'Savor high-mountain oolongs and brewing technique.',      img:'/images/cultural-3.jpg', imgLow:'/images/cultural-3-low-res.jpg' }
    ]
  },
  culinary: {
    label: 'Culinary',
    items: [
      { title:'Night Market Tasting',    desc:'Stinky tofu, bubble tea, oyster omelets & more.',  img:'/images/culinary-1.jpg', imgLow:'/images/culinary-1-low-res.jpg' },
      { title:'Sea-to-Table in Hualien', desc:'Fresh catch, coastal views, local recipes.',        img:'/images/culinary-2.jpg', imgLow:'/images/culinary-2-low-res.jpg' },
      { title:'Pineapple Cake Workshop', desc:'Bake iconic treats to bring home.',                 img:'/images/culinary-3.jpg', imgLow:'/images/culinary-3-low-res.jpg' }
    ]
  }
}

export default function Experiences() {
  const [tab,   setTab]   = useState('cultural')
  const [slide, setSlide] = useState(0)
  const items = DATA[tab].items

  const switchTab = (key) => { setTab(key); setSlide(0) }
  const prev = () => setSlide(i => Math.max(i - 1, 0))
  const next = () => setSlide(i => Math.min(i + 1, items.length - 1))

  return (
    <section id="experiences" aria-labelledby="exp-title" style={{ background:'#f5f5f5' }}>
      <div className="container">
        <div className="exp__header">
          <div>
            <h2 id="exp-title" className="section-title fade-in">Cultural & Culinary Experiences</h2>
          </div>
          <div className="exp__tabs fade-in" role="tablist" aria-label="Experience categories">
            {Object.entries(DATA).map(([key, val]) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                className={`exp__tab${tab === key ? ' active' : ''}`}
                onClick={() => switchTab(key)}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        <div className="exp__layout fade-in">
          <div className="exp__slider">
            <div className="exp__track" style={{ transform:`translateX(-${slide * 100}%)` }}>
              {items.map((item, i) => (
                <div key={i} className="exp__slide" role="tabpanel" aria-label={item.title} aria-hidden={i !== slide}>
                  <img
                    src={item.img}
                    srcSet={`${item.imgLow} 760w, ${item.img} 1200w`}
                    sizes="(max-width:760px) 760px, 1200px"
                    alt={item.title}
                    loading="lazy"
                  />
                  <p className="exp__slide-label">Cultural — {item.title}</p>
                </div>
              ))}
            </div>
            <button className="exp__arrow exp__arrow--prev" onClick={prev} disabled={slide === 0} aria-label="Previous slide">‹</button>
            <button className="exp__arrow exp__arrow--next" onClick={next} disabled={slide === items.length - 1} aria-label="Next slide">›</button>
          </div>

          <div className="exp__info">
            <h3>{items[slide].title}</h3>
            <p>{items[slide].desc}</p>
            <a href="#contact" className="btn btn-primary" style={{ marginTop:20 }}>
              Ask about this experience →
            </a>
          </div>
        </div>

        <div className="exp__dots" role="group" aria-label="Slide indicators">
          {items.map((_, i) => (
            <button key={i} className={`exp__dot${slide === i ? ' active' : ''}`} onClick={() => setSlide(i)} aria-label={`Go to slide ${i + 1}`} aria-current={slide === i} />
          ))}
        </div>
      </div>
    </section>
  )
}