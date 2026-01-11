import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  ignoreMobileResize: true,
  syncInterval: 999
});

interface ProjectData {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    bgColor: string;
    techStack: string[];
}

const MinecraftSnowfall: React.FC = () => {
    const snowflakes = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 4,
        animationDelay: Math.random() * 5,
        size: 4 + Math.random() * 6,
        opacity: 0.4 + Math.random() * 0.6,
        drift: -20 + Math.random() * 40
    }));

    return (
        <>
            <style>{`
                @keyframes snowfall {
                    0% {
                        transform: translateY(-10px) translateX(0px);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) translateX(var(--drift));
                        opacity: 0;
                    }
                }
                .minecraft-snowflake {
                    position: absolute;
                    top: -10px;
                    background: #FFFFFF;
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 0 0 4px rgba(255, 255, 255, 0.8), inset 1px 1px 0px rgba(255, 255, 255, 0.9);
                    animation: snowfall linear infinite;
                    pointer-events: none;
                    will-change: transform;
                }
            `}</style>
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="minecraft-snowflake"
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        opacity: flake.opacity,
                        '--drift': `${flake.drift}px`
                    } as React.CSSProperties}
                />
            ))}
        </>
    );
};

const projects: ProjectData[] = [
    {
        id: 1,
        title: "Trufman Realm",
        description: "A strategic web platform deployed at trufman.nafhan.space. Constructed the frontend armor using React and Tailwind CSS, while securing vital data within a robust PostgreSQL vault.",
        image: "/trufman.png",
        link: "https://trufman.nafhan.space",
        bgColor: "#1a237e",
        techStack: [
            "https://cdn.simpleicons.org/react/61DAFB",
            "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "https://cdn.simpleicons.org/postgresql/4169E1"
        ]
    },
    {
        id: 2,
        title: "Job Tracker",
        description: "Career management tool that helps you track job applications, interviews, and offers. Built with Next.js, Radix UI, and Firebase for seamless experience.",
        image: "/job_tracker.png",
        link: "https://jobtrackerapp.site",
        bgColor: "#0d47a1",
        techStack: [
            "https://cdn.simpleicons.org/nextdotjs/000000",
            "https://cdn.simpleicons.org/radixui/161618",
            "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "https://cdn.simpleicons.org/paypal/00457C",
            "/google-firebase-icon.svg",
            "/google.png",
            "https://cdn.simpleicons.org/react/61DAFB",
            "https://cdn.simpleicons.org/vercel/000000"
        ]
    },
    {
        id: 3,
        title: "Future Defined",
        description: "WebGL specific experience showcasing modern web technologies. Interactive 3D visualization built with Three.js and GSAP for smooth animations.",
        image: "/future.png",
        link: "https://miki-eta.vercel.app",
        bgColor: "#4a148c",
        techStack: [
            "https://cdn.simpleicons.org/gsap/88CE02",
            "https://cdn.simpleicons.org/nextdotjs/000000",
            "https://cdn.simpleicons.org/react/61DAFB",
            "/threejs.svg",
            "https://cdn.simpleicons.org/vercel/000000",
            "https://cdn.simpleicons.org/tailwindcss/06B6D4"
        ]
    },
    {
        id: 4,
        title: "Campus Compass",
        description: "Academic pathfinder platform helping students navigate their educational journey. Comprehensive course management and academic planning tools.",
        image: "/campuscompass.png",
        link: "https://campuscompass.id",
        bgColor: "#01579b",
        techStack: [
            "https://cdn.simpleicons.org/vercel/000000",
            "https://cdn.simpleicons.org/railway/0B0D17",
            "https://cdn.simpleicons.org/react/61DAFB",
            "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "https://cdn.simpleicons.org/mongodb/47A248"
        ]
    }
];

const QuestLogSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 20%",
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const changeProject = (index: number) => {
        if (index === activeIndex) return;

        const direction = index > activeIndex ? 1 : -1;

        if (mediaRef.current && contentRef.current) {
            gsap.to([mediaRef.current, contentRef.current], {
                opacity: 0,
                x: direction * -100,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    setActiveIndex(index);
                    
                    setTimeout(() => {
                        if (mediaRef.current && contentRef.current) {
                            gsap.fromTo([mediaRef.current, contentRef.current],
                                { 
                                    opacity: 0, 
                                    x: direction * 100
                                },
                                { 
                                    opacity: 1, 
                                    x: 0, 
                                    duration: 0.5, 
                                    ease: "power2.out",
                                    stagger: 0.1
                                }
                            );
                        }
                    }, 50);
                }
            });
        }
    };

    const activeProject = projects[activeIndex];

    const containerStyle: React.CSSProperties = {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#87CEEB',
        backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 40% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 35%),
            linear-gradient(to bottom, #87CEEB 0%, #B0D4E3 50%, #D4E8F0 100%)
        `,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '40px 20px' : '60px 40px',
        overflow: 'hidden',
        position: 'relative'
    };

    const gridBackgroundStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        pointerEvents: 'none'
    };

    const paperStyle: React.CSSProperties = {
        width: '95%',
        maxWidth: '1600px',
        height: isMobile ? 'auto' : '90vh',
        minHeight: isMobile ? '600px' : '700px',
        backgroundColor: 'rgba(245, 222, 179, 0.95)',
        padding: isMobile ? '20px' : '30px',
        borderRadius: '20px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25), inset 4px 4px 8px rgba(255, 255, 255, 0.5), inset -4px -4px 8px rgba(0, 0, 0, 0.1)',
        border: '4px solid #8B7355',
        backdropFilter: 'blur(20px)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gridTemplateRows: isMobile ? 'auto auto 1fr auto auto' : '80px 1fr 80px 120px',
        gap: isMobile ? '20px' : '20px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1
    };

    return (
        <section ref={sectionRef} id="quest-log" style={containerStyle}>
            <div style={gridBackgroundStyle} />
            <MinecraftSnowfall />
            
            <div style={paperStyle}>
                <div style={{
                    gridColumn: isMobile ? 'auto' : '1 / -1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h2
                        ref={titleRef}
                        style={{
                            fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontWeight: 700,
                            color: '#2C3E50',
                            fontFamily: '"Press Start 2P", cursive',
                            letterSpacing: '0.05em',
                            textAlign: 'center',
                            margin: 0,
                            textShadow: '4px 4px 0 rgba(255, 255, 255, 0.8), 6px 6px 0 rgba(0, 0, 0, 0.1)',
                            border: '4px solid #8B7355',
                            padding: '15px 20px',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #F5DEB3 50%, #FFFFFF 100%)',
                            boxShadow: 'inset 4px 4px 0px rgba(255, 255, 255, 0.9), inset -4px -4px 0px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        PROJECT LOGS
                    </h2>
                </div>

                <div
                    ref={mediaRef}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        border: '4px solid #8B7355',
                        borderRadius: '0',
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        willChange: 'transform, opacity',
                        boxShadow: 'inset 4px 4px 0px rgba(255, 255, 255, 0.6), inset -4px -4px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(to bottom, transparent 0%, ${activeProject.bgColor}20 100%)`,
                            pointerEvents: 'none'
                        }}
                    />
                </div>

                <div
                    ref={contentRef}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        border: '4px solid #8B7355',
                        borderRadius: '0',
                        padding: isMobile ? '20px' : '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        color: '#2C3E50',
                        overflow: 'auto',
                        willChange: 'transform, opacity',
                        boxShadow: 'inset 4px 4px 0px rgba(255, 255, 255, 0.9), inset -4px -4px 0px rgba(0, 0, 0, 0.15), 8px 8px 0px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : 'clamp(1.8rem, 2.5vw, 2.5rem)',
                                fontWeight: 700,
                                marginBottom: '15px',
                                color: '#E67E22',
                                textShadow: '3px 3px 0 rgba(255, 255, 255, 0.6)',
                                lineHeight: '1.2',
                                fontFamily: 'monospace'
                            }}
                        >
                            {activeProject.title}
                        </h3>

                        <p
                            style={{
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: '1.8',
                                color: '#5D4E37',
                                fontWeight: 400,
                                marginBottom: '20px',
                                fontFamily: 'monospace'
                            }}
                        >
                            {activeProject.description}
                        </p>
                    </div>

                    <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: isMobile ? '12px 24px' : '14px 28px',
                            fontSize: isMobile ? '0.85rem' : '0.95rem',
                            fontWeight: 600,
                            color: '#FFF',
                            background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                            borderRadius: '0',
                            textDecoration: 'none',
                            border: '4px solid',
                            borderColor: '#F39C12 #C0392B #C0392B #F39C12',
                            boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3), inset 2px 2px 0px rgba(255, 255, 255, 0.3)',
                            transition: 'all 0.1s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            alignSelf: 'flex-start',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontFamily: '"Press Start 2P", cursive',
                            textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                            e.currentTarget.style.boxShadow = '8px 8px 0px rgba(0, 0, 0, 0.4), inset 2px 2px 0px rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = '6px 6px 0px rgba(0, 0, 0, 0.3), inset 2px 2px 0px rgba(255, 255, 255, 0.3)';
                        }}
                    >
                        View Project →
                    </a>
                </div>

                <div
                    style={{
                        gridColumn: isMobile ? 'auto' : '1 / -1',
                        backgroundColor: 'rgba(139, 115, 85, 0.3)',
                        padding: isMobile ? '12px' : '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        border: '4px solid rgba(93, 78, 55, 0.4)',
                        boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1)',
                        boxSizing: 'border-box'
                    }}
                >
                    {activeProject.techStack.map((tech, index) => (
                        <div
                            key={index}
                            style={{
                                width: isMobile ? '40px' : '50px',
                                height: isMobile ? '40px' : '50px',
                                borderRadius: '0',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5DEB3 100%)',
                                border: '3px solid',
                                borderColor: '#FFFFFF #8B7355 #8B7355 #FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.2s ease',
                                boxShadow: 'inset 2px 2px 0px rgba(255, 255, 255, 0.8), inset -2px -2px 0px rgba(0, 0, 0, 0.2)',
                                flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, #FFE5B4 0%, #DEB887 100%)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px rgba(255, 255, 255, 0.9), inset -2px -2px 0px rgba(0, 0, 0, 0.25)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #F5DEB3 100%)';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px rgba(255, 255, 255, 0.8), inset -2px -2px 0px rgba(0, 0, 0, 0.2)';
                            }}
                        >
                            <img
                                src={tech}
                                alt=""
                                style={{
                                    width: '70%',
                                    height: '70%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        gridColumn: isMobile ? 'auto' : '1 / -1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${projects.length}, 1fr)`,
                            gap: isMobile ? '10px' : '15px',
                            width: isMobile ? '100%' : '90%',
                            height: '100%'
                        }}
                    >
                        {projects.map((project, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={project.id}
                                    onClick={() => changeProject(index)}
                                    style={{
                                        backgroundColor: isActive ? '#E67E22' : 'rgba(255, 255, 255, 0.7)',
                                        color: isActive ? '#FFF' : '#5D4E37',
                                        border: isActive ? '4px solid #D35400' : '4px solid #8B7355',
                                        borderRadius: '0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: isActive 
                                            ? 'inset 2px 2px 0px rgba(255, 255, 255, 0.3), 6px 6px 0px rgba(0, 0, 0, 0.3)' 
                                            : 'inset 2px 2px 0px rgba(255, 255, 255, 0.8), inset -2px -2px 0px rgba(0, 0, 0, 0.15), 4px 4px 0px rgba(0, 0, 0, 0.2)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 229, 180, 0.9)';
                                            e.currentTarget.style.borderColor = '#D35400';
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = 'inset 2px 2px 0px rgba(255, 255, 255, 0.9), inset -2px -2px 0px rgba(0, 0, 0, 0.2), 6px 6px 0px rgba(0, 0, 0, 0.25)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                                            e.currentTarget.style.borderColor = '#8B7355';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'inset 2px 2px 0px rgba(255, 255, 255, 0.8), inset -2px -2px 0px rgba(0, 0, 0, 0.15), 4px 4px 0px rgba(0, 0, 0, 0.2)';
                                        }
                                    }}
                                >
                                    <span style={{ 
                                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        marginBottom: '8px',
                                        fontFamily: 'monospace',
                                        textShadow: isActive ? '2px 2px 0 rgba(0, 0, 0, 0.3)' : 'none'
                                    }}>
                                        PROJECT
                                    </span>
                                    <strong style={{ 
                                        fontSize: isMobile ? '1rem' : '2rem',
                                        fontWeight: 700,
                                        color: isActive ? '#FFF' : '#2C3E50',
                                        textShadow: isActive ? '3px 3px 0 rgba(0, 0, 0, 0.3)' : '2px 2px 0 rgba(255, 255, 255, 0.6)',
                                        fontFamily: '"Press Start 2P", cursive'
                                    }}>
                                        0{index + 1}
                                    </strong>
                                    <span
                                        style={{
                                            fontSize: isMobile ? '0.35rem' : '0.75rem',
                                            marginTop: isMobile ? '1px' : '8px',
                                            color: isActive ? '#FFD700' : 'transparent',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            visibility: isActive ? 'visible' : 'hidden',
                                            fontFamily: 'monospace',
                                            textShadow: isActive ? '2px 2px 0 rgba(0, 0, 0, 0.3)' : 'none'
                                        }}
                                    >
                                        ● ACTIVE
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestLogSection;