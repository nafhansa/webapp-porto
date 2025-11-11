"use client"

import { useEffect } from "react"

export function LightningCursor() {
  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9997"
    canvas.style.display = "block"
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
    }

    interface Trail {
      x: number
      y: number
      life: number
    }

    const particles: Particle[] = []
    const trails: Trail[] = []
    let mouseX = 0
    let mouseY = 0
    let lastMouseX = 0
    let lastMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Create more lightning particles untuk efek lebih terlihat
      const distance = Math.sqrt(
        Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
      )

      // Generate particles based on movement distance
      const particleCount = Math.min(Math.max(distance / 5, 2), 8)

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.random() * Math.PI * 2)
        const speed = Math.random() * 3 + 2

        particles.push({
          x: mouseX + (Math.random() - 0.5) * 30,
          y: mouseY + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 3 + 1,
        })
      }

      // Trail untuk cursor core
      trails.push({
        x: mouseX,
        y: mouseY,
        life: 1,
      })

      lastMouseX = mouseX
      lastMouseY = mouseY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw trails
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i]
        t.life -= 0.05

        if (t.life <= 0) {
          trails.splice(i, 1)
          continue
        }

        // Draw trail glow
        ctx.fillStyle = `rgba(255, 215, 0, ${t.life * 0.3})`
        ctx.shadowColor = `rgba(255, 215, 0, ${t.life * 0.5})`
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(t.x, t.y, 8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw and update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= 0.025
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15 // gravity

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        // Draw lightning particles dengan glow
        const particleAlpha = p.life * 0.9
        ctx.fillStyle = `rgba(255, 215, 0, ${particleAlpha})`
        ctx.shadowColor = `rgba(255, 215, 0, ${particleAlpha * 0.7})`
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw outer ring untuk lebih terlihat
        ctx.strokeStyle = `rgba(255, 215, 0, ${particleAlpha * 0.5})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw cursor core lightning
      ctx.shadowColor = "rgba(255, 215, 0, 0.8)"
      ctx.shadowBlur = 20
      ctx.fillStyle = "rgba(255, 215, 0, 1)"
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw outer ring pada core
      ctx.strokeStyle = "rgba(255, 215, 0, 0.6)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2)
      ctx.stroke()

      ctx.shadowColor = "transparent"
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (canvas.parentNode) {
        document.body.removeChild(canvas)
      }
    }
  }, [])

  return null
}
