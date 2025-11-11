"use client"

export function PokemonHero() {
  return (
    <section className="pokemon-hero">
      <div className="pokemon-hero-bg"></div>
      <div className="pokemon-hero-content">
        <div className="pokemon-player-sprite"></div>
        <div className="pokemon-dialogue-box">
          <p className="pokemon-dialogue-text">Welcome, Trainer!</p>
          <p className="pokemon-dialogue-text">I'm a Pokémon Master in Cybersecurity</p>
          <p className="pokemon-dialogue-text">Let's explore my skills and projects!</p>
        </div>
      </div>
      <div className="pokemon-decorations">
        <div className="pokemon-tree tree-1"></div>
        <div className="pokemon-tree tree-2"></div>
        <div className="pokemon-tree tree-3"></div>
      </div>
    </section>
  )
}
