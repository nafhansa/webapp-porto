import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ==========================================
// 2. GLOBAL GSAP CONFIG (Cegah Reflow)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", 
  ignoreMobileResize: true, 
  syncInterval: 999 
});

interface QuestData {
    id: number;
    title: string;
    type: string;
    difficulty: string;
    desc: string;
    rewards: string[];
    link: string;
    status: "COMPLETED" | "IN PROGRESS";
}

const quests: QuestData[] = [
    {
        id: 1,
        title: "Trufman Realm",
        type: "MAIN QUEST",
        difficulty: "⭐⭐⭐⭐",
        status: "COMPLETED",
        desc: "A strategic web platform deployed at trufman.nafhan.space. Constructed the frontend armor using React and Tailwind CSS, while securing vital data within a robust PostgreSQL vault.",
        rewards: [
            "https://cdn.simpleicons.org/react/61DAFB",       
            "https://cdn.simpleicons.org/tailwindcss/06B6D4", 
            "https://cdn.simpleicons.org/postgresql/4169E1"   
        ],
        link: "https://trufman.nafhan.space"
    },
    {
        id: 2,
        title: "Campus Compass",
        type: "GUILD REQUEST",
        difficulty: "⭐⭐⭐⭐⭐",
        status: "COMPLETED",
        desc: "A guidance system for academic adventurers at campuscompass.id. The frontend resides on Vercel lands, while backend logic operates on Railway tracks. Powered by React, Tailwind, and a MongoDB knowledge base.",
        rewards: [
            "https://cdn.simpleicons.org/vercel/000000",      
            "https://cdn.simpleicons.org/railway/0B0D17",     
            "https://cdn.simpleicons.org/react/61DAFB",       
            "https://cdn.simpleicons.org/tailwindcss/06B6D4", 
            "https://cdn.simpleicons.org/mongodb/47A248"      
        ],
        link: "https://campuscompass.id"
    },
    {
        id: 3,
        title: "Portfolio V1",
        type: "SIDE QUEST",
        difficulty: "⭐⭐",
        status: "COMPLETED",
        desc: "The very first scroll. A simple static site created to document early journey logs. Built with pure HTML/CSS before acquiring the React framework skill.",
        rewards: [
            "https://cdn.simpleicons.org/html5/E34F26",
            "https://cdn.simpleicons.org/css3/1572B6",
        ],
        link: "#"
    }
];

const QuestLogSection: React.FC = () => {
    const [selectedQuest, setSelectedQuest] = useState<QuestData>(quests[0]);
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    
    const sectionRef = useRef<HTMLElement>(null);
    const bookRef = useRef<HTMLDivElement>(null);
    const rightPageContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

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
    }, [selectedQuest]);

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
                maxWidth: '1100px',
                width: '100%',
                background: '#5c3a21',
                padding: '12px',
                borderRadius: '12px 24px 24px 12px',
                boxShadow: '20px 20px 0px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.6)',
                position: 'relative',
                border: '2px solid #3e2716'
            }}>
                {/* PAGE 1: LEFT */}
                <div style={{
                    flex: isMobile ? '1 1 100%' : '1 1 350px',
                    background: '#f2e8d5',
                    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)',
                    backgroundSize: '100% 2rem',
                    padding: '40px 30px',
                    minHeight: '600px',
                    borderRadius: isMobile ? '4px' : '4px 0 0 4px',
                    borderRight: isMobile ? 'none' : '1px solid #d3c1a5', 
                    position: 'relative',
                    boxShadow: isMobile ? 'none' : 'inset -30px 0 40px -20px rgba(0,0,0,0.2)'
                }}>
                    <h3 style={{
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: '1.2rem',
                        color: '#4a3b2a',
                        borderBottom: '4px double #8B4513',
                        paddingBottom: '15px',
                        marginBottom: '30px',
                        textAlign: 'center'
                    }}>Active Quests</h3>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {quests.map((quest) => (
                            <li
                                key={quest.id}
                                onClick={() => setSelectedQuest(quest)}
                                style={{
                                    padding: '18px 15px',
                                    marginBottom: '15px',
                                    cursor: 'pointer',
                                    background: selectedQuest.id === quest.id ? 'rgba(139, 69, 19, 0.15)' : 'transparent',
                                    border: selectedQuest.id === quest.id ? '2px dashed #8B4513' : '2px solid transparent',
                                    transform: selectedQuest.id === quest.id ? 'translateX(5px)' : 'translateX(0)',
                                    transition: 'all 0.2s ease-in-out',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    borderRadius: '4px'
                                }}
                            >
                                <span style={{ color: selectedQuest.id === quest.id ? '#8B4513' : '#aaa', fontSize: '1.2rem', fontFamily: '"Press Start 2P", cursive' }}>
                                    {selectedQuest.id === quest.id ? '>' : '-'}
                                </span>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#3e2716', fontFamily: '"Press Start 2P", cursive', marginBottom: '6px' }}>{quest.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#776', fontWeight: 'bold' }}>[{quest.type}]</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* PAGE 2: RIGHT */}
                <div style={{
                    flex: isMobile ? '1 1 100%' : '1 1 350px',
                    background: '#f2e8d5',
                    padding: '40px 30px',
                    minHeight: '600px',
                    borderRadius: isMobile ? '4px' : '0 4px 4px 0',
                    position: 'relative',
                    boxShadow: isMobile ? 'none' : 'inset 30px 0 40px -20px rgba(0,0,0,0.15)'
                }}>
                    <div ref={rightPageContentRef} className="quest-detail-container">
                        {selectedQuest.status === 'COMPLETED' && (
                            <div style={{
                                position: 'absolute', top: '30px', right: '30px',
                                border: '6px solid #b30000', color: '#b30000',
                                padding: '8px 14px', fontFamily: '"Press Start 2P", cursive',
                                fontSize: '1rem', transform: 'rotate(-15deg)',
                                opacity: 0.6, pointerEvents: 'none', mixBlendMode: 'multiply'
                            }}>CLEARED</div>
                        )}

                        <h3 style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '1.5rem', color: '#2c1e12', marginBottom: '15px', borderBottom: '2px solid #d3c1a5', paddingBottom: '15px' }}>
                            {selectedQuest.title}
                        </h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#665', marginBottom: '30px', fontSize: '1rem' }}>
                            <span>Rank: <strong style={{color: '#8B4513'}}>{selectedQuest.type}</strong></span>
                            <span>Diff: <span style={{ color: '#e67e22' }}>{selectedQuest.difficulty}</span></span>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h4 style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '0.9rem', color: '#5c3a21', marginBottom: '10px' }}>MISSION BRIEF:</h4>
                            <p style={{ lineHeight: '1.8', color: '#333', fontSize: '1.1rem', textAlign: 'justify' }}>{selectedQuest.desc}</p>
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <h4 style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '0.9rem', color: '#5c3a21', marginBottom: '15px' }}>LOOT ACQUIRED:</h4>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {selectedQuest.rewards.map((url, i) => (
                                    <div key={i} style={{ width: '48px', height: '48px', background: '#fff', padding: '8px', borderRadius: '8px', border: '2px solid #d3c1a5', boxShadow: '3px 3px 0 #cbb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={url} alt="tech" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TOMBOL YANG SUDAH DIOPTIMASI */}
                        <button
                            className="warp-btn"
                            onClick={() => window.open(selectedQuest.link, '_blank')}
                            style={{
                                color: '#fff',
                                border: 'none',
                                padding: '18px 30px',
                                fontFamily: '"Press Start 2P", cursive',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                display: 'block',
                                width: '100%',
                                borderRadius: '8px',
                            }}
                        >
                            WARP TO LOCATION
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestLogSection;