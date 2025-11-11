"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

type Project = {
  id: number
  title: string
  subtitle?: string
  image: string
  link?: string
  comingSoon?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "Trufman",
    subtitle: "Online Card Games",
    image: "./assets/images/trufman.png",
    link: "https://trufman.nafhan.space",
  },
  {
    id: 2,
    title: "Github Repo",
    subtitle: "My Personal Projects",
    image: "./assets/images/hub.png",
    link: "https://github.com/nafhansa",
  },
  {
    id: 3,
    title: "CTF Writeups",
    subtitle: "Personal CTF Documentation",
    image: "./assets/images/git.png",
    link: "https://renjana.gitbook.io/capturetheflag-pawned/",
  },
  {
    id: 4,
    title: "COMING SOON",
    subtitle: "",
    image: "./assets/images/comingsoon.jpg",
    comingSoon: true,
  },
  {
    id: 5,
    title: "COMING SOON",
    subtitle: "",
    image: "./assets/images/comingsoon.jpg",
    comingSoon: true,
  },
]

const AUTO_SPEED = 0.18
const DRAG_SENSITIVITY = 0.35

const ProjectCarousel3D: React.FC = () => {
  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startRotRef = useRef(0)
  const movedRef = useRef(false)
  const frameRef = useRef<number | null>(null)

  const itemCount = projects.length
  const step = 360 / itemCount
  const [radius, setRadius] = useState(360)

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      const style = getComputedStyle(document.documentElement)
      const cssMobile = Number.parseInt((style.getPropertyValue("--pc-radius-mobile") || "160").trim(), 10) || 160
      const cssTablet = Number.parseInt((style.getPropertyValue("--pc-radius-tablet") || "260").trim(), 10) || 260
      const cssDesktop = Number.parseInt((style.getPropertyValue("--pc-radius-desktop") || "360").trim(), 10) || 360

      if (w <= 480) setRadius(cssMobile)
      else if (w <= 900) setRadius(cssTablet)
      else setRadius(cssDesktop)
    }
    onResize()
    window.addEventListener("resize", onResize)
    const loop = () => {
      if (autoRotate && !isDraggingRef.current) {
        setRotation((prev) => (prev + AUTO_SPEED) % 360)
      }
      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame(loop)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [autoRotate])

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true
    movedRef.current = false
    setAutoRotate(false)
    ;(e.target as HTMLElement).closest(".pc3d-wrapper")?.classList.add("is-dragging")

    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX

    startXRef.current = clientX
    startRotRef.current = rotation
  }

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX

    const deltaX = clientX - startXRef.current
    if (Math.abs(deltaX) > 3) movedRef.current = true

    const nextRot = startRotRef.current + deltaX * DRAG_SENSITIVITY
    setRotation(nextRot)
  }

  const endDrag = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setAutoRotate(true)
    document.querySelector(".pc3d-wrapper")?.classList.remove("is-dragging")
  }

  const handleCardClick = (project: Project) => {
    if (movedRef.current) return
    if (project.comingSoon || !project.link) return
    window.open(project.link, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="projects-section">
      <div
        className="pc3d-wrapper"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={endDrag}
      >
        <div
          className="pc3d-ring"
          style={{
            transform: `perspective(1200px) rotateX(-14deg) rotateY(${rotation}deg)`,
          }}
        >
          {projects.map((project, index) => {
            const angle = index * step
            const isSoon = project.comingSoon

            return (
              <div
                key={project.id}
                className={"pc3d-item" + (isSoon ? " pc3d-item--soon" : "")}
                style={
                  {
                    "--pc-angle": `${angle}deg`,
                    "--pc-radius": `${radius}px`,
                  } as React.CSSProperties
                }
                onClick={() => handleCardClick(project)}
              >
                <div className={"pc3d-card" + (isSoon ? " pc3d-card--soon" : "")}>
                  <div className="pc3d-image-wrap">
                    <img src={project.image || "/placeholder.svg"} alt={project.title} />
                  </div>
                  <div className="pc3d-info">
                    <h3>{project.title}</h3>
                    {project.subtitle && <p>{project.subtitle}</p>}
                    <span className="pc3d-link-label">{isSoon ? "Coming soon" : "View project ↗"}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProjectCarousel3D
