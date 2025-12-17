import { useRef, useState, useEffect, Suspense, Dispatch, SetStateAction } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera, Preload, Html, ContactShadows, Sparkles, PositionalAudio } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { easing } from 'maath'

interface PortalModelProps {
    isZooming: boolean;
    onEnter: () => void;
}

function PortalModel({ isZooming, onEnter }: PortalModelProps) {
    const { scene } = useGLTF('/models/nether_portal.glb')
    const portalMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null)
    const autoRotateRef = useRef<THREE.Group | null>(null)
    const zoomStartTimeRef = useRef<number | null>(null)
    const startCameraPosRef = useRef<THREE.Vector3 | null>(null)
    const startCameraTargetRef = useRef<THREE.Vector3 | null>(null) // Restore target ref
    const audioRef = useRef<THREE.PositionalAudio | null>(null) // Ref untuk kontrol volume manual

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh

                // Some GLTFs use array materials; normalize to the first material for property checks
                const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material

                // Membuat obsidian terlihat matte/solid (tidak mengkilap)
                if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.roughness = 0.8
                    mat.metalness = 0.1
                }

                // Mencari mesh portal untuk diberi efek glow
                if (mesh.name.toLowerCase().includes('portal') || mesh.name.toLowerCase().includes('fluid')) {
                    const portalMat = new THREE.MeshStandardMaterial({
                        color: new THREE.Color('#ff00ff'),
                        emissive: new THREE.Color('#a020f0'),
                        emissiveIntensity: 15,
                        toneMapped: false,
                    })

                    // Assign the new material (Mesh.material accepts Material | Material[])
                    mesh.material = portalMat as unknown as THREE.Material
                    portalMaterialRef.current = portalMat
                }
            }
        })
    }, [scene])

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

        // 3. Animasi Menembus Portal (Fixed 2.5 Detik)
        if (isZooming) {
            // Inisialisasi posisi awal saat pertama kali klik
            if (zoomStartTimeRef.current === null) {
                zoomStartTimeRef.current = state.clock.elapsedTime
                startCameraPosRef.current = state.camera.position.clone()
                startCameraTargetRef.current = new THREE.Vector3(0, 4.3, 0) // Default lookAt center
            }

            const elapsed = state.clock.elapsedTime - zoomStartTimeRef.current
            const duration = 2.5 // Durasi 2.5 detik

            // Hitung progress 0 sampai 1
            const progress = Math.min(elapsed / duration, 1)

            // --- BEZIER CURVE LOGIC RESTORED ---
            // Keypoints Posisi
            const p0 = startCameraPosRef.current || new THREE.Vector3(0, 4.3, 12)
            const p1 = new THREE.Vector3(0, 4.3, 12) // Align depan dulu
            const p2 = new THREE.Vector3(0, 4.3, -5)  // Masuk portal

            // Keypoints Target
            const t0 = startCameraTargetRef.current || new THREE.Vector3(0, 4.3, 0)
            const t1 = new THREE.Vector3(0, 4.3, 0)
            const t2 = new THREE.Vector3(0, 4.3, -20)

            // Easing waktu (smoothstep)
            const t = progress * progress * (3 - 2 * progress)

            // Hitung Posisi Curve
            const invT = 1 - t
            const pos = new THREE.Vector3()
                .copy(p0).multiplyScalar(invT * invT)
                .add(p1.clone().multiplyScalar(2 * invT * t))
                .add(p2.clone().multiplyScalar(t * t))

            // Hitung Target Curve
            const target = new THREE.Vector3()
                .copy(t0).multiplyScalar(invT * invT)
                .add(t1.clone().multiplyScalar(2 * invT * t))
                .add(t2.clone().multiplyScalar(t * t))

            // Apply ke kamera
            state.camera.position.copy(pos)
            state.camera.lookAt(target)
            // -----------------------------------

            // Rotasi portal berhenti perlahan
            if (autoRotateRef.current) {
                easing.dampE(autoRotateRef.current.rotation, [0, 0, 0], 0.5, delta)
            }

            // FADE OUT AUDIO: Mulai fade out di detik ke-1.5 (pas transisi ungu muncul)
            if (audioRef.current) {
                if (elapsed > 1.5) {
                    const fadeOutDuration = 1.0 // Dari detik 1.5 sampai 2.5
                    const fadeOutProgress = (elapsed - 1.5) / fadeOutDuration
                    const newVolume = Math.max(0, 1 - fadeOutProgress)
                    audioRef.current.setVolume(newVolume)
                }
            }

            // Pindah halaman hanya jika durasi sudah lewat
            if (progress >= 1) {
                onEnter()
            }
        } else {
            // Reset timer dan ref posisi saat reset
            zoomStartTimeRef.current = null
            startCameraPosRef.current = null

            // Reset volume ke 1 kalau batal/selesai
            if (audioRef.current) audioRef.current.setVolume(1)
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

                {/* 3D Audio: Suara makin kencang saat dekat */}
                <PositionalAudio
                    ref={audioRef}
                    url="/sounds/portal_sound.mp3"
                    distance={10} // Jarak referensi diperbesar agar terdengar dari posisi awal (z=12)
                    loop
                    autoplay
                />
            </group>
        </group>
    )
}

interface NetherPortalSceneProps {
    onEnter: () => void;
    isZooming: boolean;
    setIsZooming: Dispatch<SetStateAction<boolean>>;
}

export default function NetherPortalScene({ onEnter, isZooming, setIsZooming }: NetherPortalSceneProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Fix Audio Context: Browser sering memblokir autoplay jika belum ada interaksi user
    useEffect(() => {
        const handleInteraction = () => {
            if (THREE.AudioContext.getContext().state === 'suspended') {
                THREE.AudioContext.getContext().resume()
            }
        }
        window.addEventListener('click', handleInteraction)
        window.addEventListener('keydown', handleInteraction)
        return () => {
            window.removeEventListener('click', handleInteraction)
            window.removeEventListener('keydown', handleInteraction)
        }
    }, [])

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
                        EXIT NETHER
                    </button>
                </div>
            )}
        </div>
    )
}
