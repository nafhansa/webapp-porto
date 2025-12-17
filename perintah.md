Context

I am building a Minecraft-themed portfolio website using React, Three.js, and @react-three/fiber. I have a .glb model of a Nether Portal. This file will serve as the landing page (Home) where the portal acts as the main navigation element.
Objective

Create a React component (NetherPortalScene) that renders the portal with the following interactive features:

    Interactive Orbit: Users can rotate and inspect the portal.

    Click-to-Enter: When the purple "portal" part of the mesh is clicked, the camera should smoothly animate (zoom in) directly into the center of the portal.

    Scene Transition: Once the camera reaches a certain proximity, trigger a state change or a callback to "enter" the next section of the site.

Technical Specifications
1. Scene Setup

    Use Canvas from @react-three/fiber.

    Implement OrbitControls from @react-three/drei.

    Constraint: Disable zooming via scroll/pinch manually so it doesn't interfere with the click-animation, but allow rotation.

2. Model Handling

    Load the model using useGLTF.

    Identify the specific mesh name for the "purple portal" (the internal fluid) versus the "obsidian frame."

    Apply a custom shader or a glowing MeshStandardMaterial to the purple portal mesh to make it emit light.

3. Animation Logic (The "Zoom" Effect)

    Use GSAP or Maath (damp.erp) for the camera transition.

    Logic:

        On clicking the portal mesh:

            Disable OrbitControls.

            Target the camera's lookAt to the center of the portal.

            Animate the camera.position to a coordinate inside or just behind the portal.

            Use an easing function (e.g., power2.in) to simulate "falling" into the portal.

4. Interactive Code Snippet Structure

Please generate the code following this structure:
JavaScript

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath' // For smooth camera movement

function PortalModel({ isZooming, setIsZooming }) {
  const { nodes, materials } = useGLTF('/nether_portal.glb')
  const portalRef = useRef()

  // Handle Click
  const handlePortalClick = (e) => {
    e.stopPropagation()
    setIsZooming(true)
  }

  useFrame((state, delta) => {
    if (isZooming) {
      // 1. Move camera position closer to the portal center
      // 2. Adjust camera FOV if necessary for effect
      // 3. Trigger 'next page' logic when distance is < 0.1
    }
  })

  return (
    <group ref={portalRef} onClick={handlePortalClick}>
      {/* Map through nodes and render meshes here */}
    </group>
  )
}

export default function NetherPortalScene() {
  const [isZooming, setIsZooming] = useState(false)

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <OrbitControls enabled={!isZooming} />
      <ambientLight intensity={0.5} />
      <PortalModel isZooming={isZooming} setIsZooming={setIsZooming} />
    </Canvas>
  )
}

Bonus Requirements

    VFX: Add a Bloom effect using @react-three/postprocessing to make the purple portal glow intensely.

    Sound: Provide a placeholder function to play the portal_ambient.mp3 and portal_travel.mp3 sounds when the animation starts.

    Performance: Ensure mesh.frustumCulled is true and use Preload for the assets.

How to use this:

    Create a file named perintah.md in your project.

    Open your code editor (VS Code).

    Open Copilot Chat and type: @workspace /read perintah.md - now please implement the NetherPortalScene component based on these instructions.