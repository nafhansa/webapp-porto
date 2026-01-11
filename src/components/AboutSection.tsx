import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", 
  ignoreMobileResize: true,
  syncInterval: 999
});
const MinecraftLavaEffect: React.FC = () => {
    const createStreamPath = (startX: number, side: 'left' | 'right') => {
        const segments = 20;
        const path: { x: number; y: number; width: number; rotation: number }[] = [];
        let currentX = startX;
        
        for (let j = 0; j < segments; j++) {
            let moveX = 0;
            
            if (j % 3 === 0) {
                moveX = (Math.random() - 0.5) * 25;
            } else if (j % 2 === 0) {
                moveX = (Math.random() - 0.5) * 12;
            } else {
                moveX = (Math.random() - 0.5) * 6;
            }
            
            currentX += moveX;
            
            if (side === 'left') {
                currentX = Math.max(0, Math.min(25, currentX));
            } else {
                currentX = Math.max(75, Math.min(100, currentX));
            }
            
            const rotation = moveX * 2;
            
            path.push({
                x: currentX,
                y: (j / segments) * 100,
                width: 10 + Math.random() * 6,
                rotation: rotation
            });
        }
        
        return path;
    };
    
    const leftStreams = Array.from({ length: 5 }, (_, i) => ({
        id: `left-${i}`,
        path: createStreamPath(3 + i * 4, 'left'),
        fallDuration: 10 + Math.random() * 5,
        animationDelay: Math.random() * 10
    }));
    
    const rightStreams = Array.from({ length: 5 }, (_, i) => ({
        id: `right-${i}`,
        path: createStreamPath(97 - i * 4, 'right'),
        fallDuration: 10 + Math.random() * 5,
        animationDelay: Math.random() * 10
    }));
    
    const lavaStreams = [...leftStreams, ...rightStreams];

    return (
        <>
            <style>{`
                @keyframes lavaFlow {
                    0% {
                        background-position: 0 0;
                    }
                    100% {
                        background-position: 0 100px;
                    }
                }
                
                @keyframes lavaGlow {
                    0%, 100% {
                        filter: brightness(1) saturate(1);
                    }
                    50% {
                        filter: brightness(1.3) saturate(1.5);
                    }
                }
                
                @keyframes lavaFall {
                    0% {
                        transform: translateY(-120vh);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    95% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(120vh);
                        opacity: 0;
                    }
                }
                
                .lava-stream-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    animation: lavaFall linear infinite;
                    will-change: transform;
                }
                
                .lava-stream-segment {
                    position: absolute;
                    background: linear-gradient(180deg,
                        rgba(255, 107, 0, 0.7) 0%,
                        rgba(255, 69, 0, 0.8) 25%,
                        rgba(255, 140, 0, 0.7) 50%,
                        rgba(255, 69, 0, 0.8) 75%,
                        rgba(255, 107, 0, 0.8) 100%
                    );
                    background-size: 100% 80px;
                    animation: lavaFlow linear infinite, lavaGlow 2s ease-in-out infinite;
                    box-shadow: 
                        inset 2px 0 4px rgba(255, 200, 0, 0.5),
                        inset -2px 0 4px rgba(139, 0, 0, 0.5),
                        0 0 15px rgba(255, 69, 0, 0.6);
                    pointer-events: none;
                    will-change: background-position;
                    border-radius: 2px;
                }
            `}</style>
            {lavaStreams.map((stream) => (
                <div
                    key={stream.id}
                    className="lava-stream-container"
                    style={{
                        left: '0%',
                        animationDuration: `${stream.fallDuration}s`,
                        animationDelay: `${stream.animationDelay}s`,
                        zIndex: 1
                    }}
                >
                    {stream.path.map((segment, segIndex) => {
                        const nextSegment = stream.path[segIndex + 1];
                        const height = nextSegment 
                            ? `${nextSegment.y - segment.y + 3}%` 
                            : '6%';
                        
                        return (
                            <div
                                key={`${stream.id}-${segIndex}`}
                                className="lava-stream-segment"
                                style={{
                                    left: `${segment.x}%`,
                                    top: `${segment.y}%`,
                                    width: `${segment.width}px`,
                                    height: height,
                                    transform: `rotate(${segment.rotation * 0.5}deg)`,
                                    transformOrigin: 'top center',
                                    animationDuration: `${stream.fallDuration * 0.3}s, 2s`,
                                    animationDelay: `0s, ${stream.animationDelay}s`
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
};

const AboutSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const avatarBoxRef = useRef<HTMLDivElement>(null);
    const statsBoxRef = useRef<HTMLDivElement>(null);
    const heartsRef = useRef<HTMLSpanElement[]>([]);
    const xpBarRef = useRef<HTMLDivElement>(null);

    heartsRef.current = [];

    const addToHeartsRef = (el: HTMLSpanElement | null) => {
        if (el && !heartsRef.current.includes(el)) {
            heartsRef.current.push(el);
        }
    };

    const stats = {
        year: 4,
        spawnPoint: "DKI Jakarta, Indonesia",
        class: "Fullstack Developer",
        faction: "Institut Teknologi Bandung",
        bio: "A proactive ITB Information Systems and Technology student, holding a Junior Penetration Tester certification and eager to leverage foundational Cyber Security knowledge and practical skills."
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });

            tl.from(titleRef.current, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "bounce.out"
            });

            tl.from(avatarBoxRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5");

            tl.from(statsBoxRef.current, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

            tl.from(heartsRef.current, {
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "back.out(2)"
            }, "-=0.4");

            tl.from(xpBarRef.current, {
                width: "0%",
                duration: 1.5,
                ease: "power2.out"
            }, "-=1");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#1d1d1d',
                backgroundImage: 'radial-gradient(circle at 50% 50%, #2a2a2a 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px 20px',
                borderTop: '4px solid #000',
                color: '#fff',
                fontFamily: 'monospace',
                overflow: 'hidden',
                position: 'relative'
            }}>
            <MinecraftLavaEffect />

            <h2
                ref={titleRef}
                style={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    marginBottom: '50px',
                    textShadow: '4px 4px 0 #000',
                    textAlign: 'center',
                    borderBottom: '4px solid #555',
                    paddingBottom: '10px',
                    position: 'relative',
                    zIndex: 10
                }}>
                PLAYER STATISTICS
            </h2>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '1000px',
                width: '100%',
                gap: '40px',
                justifyContent: 'center',
                alignItems: 'stretch',
                margin: '0 auto',
                position: 'relative',
                zIndex: 10
            }}>
                <div
                    ref={avatarBoxRef}
                    style={{
                        flex: isMobile ? '1 1 100%' : '1 1 400px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        transform: isMobile ? 'none' : 'translateX(-50px)'
                    }}>
                    <div style={{
                        width: isMobile ? '220px' : '300px',
                        height: isMobile ? '220px' : '300px',
                        background: '#000',
                        border: '4px solid #8b8b8b',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        boxShadow: '8px 8px 0 rgba(0,0,0,0.5)',
                        overflow: 'hidden'
                    }}>
                        <img
                            src="/avatar.jpg"
                            alt="Avatar"
                            style={{ width: '90%', height: '90%', objectFit: 'cover', imageRendering: 'pixelated' }}
                        />
                    </div>

                    <div style={{
                        background: 'rgba(0,0,0,0.6)',
                        padding: '10px 20px',
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: '0.8rem',
                        border: '2px solid #fff',
                        textAlign: 'center'
                    }}>
                        NAFHAN SHAFY AULIA
                    </div>

                    <button
                        style={{
                            width: '250px',
                            padding: '15px',
                            fontFamily: '"Press Start 2P", cursive',
                            fontSize: '0.8rem',
                            color: '#fff',
                            background: '#777',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: 'inset 4px 4px 0px #aaa, inset -4px -4px 0px #444, 4px 4px 0px #000',
                            textShadow: '2px 2px #333',
                            marginTop: '10px'
                        }}
                        onClick={() => window.open('https://drive.google.com/drive/u/3/folders/1BE30gbFIvpQlzwO7os0LpLJhQfBaQglZ', '_blank')}
                    >
                        DOWNLOAD CV
                    </button>
                </div>

                <div
                        ref={statsBoxRef}
                        style={{
                        flex: isMobile ? '1 1 100% auto' : '1 1 400px',
                        width: isMobile ? '75%' : '100%',
                        background: 'rgba(0,0,0,0.3)',
                        padding: isMobile ? '20px' : '30px',
                        border: '4px solid #555',
                        boxShadow: '8px 8px 0 rgba(0,0,0,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        transform: isMobile ? 'none' : 'translateX(-17px)',
                        maxWidth: isMobile ? '560px' : 'none',
                        margin: isMobile ? '0 auto' : undefined
                    }}>
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ marginBottom: '5px', color: '#aaa', fontWeight: 'bold' }}>HEALTH (STATUS)</p>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[...Array(10)].map((_, i) => (
                                <span
                                    key={i}
                                    ref={addToHeartsRef}
                                    style={{ fontSize: '1.5rem', color: '#ff5555', textShadow: '2px 2px 0 #000', display: 'inline-block' }}
                                >
                                    ♥
                                </span>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#55ff55', marginTop: '5px' }}>&gt; Ready for work</p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <p style={{ marginBottom: '5px', color: '#aaa', fontWeight: 'bold' }}>EXPERIENCE ON CODING</p>
                            <span style={{ fontFamily: '"Press Start 2P", cursive', color: '#55ff55', fontSize: isMobile ? '0.8rem' : '1.5rem' }}>
                                YEAR {stats.year}
                            </span>
                        </div>
                        <div style={{ width: '100%', height: '10px', background: '#333', border: '2px solid #000' }}>
                            <div
                                ref={xpBarRef}
                                style={{ width: '75%', height: '100%', background: '#55ff55' }}
                            ></div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '25px', borderTop: '2px dashed #555', paddingTop: '15px' }}>
                        <table style={{ width: '100%', fontSize: '1rem', borderSpacing: '0 10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ color: '#aaa' }}>Spawn Point:</td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#ffd700' }}>{stats.spawnPoint}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: '#aaa' }}>Class:</td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#55ffff' }}>{stats.class}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: '#aaa' }}>Faction:</td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stats.faction}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ background: '#111', padding: '15px', border: '2px solid #333' }}>
                        <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: '#ddd' }}>
                            <span style={{ color: '#55ff55', marginRight: '10px' }}>&gt;</span>
                            "{stats.bio}"
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;