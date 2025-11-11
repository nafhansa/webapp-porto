"use client"

export function PokemonHeader() {
  return (
    <header className="pokemon-header">
      <div className="pokemon-header-content">
        <div className="pokemon-title-section">
          <h1 className="pokemon-title">NAFHAN'S POKÉMON JOURNEY</h1>
          <p className="pokemon-subtitle">Cybersecurity Trainer • Full Stack Developer</p>
        </div>
        <div className="pokemon-badge-container">
          <div className="pokemon-badge">POKÉDEX</div>
          <div className="pokemon-badge">SKILLS</div>
          <div className="pokemon-badge">PROJECTS</div>
        </div>
      </div>
    </header>
  )
}
