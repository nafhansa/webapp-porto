import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard, { ProjectCardData } from './ProjectCard';

// ==========================================
// 2. GLOBAL GSAP CONFIG (Cegah Reflow)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", 
  ignoreMobileResize: true, 
  syncInterval: 999 
});

// Project data for enchanted cards
const projects: ProjectCardData[] = [
    {
        id: 1,
        title: "Trufman Realm",
        description: "A strategic web platform deployed at trufman.nafhan.space. Constructed the frontend armor using React and Tailwind CSS, while securing vital data within a robust PostgreSQL vault.",
        image: "/trufman.png",
        link: "https://trufman.nafhan.space",
        techStack: [
            "https://cdn.simpleicons.org/react/61DAFB",       
            "https://cdn.simpleicons.org/tailwindcss/06B6D4", 
            "https://cdn.simpleicons.org/postgresql/4169E1"   
        ]
    },
    {
        id: 2,
        title: "Job Tracker",
        description: "Career management tool...",
        image: "/job_tracker.png",
        link: "https://jobtrackerapp.site",
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
        description: "WebGL specific experience...",
        image: "/future.png",
        link: "https://miki-eta.vercel.app",
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
        description: "Academic pathfinder...",
        image: "/campuscompass.png",
        link: "https://campuscompass.id",
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
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    
    const sectionRef = useRef<HTMLElement>(null);
    const bookRef = useRef<HTMLDivElement>(null);
    const rightPageContentRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        let resizeTimeout: NodeJS.Timeout;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Reset to current card position on resize (desktop)
            if (!mobile) {
                // Use a debounce to ensure resize is complete
                resizeTimeout = setTimeout(() => {
                    if (carouselRef.current) {
                        scrollToIndex(currentIndex);
                    }
                }, 150);
            }
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            clearTimeout(resizeTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    useEffect(() => {
        if (rightPageContentRef.current) {
            gsap.fromTo(rightPageContentRef.current,
                { opacity: 0, y: 5 },
                { opacity: 1, 
                    y: 0, 
                    duration: 0.3, 
                    ease: "power2.out" ,
                    overwrite: "auto"
                }
            );
        }
    }, []);

    // Initialize carousel position on mount (desktop only)
    useEffect(() => {
        if (!isMobile && carouselRef.current) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                scrollToIndex(0);
            }, 100);
        }
    }, [isMobile]);

    // Desktop carousel navigation
    const goToSlide = (direction: 'prev' | 'next') => {
        if (isMobile || !carouselRef.current) return;

        const maxIndex = projects.length - 1;
        let newIndex = currentIndex;

        if (direction === 'next') {
            newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        } else {
            newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        }

        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
    };

    const scrollToIndex = (index: number) => {
        if (!carouselRef.current || isMobile) return;

        // Get container width
        const container = carouselRef.current.parentElement;
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const gap = 40; // gap between cards (matches CSS)
        // Card width matches CSS: calc(50% - 20px)
        // So: 50% of container - 20px = (containerWidth / 2) - 20
        const cardWidth = (containerWidth / 2) - 20;
        
        // Calculate position to center the active card
        // Each card starts at: index * (cardWidth + gap)
        // Center of card: index * (cardWidth + gap) + (cardWidth / 2)
        // We want this center to align with container center
        const cardStartPosition = index * (cardWidth + gap);
        const cardCenterPosition = cardStartPosition + (cardWidth / 2);
        const containerCenter = containerWidth / 2;
        
        // Scroll position: negative of (card center - container center)
        const scrollX = -(cardCenterPosition - containerCenter);

        // Smooth scroll animation
        if (scrollTweenRef.current) scrollTweenRef.current.kill();
        
        scrollTweenRef.current = gsap.to(carouselRef.current, {
            x: scrollX,
            duration: 0.6,
            ease: "power2.inOut"
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(bookRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                },
                y: 100,
                rotationX: 30,
                opacity: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                width: '100%',
                minHeight: '115vh',
                backgroundColor: '#181818',
                backgroundImage: `
                    radial-gradient(circle at 50% 50%, #2a2a2a 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 20%, transparent 80%, rgba(0,0,0,0.8))
                `,
                backgroundSize: '24px 24px, 100% 100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '100px 50px',
                fontFamily: 'monospace',
                overflow: 'hidden'
            }}
        >
            {/* Button styles moved to src/index.css for global stylesheet */}

            <h2 id="quest-log" style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                marginBottom: '50px',
                color: '#e0c097',
                textShadow: '4px 4px 0 #000',
                textAlign: 'center',
                letterSpacing: '-2px'
            }}>
                PROJECT LOGS
            </h2>

            <div ref={bookRef} style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: isMobile ? '100%' : '1200px',
                width: '100%',
                background: '#5c3a21',
                padding: '12px',
                borderRadius: '12px 24px 24px 12px',
                boxShadow: '20px 20px 0px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.6)',
                position: 'relative',
                border: '2px solid #3e2716'
            }}>
                {/* PAGE 2: RIGHT - ENCHANTED CARDS GRID/CAROUSEL */}
                <div style={{
                    flex: '1 1 100%',
                    background: '#f2e8d5',
                    padding: isMobile ? '30px 20px' : '30px 40px',
                    minHeight: isMobile ? '600px' : '580px',
                    borderRadius: '4px',
                    position: 'relative',
                    boxShadow: 'inset 30px 0 40px -20px rgba(0,0,0,0.15)',
                    overflow: isMobile ? 'auto' : 'hidden',
                    maxHeight: isMobile ? '600px' : 'none',
                }}>
                    <div ref={rightPageContentRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <h3 style={{
                            fontFamily: '"Press Start 2P", cursive',
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            color: '#3e2716',
                            marginBottom: '20px',
                            textAlign: 'center',
                            borderBottom: '4px double #8B4513',
                            paddingBottom: '12px'
                        }}>
                            ENCHANTED EXPERIENCE
                        </h3>
                        
                        {/* Mobile: Scrollable Grid */}
                        {isMobile ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gap: '24px',
                                justifyContent: 'center',
                                alignItems: 'start',
                                padding: '0 10px'
                            }}>
                                {projects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Desktop: Carousel with Navigation Buttons */
                            <>
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    overflow: 'hidden',
                                    height: '520px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '15px 0',
                                    justifyContent: 'center'
                                }}>
                                    <div
                                        ref={carouselRef}
                                        style={{
                                            display: 'flex',
                                            gap: '40px',
                                            willChange: 'transform',
                                        }}
                                    >
                                        {projects.map((project, index) => {
                                            // Calculate card width to show 1.5 cards at a time
                                            // Each card takes 50% of container (smaller to prevent cutting)
                                            const cardWidth = 'calc(50% - 20px)';
                                            return (
                                                <div
                                                    key={project.id}
                                                    style={{
                                                        flex: `0 0 ${cardWidth}`,
                                                        maxWidth: cardWidth,
                                                        minWidth: cardWidth,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'flex-start'
                                                    }}
                                                >
                                                    <ProjectCard
                                                        project={project}
                                                        index={index}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '20px',
                                    marginTop: '30px'
                                }}>
                                    <button
                                        onClick={() => goToSlide('prev')}
                                        className="warp-btn"
                                        style={{
                                            fontFamily: '"Press Start 2P", cursive',
                                            fontSize: '0.7rem',
                                            padding: '12px 24px',
                                            cursor: 'pointer',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            background: '#8B4513',
                                            boxShadow: '0 4px 0 #4e270a',
                                            transition: 'all 0.1s ease',
                                            transform: 'translateY(0)',
                                        }}
                                        onMouseDown={(e) => {
                                            gsap.to(e.currentTarget, {
                                                y: 4,
                                                boxShadow: '0 0 0 #4e270a',
                                                duration: 0.1
                                            });
                                        }}
                                        onMouseUp={(e) => {
                                            gsap.to(e.currentTarget, {
                                                y: 0,
                                                boxShadow: '0 4px 0 #4e270a',
                                                duration: 0.1
                                            });
                                        }}
                                    >
                                        ◀ PREV
                                    </button>
                                    <button
                                        onClick={() => goToSlide('next')}
                                        className="warp-btn"
                                        style={{
                                            fontFamily: '"Press Start 2P", cursive',
                                            fontSize: '0.7rem',
                                            padding: '12px 24px',
                                            cursor: 'pointer',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            background: '#8B4513',
                                            boxShadow: '0 4px 0 #4e270a',
                                            transition: 'all 0.1s ease',
                                            transform: 'translateY(0)',
                                        }}
                                        onMouseDown={(e) => {
                                            gsap.to(e.currentTarget, {
                                                y: 4,
                                                boxShadow: '0 0 0 #4e270a',
                                                duration: 0.1
                                            });
                                        }}
                                        onMouseUp={(e) => {
                                            gsap.to(e.currentTarget, {
                                                y: 0,
                                                boxShadow: '0 4px 0 #4e270a',
                                                duration: 0.1
                                            });
                                        }}
                                    >
                                        NEXT ▶
                                    </button>
                                </div>

                                {/* Dots Indicator */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    marginTop: '20px'
                                }}>
                                    {projects.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setCurrentIndex(index);
                                                scrollToIndex(index);
                                            }}
                                            style={{
                                                width: currentIndex === index ? '24px' : '12px',
                                                height: '12px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                background: currentIndex === index ? '#8B4513' : '#d3c1a5',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                padding: 0
                                            }}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestLogSection;