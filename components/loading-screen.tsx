"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate particles only on client
    setParticles(
      [...Array(15)].map((_, i) => ({
        id: i,
        delay: i * 0.1,
        duration: 2 + Math.random() * 1,
      }))
    )
  }, [])

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev
        }
        return prev + Math.random() * 30
      })
    }, 300)

    // Finish loading after 2 seconds
    const timeout = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (!isLoading) return null

  const emojis = ["⚡", "✨", "💛", "🔴"]

  return (
    <div className="loading-screen">
      {/* Parallax Background Layers */}
      <div className="loading-bg-layer loading-bg-1" />
      <div className="loading-bg-layer loading-bg-2" />
      <div className="loading-bg-layer loading-bg-3" />

      {/* Floating Pokeballs */}
      <div className="loading-pokeballs">
        <div className="loading-pokeball loading-pokeball-1" />
        <div className="loading-pokeball loading-pokeball-2" />
        <div className="loading-pokeball loading-pokeball-3" />
        <div className="loading-pokeball loading-pokeball-4" />
        <div className="loading-pokeball loading-pokeball-5" />
      </div>

      {/* Main Loading Container */}
      <div className="loading-container">
        {/* 3D Cube Effect */}
        <div className="loading-cube pb-5">
          <div className="cube-face cube-front">BAPP</div>
          <div className="cube-face cube-back">NAF</div>
          <div className="cube-face cube-right">HAN</div>
          <div className="cube-face cube-left">GAME</div>
          <div className="cube-face cube-top">⚡</div>
          <div className="cube-face cube-bottom">🎮</div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <h1 className="loading-title">LOADING ADVENTURE</h1>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div className="loading-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="loading-progress-text">{Math.round(progress)}%</span>
        </div>

        {/* Floating Particles */}
        <div className="loading-particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="loading-particle"
              style={{
                "--delay": `${particle.delay}s`,
                "--duration": `${particle.duration}s`,
              } as React.CSSProperties}
            >
              {emojis[particle.id % emojis.length]}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="loading-bottom">
        <p className="loading-tip">Preparing your Pokédex...</p>
      </div>
    </div>
  )
}
