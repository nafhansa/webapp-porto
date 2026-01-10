import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface ProjectCardData {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    techStack: string[]; // URLs to tech stack icons
}

interface ProjectCardProps {
    project: ProjectCardData;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const floatingTweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const ctx = gsap.context(() => {
            // Entrance animation - staggered from opacity 0, y: 20
            const entranceDelay = index * 0.15;
            gsap.from(card, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: entranceDelay,
                ease: "power2.out",
                overwrite: "auto",
                onComplete: () => {
                    // Start floating animation after entrance completes
                    const randomDuration = 2 + Math.random() * 1.5; // 2-3.5 seconds
                    const randomDelay = Math.random() * 0.5;
                    const randomY = 3 + Math.random() * 4; // 3-7px movement

                    floatingTweenRef.current = gsap.to(card, {
                        y: -randomY,
                        duration: randomDuration,
                        delay: randomDelay,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1
                    });
                }
            });

            // Mouse move parallax - 3D tilt effect
            const handleMouseMove = (e: MouseEvent) => {
                if (!card) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8; // Max 8deg tilt
                const rotateY = ((x - centerX) / centerX) * 8;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            // Mouse leave - reset rotation
            const handleMouseLeave = () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            };

            // Hover state - scale and glow
            const handleMouseEnter = () => {
                // Pause floating animation on hover
                if (floatingTweenRef.current) {
                    floatingTweenRef.current.pause();
                }

                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Add gold glow effect
                if (card) {
                    card.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)';
                }
            };

            const handleMouseLeaveComplete = () => {
                handleMouseLeave();
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Resume floating animation
                if (floatingTweenRef.current) {
                    floatingTweenRef.current.resume();
                }

                // Remove glow effect
                if (card) {
                    card.style.boxShadow = '';
                }
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeaveComplete);

            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeaveComplete);
                if (floatingTweenRef.current) {
                    floatingTweenRef.current.kill();
                }
            };
        }, card);

        return () => ctx.revert();
    }, [index]);

    // Create jagged pixel border using CSS clip-path
    const pixelBorderClipPath = `
        polygon(
            0% 4px, 4px 0%, calc(100% - 4px) 0%, 100% 4px,
            100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px)
        )
    `;

    return (
        <div
            ref={cardRef}
            onClick={() => window.open(project.link, '_blank')}
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '100%',
                cursor: 'pointer',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
            }}
        >
            <div
                style={{
                    background: '#f2e8d5',
                    backgroundImage: `
                        repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 69, 19, 0.03) 2px, rgba(139, 69, 19, 0.03) 4px),
                        linear-gradient(to bottom, #f5ebe0, #ede0c8)
                    `,
                    padding: '16px',
                    borderRadius: '8px',
                    border: '4px solid #8B4513',
                    clipPath: pixelBorderClipPath,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    transformStyle: 'preserve-3d',
                    transition: 'box-shadow 0.3s ease',
                }}
            >
                {/* Image Container */}
                <div
                    ref={imageRef}
                    style={{
                        width: '100%',
                        aspectRatio: '16/10',
                        overflow: 'hidden',
                        borderRadius: '4px',
                        marginBottom: '12px',
                        border: '2px solid #8B4513',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                        backgroundColor: '#000',
                    }}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                        loading="lazy"
                    />
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: '0.7rem',
                        color: '#3e2716',
                        margin: '0 0 12px 0',
                        textAlign: 'center',
                        lineHeight: '1.4',
                        textShadow: '1px 1px 0 rgba(255, 255, 255, 0.5)',
                        wordBreak: 'break-word',
                    }}
                >
                    {project.title}
                </h3>

                {/* Tech Stack Icons - "Loot" */}
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        paddingTop: '8px',
                        borderTop: '2px dashed #d3c1a5',
                    }}
                >
                    {project.techStack.map((iconUrl, i) => (
                        <div
                            key={i}
                            style={{
                                width: '32px',
                                height: '32px',
                                background: '#fff',
                                padding: '4px',
                                borderRadius: '4px',
                                border: '2px solid #d3c1a5',
                                boxShadow: '2px 2px 0 #cbb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1.2,
                                    duration: 0.2,
                                    ease: "power2.out"
                                });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1,
                                    duration: 0.2,
                                    ease: "power2.out"
                                });
                            }}
                        >
                            <img
                                src={iconUrl}
                                alt="tech"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Decorative corner accents */}
                <div
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #8B4513',
                        borderRight: 'none',
                        borderBottom: 'none',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #8B4513',
                        borderLeft: 'none',
                        borderBottom: 'none',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #8B4513',
                        borderRight: 'none',
                        borderTop: 'none',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #8B4513',
                        borderLeft: 'none',
                        borderTop: 'none',
                    }}
                />
            </div>
        </div>
    );
};

export default ProjectCard;
