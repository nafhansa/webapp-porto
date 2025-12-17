import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

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
    const heartsRef = useRef<HTMLSpanElement[]>([]); // Array Ref
    const xpBarRef = useRef<HTMLDivElement>(null);

    // Reset array ref setiap render agar tidak duplikat
    heartsRef.current = [];

    // Helper untuk memasukkan ref hati secara aman
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
        // Context GSAP untuk pembersihan otomatis (Cleanup)
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%", // Mulai saat bagian atas section menyentuh 75% layar
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                    markers: false // UBAH JADI TRUE JIKA MASIH GAK JALAN (Buat Debug)
                }
            });

            // 1. Judul Jatuh
            tl.from(titleRef.current, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "bounce.out"
            });

            // 2. Avatar Pop
            tl.from(avatarBoxRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5");

            // 3. Stats Geser
            tl.from(statsBoxRef.current, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

            // 4. Hati (Health) Muncul Satu-satu
            tl.from(heartsRef.current, {
                scale: 0,
                opacity: 0,
                stagger: 0.1, // Jeda antar hati
                duration: 0.4,
                ease: "back.out(2)"
            }, "-=0.4");

            // 5. XP Bar Mengisi
            tl.from(xpBarRef.current, {
                width: "0%",
                duration: 1.5,
                ease: "power2.out"
            }, "-=1");

        }, sectionRef); // Scope ke sectionRef

        return () => ctx.revert(); // Wajib revert saat unmount
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
                overflow: 'hidden'
            }}>

            <h2
                ref={titleRef}
                style={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    marginBottom: '50px',
                    textShadow: '4px 4px 0 #000',
                    textAlign: 'center',
                    borderBottom: '4px solid #555',
                    paddingBottom: '10px'
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
                margin: '0 auto'
            }}>

                {/* --- KOLOM KIRI (AVATAR) --- */}
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

                {/* --- KOLOM KANAN (STATS) --- */}
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

                    {/* HEALTH BAR */}
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ marginBottom: '5px', color: '#aaa', fontWeight: 'bold' }}>HEALTH (STATUS)</p>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[...Array(10)].map((_, i) => (
                                <span
                                    key={i}
                                    ref={addToHeartsRef} // Menggunakan helper function
                                    style={{ fontSize: '1.5rem', color: '#ff5555', textShadow: '2px 2px 0 #000', display: 'inline-block' }}
                                >
                                    ♥
                                </span>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#55ff55', marginTop: '5px' }}>&gt; Ready for work</p>
                    </div>

                    {/* EXPERIENCE */}
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <p style={{ marginBottom: '5px', color: '#aaa', fontWeight: 'bold' }}>EXPERIENCE ON CODING</p>
                            <span style={{ fontFamily: '"Press Start 2P", cursive', color: '#55ff55', fontSize: '1.5rem' }}>
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

                    {/* ATTRIBUTES & LORE */}
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