"use client"

import { useEffect, useRef } from "react"

export function PikachuFollower() {
  const pikachuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pikachuRef.current) return

      const mouseX = e.clientX
      const mouseY = e.clientY

      pikachuRef.current.style.left = mouseX - 20 + "px"
      pikachuRef.current.style.top = mouseY - 20 + "px"
    }

    // Only enable on desktop
    const isMobile = window.innerWidth < 768
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={pikachuRef} className="pikachu-follower" aria-hidden="true">
    </div>
  )
}
