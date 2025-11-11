"use client"

import type React from "react"

import { useState } from "react"

export function PokemonContact() {
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setMessage("")
  }

  return (
    <section className="pokemon-contact">
      <div className="pokemon-section-title">
        <h2>TRAINER COMMUNICATION</h2>
        <div className="pokemon-title-bar"></div>
      </div>
      <div className="pokemon-contact-container">
        <form onSubmit={handleSubmit} className="pokemon-contact-form">
          <div className="pokemon-form-group">
            <label className="pokemon-label">MESSAGE:</label>
            <textarea
              className="pokemon-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message to Nafhan..."
              required
            />
          </div>
          <button type="submit" className="pokemon-submit-btn">
            SEND MESSAGE
          </button>
          {submitted && <div className="pokemon-success-msg">MESSAGE SENT! ✓</div>}
        </form>
        <div className="pokemon-contact-info">
          <div className="pokemon-info-box">
            <p className="pokemon-info-label">EMAIL:</p>
            <p className="pokemon-info-value">contact@nafhan.dev</p>
          </div>
          <div className="pokemon-info-box">
            <p className="pokemon-info-label">SOCIAL:</p>
            <p className="pokemon-info-value">GitHub • LinkedIn • Twitter</p>
          </div>
        </div>
      </div>
    </section>
  )
}
