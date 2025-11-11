"use client"

import { useState } from "react"

const projects = [
  {
    id: 1,
    name: "Trufman Cards Game",
    description: "Full-stack web application for a card game",
    tech: ["React", "Node.js", "Supabase"],
  },
  {
    id: 2,
    name: "COMING SOON",
    description: "COMING SOON",
    tech: ["TypeScript", "WebSocket", "Canvas"],
  },
  {
    id: 3,
    name: "COMING SOON",
    description: "COMING SOON",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
  },
  {
    id: 4,
    name: "COMING SOON",
    description: "COMING SOON",
    tech: ["Vue.js", "Python", "FastAPI"],
  },
  {
    id: 5,
    name: "COMING SOON",
    description: "COMING SOON",
    tech: ["React Native", "Firebase", "Maps API"],
  },
]

export function PokedexProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const playNavigationSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const handlePrevious = () => {
    playNavigationSound()
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  const handleNext = () => {
    playNavigationSound()
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="pokedex-projects-container">
      <div className="pokedex-device-large">
        {/* Top section with lights */}
        <div className="pokedex-top-large">
          <div className="pokedex-blue-circle-large" />
          <div className="pokedex-lights-row">
            <div className="pokedex-light-small pokedex-light-red" />
            <div className="pokedex-light-small pokedex-light-yellow" />
            <div className="pokedex-light-small pokedex-light-green" />
          </div>
        </div>

        {/* Main display screen */}
        <div className="pokedex-display-large">
          <div className="pokedex-screen-content">
            <div className="project-info">
              <h3>{currentProject.name}</h3>
              <p className="project-desc">{currentProject.description}</p>
              <div className="project-tech">
                {currentProject.tech.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Control buttons */}
        <div className="pokedex-controls">
          <button
            onClick={handlePrevious}
            className="pokedex-nav-button pokedex-nav-left"
            aria-label="Previous project"
          >
            ◀
          </button>
          <div className="pokedex-counter">
            {currentIndex + 1} / {projects.length}
          </div>
          <button onClick={handleNext} className="pokedex-nav-button pokedex-nav-right" aria-label="Next project">
            ▶
          </button>
        </div>

        {/* Speaker grilles */}
        <div className="pokedex-speaker">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="speaker-line" />
          ))}
        </div>

        {/* D-pad */}
        <div className="pokedex-dpad-large">
          <div className="dpad-up" />
          <div className="dpad-left" />
          <div className="dpad-center" />
          <div className="dpad-right" />
          <div className="dpad-down" />
        </div>

        {/* Action buttons */}
        <div className="pokedex-action-buttons-large">
          <button className="btn-red-large" />
          <button className="btn-blue-large" />
          <button className="btn-green-large" />
          <button className="btn-yellow-large" />
        </div>
      </div>
    </div>
  )
}
