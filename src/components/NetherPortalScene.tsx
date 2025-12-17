import { useRef, useState, useEffect, Suspense, Dispatch, SetStateAction } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, PerspectiveCamera, Preload, Html, ContactShadows, Sparkles, PositionalAudio } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { easing } from 'maath'

// --- INTERFACES ---
interface PortalModelProps {
    isZooming: boolean;
    onEnter: () => void;
}

interface NetherPortalSceneProps {
    onEnter: () => void;
    isZooming: boolean;
    setIsZooming: Dispatch<SetStateAction<boolean>>;
}

// --- PORTAL MODEL COMPONENT ---
function PortalModel({ isZooming, onEnter }: PortalModelProps) {
    const { scene } = useGLTF('/models/nether_portal.glb')
    const portalMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null)
    const autoRotateRef = useRef<THREE.Group | null>(null)
    const zoomStartTimeRef = useRef<number | null>(null)
    const startCameraPosRef = useRef<THREE.Vector3 | null>(null)
    const startCameraTargetRef = useRef<THREE.Vector3 | null>(null)
    const audioRef = useRef<THREE.PositionalAudio | null>(null)

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material

                if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.roughness = 0.8
                    mat.metalness = 0.1
                }

                if (mesh.name.toLowerCase().includes('portal') || mesh.name.toLowerCase().includes('fluid')) {
                    const portalMat = new THREE.MeshStandardMaterial({
                        color: new THREE.Color('#ff00ff'),
                        emissive: new THREE.Color('#a020f0'),
                        emissiveIntensity: 15,
                        toneMapped: false,
                    })
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

        // 3. Animasi Zooming
        if (isZooming) {
            if (zoomStartTimeRef.current === null) {
                zoomStartTimeRef.current = state.clock.elapsedTime
                startCameraPosRef.current = state.camera.position.clone()
                startCameraTargetRef.current = new THREE.Vector3(0, 4.3, 0)
            }

            const elapsed = state.clock.elapsedTime - zoomStartTimeRef.current
            const duration = 2.5
            const progress = Math.min(elapsed / duration, 1)

            const p0 = startCameraPosRef.current || new THREE.Vector3(0, 4.3, 12)
            const p1 = new THREE.Vector3(0, 4.3, 12)
            const p2 = new THREE.Vector3(0, 4.3, -5)

            const t0 = startCameraTargetRef.current || new THREE.Vector3(0, 4.3, 0)
            const t1 = new THREE.Vector3(0, 4.3, 0)
            const t2 = new THREE.Vector3(0, 4.3, -20)

            const t = progress * progress * (3 - 2 * progress)
            const invT = 1 - t
            const pos = new THREE.Vector3().copy(p0).multiplyScalar(invT * invT).add(p1.clone().multiplyScalar(2 * invT * t)).add(p2.clone().multiplyScalar(t * t))
            const target = new THREE.Vector3().copy(t0).multiplyScalar(invT * invT).add(t1.clone().multiplyScalar(2 * invT * t)).add(t2.clone().multiplyScalar(t * t))

            state.camera.position.copy(pos)
            state.camera.lookAt(target)

            if (autoRotateRef.current) {
                easing.dampE(autoRotateRef.current.rotation, [0, 0, 0], 0.5, delta)
            }

            if (audioRef.current && elapsed > 1.5) {
                audioRef.current.setVolume(Math.max(0, 1 - (elapsed - 1.5) / 1.0))
            }

            if (progress >= 1) onEnter()
        } else {
            zoomStartTimeRef.current = null
            startCameraPosRef.current = null
            if (audioRef.current) audioRef.current.setVolume(1)
        }
    })

    return (
        <group ref={autoRotateRef}>
            <primitive object={scene} position={[-4.3, 0, 0]} />
            <Sparkles count={300} scale={[4, 6, 2]} size={4} speed={0.5} color="#ff00ff" position={[0, 4.3, 0]} />
            <PositionalAudio ref={audioRef} url="/sounds/portal_sound.mp3" distance={10} loop autoplay />
        </group>
    )
}

// --- MAIN SCENE COMPONENT ---
export default function NetherPortalScene({ onEnter, isZooming, setIsZooming }: NetherPortalSceneProps) {
    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const checkMobile = () => {
            const width = window.innerWidth;
            setIsMobileDevice(width < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleInteraction = () => {
            if (THREE.AudioContext.getContext().state === 'suspended') {
                THREE.AudioContext.getContext().resume()
            }
        }
        window.addEventListener('click', handleInteraction)
        return () => window.removeEventListener('click', handleInteraction)
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black', position: 'relative' }}>
            {/* INJECT CSS UNTUK HOVER TOMBOL AGAR JS LEBIH RINGAN */}
            <style>{`
                .exit-nether-btn {
                    padding: 15px 45px;
                    font-size: 18px;
                    background-color: rgba(0, 0, 0, 0.3);
                    color: #ff00ff;
                    border: 2px solid #ff00ff;
                    border-radius: 50px;
                    cursor: pointer;
                    font-family: monospace;
                    font-weight: bold;
                    letter-spacing: 4px;
                    transition: all 0.4s ease;
                    backdrop-filter: blur(10px);
                    outline: none;
                    text-shadow: 0 0 10px #ff00ff;
                    box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
                }
                .exit-nether-btn:hover {
                    background-color: #ff00ff !important;
                    color: #000 !important;
                    text-shadow: none !important;
                    box-shadow: 0 0 40px #ff00ff !important;
                }
            `}</style>

            <Canvas 
                dpr={isMobileDevice ? [1, 1] : [1, 1.5]}
                shadows={!isMobileDevice}
                gl={{ 
                    antialias: !isMobileDevice,
                    stencil: false,
                    powerPreference: "high-performance"
                }}
            >
                <color attach="background" args={['#050005']} />
                <PerspectiveCamera makeDefault position={[0, 4.3, 12]} fov={50} />
                <OrbitControls enabled={!isZooming} target={[0, 4.3, 0]} minDistance={5} maxDistance={25} />

                {/* Kompensasi Cahaya: Mobile lebih terang karena Bloom mati */}
                <ambientLight intensity={isMobileDevice ? 2.5 : 1.2} color="#4b0082" />
                <pointLight position={[0, 4.3, 5]} intensity={isMobileDevice ? 100 : 60} color="#ff00ff" />
                <pointLight position={[0, 4.3, -5]} intensity={60} color="#ff00ff" />

                {!isMobileDevice && (
                    <ContactShadows position={[0, 0.01, 0]} opacity={0.15} scale={20} blur={2.5} color="#2b002b" />
                )}

                <Suspense fallback={<Html center><div style={{ color: '#a020f0', fontFamily: 'monospace' }}>GENERATING NETHER...</div></Html>}>
                    <PortalModel isZooming={isZooming} onEnter={onEnter} />
                    {!isMobileDevice && <Preload all />}
                </Suspense>

                {/* Post-processing: Hanya dirender di Desktop */}
                {!isMobileDevice && (
                    <EffectComposer>
                        <Bloom 
                            luminanceThreshold={1} 
                            intensity={1.8} 
                            mipmapBlur 
                            radius={0.4} 
                        />
                    </EffectComposer>
                )}
            </Canvas>

            {!isZooming && (
                <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                    <button
                        onClick={() => setIsZooming(true)}
                        className="exit-nether-btn"
                    >
                        EXIT NETHER
                    </button>
                </div>
            )}
        </div>
    )
}