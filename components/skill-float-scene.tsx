"use client"

import type React from "react"
import { useState } from "react"

type SkillItem = {
  src: string
  label: string
}

const skills: SkillItem[] = [
  { src: "/assets/icons/reactjs.png", label: "React" },
  { src: "/assets/icons/html.png", label: "HTML" },
  { src: "/assets/icons/javascript.png", label: "JavaScript" },
  { src: "/assets/icons/nodejs.png", label: "Node.js" },
  { src: "/assets/icons/css.png", label: "CSS" },
]

const SkillFloatScene: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  return (
    <div className="skills__3d-shell">
      <div className="skills__3d-wrapper">
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="skill-card"
              onMouseEnter={() => setHoveredSkill(i)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className={`skill-card-inner ${hoveredSkill === i ? "hovered" : ""}`}>
                <img src={skill.src || "/placeholder.svg"} alt={skill.label} />
                <p className="skill-label">{skill.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillFloatScene
