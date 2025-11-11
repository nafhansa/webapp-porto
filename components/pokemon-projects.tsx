"use client"

const projects = [
  {
    name: "POKÉDEX API",
    desc: "RESTful API for Pokemon data",
    tech: "Node.js, Express, MongoDB",
    badge: "FULL STACK",
  },
  {
    name: "SECURITY SCANNER",
    desc: "Network vulnerability detector",
    tech: "Python, Scapy, Flask",
    badge: "CYBERSECURITY",
  },
  {
    name: "TRAINER DASHBOARD",
    desc: "Portfolio management system",
    tech: "React, Next.js, TypeScript",
    badge: "FRONTEND",
  },
  {
    name: "BATTLE SIMULATOR",
    desc: "Real-time multiplayer game",
    tech: "WebSocket, React, Node.js",
    badge: "ADVANCED",
  },
]

export function PokemonProjects() {
  return (
    <section className="pokemon-projects">
      <div className="pokemon-section-title">
        <h2>PROJECT ENCOUNTERS</h2>
        <div className="pokemon-title-bar"></div>
      </div>
      <div className="pokemon-projects-grid">
        {projects.map((project) => (
          <div key={project.name} className="pokemon-project-card">
            <div className="pokemon-project-header">
              <h3>{project.name}</h3>
              <span className="pokemon-project-badge">{project.badge}</span>
            </div>
            <p className="pokemon-project-desc">{project.desc}</p>
            <p className="pokemon-project-tech">{project.tech}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
