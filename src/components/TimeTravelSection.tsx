import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  ignoreMobileResize: true,
  syncInterval: 999
});

interface TimeTravelSectionProps {
    onEnterFuture: () => void;
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

const TimeTravelSection: React.FC<TimeTravelSectionProps> = ({ onEnterFuture }) => {
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const cyanParticleRef = useRef<HTMLDivElement>(null);
    const purpleParticleRef = useRef<HTMLDivElement>(null);
    const clockOverlayRef = useRef<HTMLDivElement>(null);
    const clockFaceRef = useRef<HTMLDivElement>(null);
    const hourHandRef = useRef<HTMLDivElement>(null);
    const minuteHandRef = useRef<HTMLDivElement>(null);
    const secondHandRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // GSAP entrance animations and floating particles
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            tl.from(descriptionRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

            tl.from(buttonRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.4");

            if (cyanParticleRef.current) {
                gsap.to(cyanParticleRef.current, {
                    x: 20,
                    y: -20,
                    scale: 1.1,
                    duration: 6,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                });
            }

            if (purpleParticleRef.current) {
                gsap.to(purpleParticleRef.current, {
                    x: -20,
                    y: 20,
                    scale: 1.1,
                    duration: 8,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleEnterFuture = () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        
        if (clockOverlayRef.current) {
            gsap.set(clockOverlayRef.current, { opacity: 0, display: 'flex' });
            gsap.to(clockOverlayRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        }

        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                onEnterFuture();
                
                setTimeout(() => {
                    const questLogSection = document.querySelector('#quest-log');
                    if (questLogSection) {
                        questLogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
                
                document.body.style.overflow = '';
                
                if (clockOverlayRef.current) {
                    gsap.to(clockOverlayRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            if (clockOverlayRef.current) {
                                clockOverlayRef.current.style.display = 'none';
                            }
                            setIsAnimating(false);
                        }
                    });
                }
            }
        });

        if (clockFaceRef.current) {
            tl.from(clockFaceRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        }

        if (hourHandRef.current && minuteHandRef.current && secondHandRef.current) {
            gsap.set([hourHandRef.current, minuteHandRef.current, secondHandRef.current], {
                rotation: 0,
                transformOrigin: 'center bottom'
            });

            tl.to(secondHandRef.current, {
                rotation: 360 * 10,
                duration: 2,
                ease: 'power2.inOut'
            }, "-=0.3");

            tl.to(minuteHandRef.current, {
                rotation: 360 * 8,
                duration: 2,
                ease: 'power2.inOut'
            }, "-=2");

            tl.to(hourHandRef.current, {
                rotation: 360 * 5,
                duration: 2,
                ease: 'power2.inOut'
            }, "-=2");

            tl.to([hourHandRef.current, minuteHandRef.current, secondHandRef.current], {
                rotation: '+=90',
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            style={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#87CEEB',
                backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 40%),
                    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 45%),
                    radial-gradient(circle at 40% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 35%),
                    linear-gradient(to bottom, #87CEEB 0%, #B0D4E3 50%, #D4E8F0 100%)
                `,
                backgroundSize: '100% 100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px 20px',
                overflow: 'hidden',
                fontFamily: 'monospace'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    opacity: 0.3,
                    pointerEvents: 'none'
                }}
            />

            <MinecraftSnowfall />

            <div
                ref={cyanParticleRef}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '15%',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F4F8 50%, #D0E8F0 100%)',
                    border: '4px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), inset 4px 4px 8px rgba(255, 255, 255, 0.6), inset -4px -4px 8px rgba(0, 0, 0, 0.1)',
                    pointerEvents: 'none',
                    opacity: 0.9
                }}
            />
            <div
                ref={purpleParticleRef}
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '150px',
                    height: '150px',
                    background: 'linear-gradient(135deg, #FFE5B4 0%, #F5DEB3 50%, #DEB887 100%)',
                    border: '4px solid rgba(245, 222, 179, 0.8)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), inset 4px 4px 8px rgba(255, 255, 255, 0.5), inset -4px -4px 8px rgba(0, 0, 0, 0.1)',
                    pointerEvents: 'none',
                    opacity: 0.9
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    maxWidth: '800px',
                    width: '100%'
                }}
            >
                <h2
                    ref={titleRef}
                    style={{
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: isMobile ? 'clamp(1.2rem, 5vw, 2rem)' : 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: 400,
                        color: '#2C3E50',
                        marginBottom: '30px',
                        letterSpacing: '0.05em',
                        lineHeight: '1.4',
                        textShadow: '4px 4px 0 rgba(255, 255, 255, 0.8), 6px 6px 0 rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        border: '4px solid #8B7355',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #F5DEB3 0%, #FFFFFF 50%, #F5DEB3 100%)',
                        boxShadow: 'inset 4px 4px 0px rgba(255, 255, 255, 0.9), inset -4px -4px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    TRAVEL TO THE FUTURE
                </h2>

                <p
                    ref={descriptionRef}
                    style={{
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        color: '#2C3E50',
                        lineHeight: '1.8',
                        marginBottom: '50px',
                        fontWeight: 400,
                        maxWidth: '600px',
                        margin: '0 auto 50px auto',
                        fontFamily: 'monospace',
                        textShadow: '2px 2px 0 rgba(255, 255, 255, 0.6)'
                    }}
                >
                    Step through the nether portal of time and discover the future dimension. 
                    Explore modern projects and cutting-edge tech blocks that define tomorrow.
                </p>

                <button
                    ref={buttonRef}
                    onClick={handleEnterFuture}
                    disabled={isAnimating}
                    onMouseEnter={(e) => {
                        if (!isAnimating) {
                            gsap.to(e.currentTarget, {
                                scale: 1.05,
                                y: -4,
                                duration: 0.2,
                                ease: 'power2.out'
                            });
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isAnimating) {
                            gsap.to(e.currentTarget, {
                                scale: 1,
                                y: 0,
                                duration: 0.2,
                                ease: 'power2.out'
                            });
                        }
                    }}
                    style={{
                        padding: isMobile ? '16px 32px' : '20px 48px',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        fontWeight: 600,
                        color: '#FFF',
                        background: isAnimating 
                            ? 'linear-gradient(135deg, #95A5A6 0%, #7F8C8D 100%)' 
                            : 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                        border: '4px solid',
                        borderColor: isAnimating 
                            ? '#BDC3C7 #7F8C8D #7F8C8D #BDC3C7'
                            : '#F39C12 #C0392B #C0392B #F39C12',
                        borderRadius: '0',
                        cursor: isAnimating ? 'wait' : 'pointer',
                        boxShadow: isAnimating 
                            ? '6px 6px 0px rgba(0, 0, 0, 0.3)' 
                            : '8px 8px 0px rgba(0, 0, 0, 0.3), inset 2px 2px 0px rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.1s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontFamily: '"Press Start 2P", cursive',
                        opacity: isAnimating ? 0.7 : 1,
                        textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <span style={{ position: 'relative', zIndex: 2 }}>
                        {isAnimating ? 'WARPING...' : 'ENTER FUTURE'}
                    </span>
                </button>
            </div>

            <div
                ref={clockOverlayRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.3) 0%, transparent 40%),
                        radial-gradient(circle at 80% 50%, rgba(176, 212, 227, 0.25) 0%, transparent 45%),
                        linear-gradient(to bottom, #E8F4F8 0%, #FFFFFF 100%)
                    `,
                    backgroundSize: '100% 100%',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    pointerEvents: 'auto'
                }}
            >
                <div
                    ref={clockFaceRef}
                    style={{
                        position: 'relative',
                        width: isMobile ? '200px' : '300px',
                        height: isMobile ? '200px' : '300px',
                        borderRadius: '0',
                        background: 'linear-gradient(135deg, #F5DEB3 0%, #FFFFFF 50%, #F5DEB3 100%)',
                        border: '6px solid',
                        borderColor: '#FFFFFF #8B7355 #8B7355 #FFFFFF',
                        boxShadow: 'inset 4px 4px 0px rgba(255, 255, 255, 0.9), inset -4px -4px 0px rgba(0, 0, 0, 0.2), 12px 12px 0px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 - 90) * (Math.PI / 180);
                        const radius = isMobile ? 70 : 105;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    width: isMobile ? '8px' : '12px',
                                    height: isMobile ? '8px' : '12px',
                                    backgroundColor: i % 3 === 0 ? '#E67E22' : '#8B7355',
                                    border: '2px solid #5D4E37',
                                    transform: `translate(${x}px, ${y}px)`,
                                    boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.2)'
                                }}
                            />
                        );
                    })}

                    <div
                        style={{
                            position: 'absolute',
                            width: '16px',
                            height: '16px',
                            background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                            border: '2px solid #5D4E37',
                            boxShadow: 'inset 2px 2px 0px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2)',
                            zIndex: 10
                        }}
                    />

                    <div
                        ref={hourHandRef}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: isMobile ? '6px' : '8px',
                            height: isMobile ? '50px' : '75px',
                            background: 'linear-gradient(to top, #8B7355 0%, #5D4E37 100%)',
                            border: '2px solid #3E2723',
                            transformOrigin: 'center bottom',
                            transform: 'translate(-50%, -100%)',
                            boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.2)',
                            zIndex: 3
                        }}
                    />

                    <div
                        ref={minuteHandRef}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: isMobile ? '5px' : '6px',
                            height: isMobile ? '70px' : '105px',
                            background: 'linear-gradient(to top, #27AE60 0%, #229954 100%)',
                            border: '2px solid #1E8449',
                            transformOrigin: 'center bottom',
                            transform: 'translate(-50%, -100%)',
                            boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.2)',
                            zIndex: 2
                        }}
                    />

                    <div
                        ref={secondHandRef}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: isMobile ? '4px' : '5px',
                            height: isMobile ? '80px' : '120px',
                            background: 'linear-gradient(to top, #E67E22 0%, #D35400 100%)',
                            border: '2px solid #A04000',
                            transformOrigin: 'center bottom',
                            transform: 'translate(-50%, -100%)',
                            boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.2)',
                            zIndex: 1
                        }}
                    />
                </div>

                <div
                    style={{
                        position: 'absolute',
                        width: isMobile ? '240px' : '360px',
                        height: isMobile ? '240px' : '360px',
                        border: '4px solid rgba(245, 222, 179, 0.6)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'none'
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: isMobile ? '280px' : '420px',
                        height: isMobile ? '280px' : '420px',
                        border: '3px solid rgba(139, 115, 85, 0.3)',
                        pointerEvents: 'none'
                    }}
                />
            </div>
        </section>
    );
};

export default TimeTravelSection;
