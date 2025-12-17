import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera, ContactShadows, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface SteveProps {
    scale?: number;
}

// Komponen Landasan (Ground) - POSISI KEMBALI KE ASAL
function MinecraftGround() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial
                color="#559944"
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}

function SteveModel({ scale = 0.035 }: SteveProps) {
    const { scene, animations } = useGLTF('/models/steve_rigged.glb');
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        if (actions) {
            const walkAnim = actions['Walk'] || actions['walk'] || actions[Object.keys(actions)[0]];
            walkAnim?.reset().play();
        }

        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [actions, scene]);

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[0, 0.2]}>
            <primitive
                object={scene}
                scale={scale}
                // POSISI KEMBALI KE ASAL (Sesuai kodemu)
                position={[0, 0.46, 0]}
                rotation={[0, Math.PI / 8, 0]}
            />
        </Float>
    );
}

const HeroSection: React.FC = () => {
    // simple hook local to file to detect mobile width
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return (
        // 1. BACKGROUND DIGANTI GELAP (MALAM)
        <div id="spawn-point"
            style={{ width: '100%', height: '100vh', position: 'relative', background: '#090910', overflow: 'hidden' }}>

            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '15%' : '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                textAlign: 'center',
                width: '100%',
                pointerEvents: 'none'
            }}>
                <h1 style={{
                    fontFamily: '"Press Start 2P", cursive',
                    color: '#ffffff',
                    fontSize: 'clamp(1rem, 5vw, 2.5rem)',
                    textShadow: '4px 4px 0px #3f3f3f',
                    letterSpacing: '2px',
                    marginBottom: '1rem'
                }}>
                    NAFHAN BACK FROM NETHER
                </h1>
                <p style={{
                    fontFamily: 'monospace',
                    color: '#55FF55',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 0px #000',
                    display: 'inline-block',
                    padding: '5px 10px',
                    borderRadius: '4px'
                }}>
                    &lt; Full Stack Developer /&gt;
                </p>
            </div>

                <Canvas shadows dpr={[1, 1.5]}>
                <PerspectiveCamera makeDefault position={[0, 1, isMobile ? 18 : 12]} fov={50} />

                {/* 2. STARS (BINTANG) TANPA SKY */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* 3. LIGHTING MALAM (Moonlight) */}
                <ambientLight intensity={0.3} />
                <directionalLight
                    color="#b9d5ff" // Biru pucat (bulan)
                    position={[10, 20, 10]}
                    intensity={1.0}
                    castShadow
                    shadow-mapSize={[isMobile ? 512 : 1024, isMobile ? 512 : 1024]}
                />

                <Suspense fallback={null}>
                    {/* SKALA KEMBALI KE ASAL (Sesuai kodemu: 0.005) */}
                    <SteveModel scale={0.005} />

                    <MinecraftGround />

                    <ContactShadows
                        position={[0, -1.79, 0]}
                        opacity={0.6}
                        scale={10}
                        blur={2}
                        far={2}
                    />
                </Suspense>
            </Canvas>

            {/* Hotbar UI */}
            <div style={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '4px',
                padding: '6px',
                background: 'rgba(0,0,0,0.6)',
                border: '4px solid #373737',
                zIndex: 5
            }}>
                {[...Array(9)].map((_, i) => (
                    <div key={i} style={{
                        width: 'clamp(30px, 5vw, 50px)',
                        height: 'clamp(30px, 5vw, 50px)',
                        background: '#8B8B8B',
                        border: '3px solid',
                        borderColor: '#373737 #FFF #FFF #373737',
                    }} />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;