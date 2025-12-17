import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera, Preload, Html, ContactShadows, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { easing } from 'maath'


function PortalModel({ isZooming, onEnter }) {
    const { scene } = useGLTF('/models/nether_portal.glb')
    const portalMaterialRef = useRef()
    const autoRotateRef = useRef()

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                // Membuat obsidian terlihat matte/solid (tidak mengkilap)
                child.material.roughness = 0.8
                child.material.metalness = 0.1

                // Mencari mesh portal untuk diberi efek glow
                if (child.name.toLowerCase().includes('portal') || child.name.toLowerCase().includes('fluid')) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color('#ff00ff'),
                        emissive: new THREE.Color('#a020f0'),
                        emissiveIntensity: 15,
                        toneMapped: false,
                    })
                    portalMaterialRef.current = child.material
                }
            }
        })
    }, [scene])

    const zoomStartTimeRef = useRef(null)

    useFrame((state, delta) => {
        // 1. Rotasi Otomatis
        if (autoRotateRef.current && !isZooming) {
            autoRotateRef.current.rotation.y += delta * 0.3
        }

        // 2. Efek Kedip Cahaya Portal
        if (portalMaterialRef.current) {
            const time = state.clock.elapsedTime
            portalMaterialRef.current.emissiveIntensity = 10 + Math.sin(time * 3) * 8
        }

        // 3. Animasi Menembus Portal (Fixed 3 Detik)
        if (isZooming) {
            if (zoomStartTimeRef.current === null) {
                zoomStartTimeRef.current = state.clock.elapsedTime
            }

            const elapsed = state.clock.elapsedTime - zoomStartTimeRef.current
            const duration = 2.5 // Durasi total animasi 2 detik

            // Hitung progress 0 sampai 1
            const progress = Math.min(elapsed / duration, 1)

            // Interpolasi posisi kamera dari start (0, 4.3, 12) ke end (0, 4.3, -5)
            // Kita gunakan lerp manual agar waktunya presisi 3 detik
            const startPos = new THREE.Vector3(0, 4.3, 12)
            const endPos = new THREE.Vector3(0, 4.3, -5)

            // Menggunakan fungsi smoothstep untuk gerakan yang lebih halus (slow start, slow end)
            const smoothProgress = progress * progress * (3 - 2 * progress) // cubic smoothing

            state.camera.position.lerpVectors(startPos, endPos, smoothProgress)
            state.camera.lookAt(0, 4.3, -20)

            // Rotasi portal berhenti perlahan
            if (autoRotateRef.current) {
                const currentRot = autoRotateRef.current.rotation.clone()
                // Damp rotation to 0
                easing.dampE(autoRotateRef.current.rotation, [0, 0, 0], 0.5, delta)
            }

            // Pindah halaman hanya jika durasi sudah lewat 3 detik
            if (progress >= 1) {
                onEnter()
            }
        } else {
            // Reset timer jika tidak zooming
            zoomStartTimeRef.current = null
        }
    })

    return (
        <group position={[0, 0, 0]}>
            {/* Group Poros: Semua di dalam sini akan berputar bersama */}
            <group ref={autoRotateRef}>
                {/* Primitive digeser -4.3 agar pusat lubang portal tepat di poros 0 */}
                <primitive object={scene} position={[-4.3, 0, 0]} />

                {/* Sparkles dipindah ke SINI agar ikut berputar dengan portal */}
                <Sparkles
                    count={300}
                    scale={[4, 6, 2]}
                    size={4}
                    speed={0.5}
                    color="#ff00ff"
                    position={[0, 4.3, 0]}
                    noise={0.1}
                />
            </group>
        </group>
    )
}

export default function NetherPortalScene({ onEnter, isZooming, setIsZooming }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black', position: 'relative' }}>

            <Canvas shadows dpr={[1, 2]}>
                <color attach="background" args={['#050005']} />

                <PerspectiveCamera makeDefault position={[0, 4.3, 12]} fov={50} />

                <OrbitControls
                    enabled={!isZooming}
                    enableZoom={true}
                    target={[0, 4.3, 0]}
                    minDistance={5}
                    maxDistance={25}
                />

                <ambientLight intensity={1.2} color="#4b0082" />

                {/* Pencahayaan Dua Sisi (Depan & Belakang) */}
                <pointLight position={[0, 4.3, 5]} intensity={60} color="#ff00ff" />
                <pointLight position={[0, 4.3, -5]} intensity={60} color="#ff00ff" />

                {/* Bayangan tipis di lantai agar tidak ada bulatan aneh */}
                <ContactShadows position={[0, 0.01, 0]} opacity={0.15} scale={20} blur={2.5} color="#2b002b" />

                <Suspense fallback={<Html center><div style={{ color: '#a020f0', fontFamily: 'monospace' }}>GENERATING NETHER...</div></Html>}>
                    <PortalModel isZooming={isZooming} onEnter={onEnter} />
                    <Preload all />
                </Suspense>

                <EffectComposer>
                    <Bloom luminanceThreshold={0} intensity={1.8} mipmapBlur radius={0.4} />
                </EffectComposer>
            </Canvas>

            {/* --- TOMBOL ENTER PORTAL --- */}
            {!isZooming && (
                <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsZooming(true)}
                        style={{
                            padding: '15px 45px',
                            fontSize: '18px',
                            backgroundColor: isHovered ? '#ff00ff' : 'rgba(0, 0, 0, 0.3)',
                            color: isHovered ? '#000' : '#ff00ff',
                            border: '2px solid #ff00ff',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            letterSpacing: '4px',
                            textShadow: isHovered ? 'none' : '0 0 10px #ff00ff',
                            boxShadow: isHovered ? '0 0 40px #ff00ff' : '0 0 20px rgba(255, 0, 255, 0.3)',
                            transition: 'all 0.4s ease',
                            backdropFilter: 'blur(10px)',
                            outline: 'none'
                        }}
                    >
                        ENTER NETHER
                    </button>
                </div>
            )}
        </div>
    )
}