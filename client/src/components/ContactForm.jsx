import { useState } from 'react'
import axios from 'axios'
import './ContactForm.css'

const INIT = { name: '', email: '', country: '', interests: '', message: '' }

export default function ContactForm() {
  const [form,    setForm]    = useState(INIT)
  const [errors,  setErrors]  = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

 
  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  
  const validate = () => {
    const e = {}
    if (!form.name.trim())
      e.name = 'Please enter your name'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email'
    if (!form.message.trim())
      e.message = 'Tell us a bit about your plans'
    return e
  }

  const submit = async () => {
    const e = validate()
    if (Object.keys(e).length) return setErrors(e)

    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      setSuccess(true)
      setForm(INIT)
    } catch (err) {
      
      const serverErrors = err.response?.data?.errors
      if (serverErrors) {
        const mapped = {}
        serverErrors.forEach(e => { mapped[e.path] = e.msg })
        setErrors(mapped)
      } else {
        setErrors({ message: 'Something went wrong. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

 
  if (success) return (
    <section id="contact" aria-labelledby="cf-title">
      <div className="container">
        <div className="cf__success" role="alert" aria-live="polite">
          <span className="cf__success-icon" aria-hidden="true">✅</span>
          <h3>Thanks!</h3>
          <p>We've received your request. We'll reach out with tips for your trip.</p>
          <button
            className="btn btn-primary"
            onClick={() => setSuccess(false)}
            style={{ marginTop: 24 }}
          >
            Send another inquiry
          </button>
        </div>
      </div>
    </section>
  )

  return (
    <section id="contact" aria-labelledby="cf-title">
      <div className="container">

        <h2 id="cf-title" className="section-title fade-in">
          Travel Consultation
        </h2>
        <p className="section-sub fade-in">
          Get personalized recommendations for your Taiwan adventure.
        </p>

        <div className="cf__form fade-in" role="form" aria-label="Travel consultation form">

          
          <div className="cf__row">
            <div className="cf__group">
              <label htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Your full name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
              />
              {errors.name && (
                <span id="err-name" className="cf__error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="cf__group">
              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && (
                <span id="err-email" className="cf__error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
 

          <div className="cf__row">
            <div className="cf__group">
              <label htmlFor="cf-country">Country</label>
              <input
                id="cf-country"
                type="text"
                value={form.country}
                onChange={e => set('country', e.target.value)}
                placeholder="Where are you based?"
              />
            </div>

            <div className="cf__group">
              <label htmlFor="cf-interests">Interests</label>
              <input
                id="cf-interests"
                type="text"
                value={form.interests}
                onChange={e => set('interests', e.target.value)}
                placeholder="Culture, food, nature, beaches…"
              />
            </div>
          </div>

          
          <div className="cf__group">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              value={form.message}
              onChange={e => set('message', e.target.value)}
              placeholder="Tell us about your dream Taiwan trip!"
              rows={5}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'err-message' : undefined}
            />
            {errors.message && (
              <span id="err-message" className="cf__error" role="alert">
                {errors.message}
              </span>
            )}
          </div>

       
          <button
            className="btn btn-primary cf__submit"
            onClick={submit}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Sending…' : 'Submit'}
          </button>

        </div>
      </div>
    </section>
  )
}