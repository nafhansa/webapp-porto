"use client"

import type React from "react"

const HeroOrbit: React.FC = () => {
  return (
    <div className="hero-orbit-layer" aria-hidden>
      <div className="orb orb--1"></div>
      <div className="orb orb--2"></div>
      <div className="orb orb--3"></div>
    </div>
  )
}

export default HeroOrbit
