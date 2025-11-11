"use client"

import type React from "react"
import { PikachuFollower } from "./pikachu-follower"
import { ParallaxPokeballs } from "./parallax-pokeballs"
import { PokedexProjects } from "./pokedex-projects"
import { LightningCursor } from "./lightning-cursor"
import { PikachuChatbot } from "./pikachu-chatbot"
import { useState, useEffect } from "react"

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <LightningCursor />
      <PikachuFollower />

      {/* HEADER - Pokemon Trainer Card Style */}
      <header className={`header ${scrolled ? "header--glass" : ""}`}>
        <div className="overlap-group">
          <button
            className={`nav-toggle ${menuOpen ? "nav-toggle--open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav id="primary-navigation" className={`navbar ${menuOpen ? "navbar--open" : ""}`} aria-label="Primary">
            <a onClick={() => setMenuOpen(false)} href="#home">
              Home
            </a>
            <a onClick={() => setMenuOpen(false)} href="#experience">
              Skills
            </a>
            <a onClick={() => setMenuOpen(false)} href="#projects">
              Projects
            </a>
            <a onClick={() => setMenuOpen(false)} href="#feedback">
              Feedback
            </a>
            <a onClick={() => setMenuOpen(false)} href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO - Pokemon Trainer Profile with Parallax */}
        <section id="home" className="hero">
          <ParallaxPokeballs />
          <div className="hero__inner">
            {/* Profile Photo Placeholder */}
            <div className="profile-avatar">
              <div className="profile-avatar-inner">
                <img src="./assets/pp.jpg" alt="Profile" className="profile-avatar-image" />
              </div>
            </div>

            <h1 className="title">
              NAFHAN
              <br />
              <span className="accent pt-2 pb-2">CYBERSECURITY</span>
              <br />
              ENTHUSIAST            
              </h1>

            <p className="hero__desc">
              I’m a proactive ITB Information Systems and Technology student, holding a Junior Penetration Tester certification and eager to leverage foundational Cyber Security knowledge and practical skills.
            </p>

            <div className="hero__cta">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Nafha...at%20portfolio%20kamu%20dan%20ingin%20ngobrol%20lebih%20lanjut." 
                className="pokemon-btn pokemon-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get In Touch
              </a>
              <a 
                href="https://drive.google.com/drive/folders/1BE30gbFIvpQlzwO7os0LpLJhQfBaQglZ?usp=sharing" download 
                className="pokemon-btn pokemon-btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS - Pokemon Dex Collection */}
        <section id="experience" className="skills">
          <p className="projects__title">SKILLS & EXPERTISE</p>
          <div className="skills-grid">
            {[
              { name: "React", icon: "./assets/react-svgrepo-com.svg" },
              { name: "Node.js", icon: "./assets/node-js-svgrepo-com.svg" },
              { name: "TypeScript", icon: "./assets/typescript-16-svgrepo-com.svg" },
              { name: "Security", icon: "./assets/hacker-svgrepo-com.svg" },
              { name: "Python", icon: "./assets/python-127-svgrepo-com.svg" },
              { name: "Docker", icon: "./assets/docker-svgrepo-com.svg" },
              { name: "PostgreSQL", icon: "./assets/postgresql-svgrepo-com.svg" },
            ].map((skill) => (
              <div key={skill.name} className="skill-card">
                <div className="skill-card-inner">
                  {skill.icon.startsWith("./assets") ? (
                    <img src={skill.icon} alt={skill.name} className="skill-icon-img" />
                  ) : (
                    <span className="skill-icon">{skill.icon}</span>
                  )}
                  <span className="skill-label">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS - Pokedex Device UI */}
        <section id="projects" className="projects">
          <h2 className="projects__title">MY PROJECTS</h2>
          <PokedexProjects />
        </section>

        {/* FEEDBACK - Pokemon Message System */}
        <section id="feedback" className="feedback">
          <h2 className="feedback__title">SEND ME A MESSAGE</h2>
          <form className="feedback__form">
            <textarea placeholder="Your message here..." />
            <div className="feedback__actions">
              <button type="submit" className="feedback__submit">
                Send
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* CONTACT - Pokemon Info Card */}
      <section id="contact" className="contact">
        <div className="contact__inner">
          <h2 className="contact__title">LET'S CONNECT</h2>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <img src="./assets/linkedin-svgrepo-com.svg" alt="LinkedIn" className="social-icon-img" />
            </a>
            <a href="https://github.com/nafhansa" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              <img src="./assets/github-142-svgrepo-com.svg" alt="GitHub" className="social-icon-img" />
            </a>
            <a href="https://www.instagram.com/nafhanshafy/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
              <img src="./assets/instagram-svgrepo-com.svg" alt="Instagram" className="social-icon-img" />
            </a>
            <a href="https://x.com/basketbertangan" target="_blank" rel="noopener noreferrer" className="social-link" title="X">
              <span className="social-icon">𝕏</span>
            </a>
          </div>
        </div>
      </section>

      {/* Pokedex Chatbot */}
      <PikachuChatbot />
    </>
  )
}

export default App
