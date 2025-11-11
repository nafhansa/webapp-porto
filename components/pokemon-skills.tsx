"use client"

const skills = [
  { name: "PYTHON", level: "95", icon: "🐍" },
  { name: "JAVASCRIPT", level: "90", icon: "⚡" },
  { name: "REACT", level: "92", icon: "⚙️" },
  { name: "CYBERSECURITY", level: "98", icon: "🛡️" },
  { name: "NETWORKING", level: "88", icon: "🌐" },
  { name: "DATABASES", level: "85", icon: "💾" },
]

export function PokemonSkills() {
  return (
    <section className="pokemon-skills">
      <div className="pokemon-section-title">
        <h2>SKILL POKÉDEX</h2>
        <div className="pokemon-title-bar"></div>
      </div>
      <div className="pokemon-skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="pokemon-skill-card">
            <div className="pokemon-card-header">
              <span className="pokemon-skill-icon">{skill.icon}</span>
              <span className="pokemon-skill-name">{skill.name}</span>
            </div>
            <div className="pokemon-skill-level">
              <div className="pokemon-level-bar">
                <div className="pokemon-level-fill" style={{ width: `${skill.level}%` }}></div>
              </div>
              <span className="pokemon-level-text">LV.{skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
