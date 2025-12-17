import React, { useEffect, useState, memo } from 'react';

// ==========================================
// DATA DIPINDAH KE LUAR (Cegah Re-allocation)
// ==========================================
const SOCIAL_LINKS = [
    { name: "GitHub", url: "https://github.com/nafhansa", icon: "https://cdn.simpleicons.org/github/ffffff" },
    { name: "LinkedIn", url: "https://linkedin.com/in/nafhanshafy", icon: "https://cdn.simpleicons.org/linkedin/ffffff" },
    { name: "Instagram", url: "https://instagram.com/nafhanshafy", icon: "https://cdn.simpleicons.org/instagram/ffffff" },
    { name: "Email", url: "mailto:nafhan.sh@gmail.com", icon: "https://cdn.simpleicons.org/gmail/ffffff" },
];

const NAV_LINKS = [
    { name: "Spawn Point", href: "#spawn-point" },
    { name: "Player Statistics", href: "#about" },
    { name: "Inventory", href: "#inventory" },
    { name: "Quest Logs", href: "#quest-log" },
];

const MinecraftFooter: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <footer style={{
            width: '100%',
            position: 'relative',
            fontFamily: 'monospace',
            display: 'flex', 
            flexDirection: 'column'
        }}>
            {/* OPTIMASI CSS: Tetap di sini karena ini kunci performa GPU */}
            <style>{`
                .footer-nav-link {
                    color: #bbb;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    display: inline-block;
                    position: relative;
                }
                .footer-nav-link:hover {
                    color: #fff !important;
                    text-shadow: 2px 2px 0 #000 !important;
                    transform: translateX(8px);
                }
                .footer-nav-link::before {
                    content: '> ';
                    opacity: 0;
                    position: absolute;
                    left: -15px;
                    transition: opacity 0.2s ease;
                }
                .footer-nav-link:hover::before {
                    opacity: 1;
                }

                .footer-social-btn {
                    background-color: #5d4037;
                    border: 2px solid;
                    border-color: #795548 #3e2723 #3e2723 #795548;
                    transition: transform 0.1s ease, border-color 0.1s ease !important;
                    will-change: transform;
                }
                .footer-social-btn:hover {
                    border-color: #fff !important;
                    transform: scale(1.1) !important;
                }
                .footer-social-btn:active {
                    transform: scale(0.9) !important;
                }
            `}</style>

            {/* 1. LAYER GRASS */}
            <div style={{
                height: '24px',
                width: '100%',
                backgroundColor: '#588134',
                borderTop: '4px solid #6aad41',
                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 50%, transparent 50%)',
                backgroundSize: '8px 100%'
            }}></div>

            {/* 2. LAYER DIRT */}
            <div style={{
                backgroundColor: '#3b2512',
                backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 10%, transparent 10%), 
                    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 5%, transparent 5%)
                `,
                backgroundSize: '20px 20px, 40px 40px',
                padding: isMobile ? '30px 20px' : '60px 20px',
                color: '#bbb',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '40px'
                }}>
                    
                    <div style={{ flex: isMobile ? '1 1 100%' : '1 1 250px' }}>
                        <h3 style={{ 
                            fontFamily: '"Press Start 2P", cursive', 
                            color: '#fff', fontSize: '1.2rem', marginBottom: '20px',
                            textShadow: '2px 2px 0 #000'
                        }}>
                            NAFHAN'S REALM
                        </h3>
                        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
                            A digital playground built with blocks of code. Exploring the React biome and crafting pixel-perfect experiences.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '10px', height: '10px', background: '#55ff55', boxShadow: '0 0 5px #55ff55' }}></div>
                            <span style={{ color: '#55ff55', fontWeight: 'bold' }}>Server Online</span>
                        </div>
                    </div>

                    <div style={{ flex: isMobile ? '1 1 100%' : '1 1 150px' }}>
                        <h4 style={{ 
                            fontFamily: '"Press Start 2P", cursive', 
                            color: '#fff', fontSize: '1rem', marginBottom: '20px',
                            borderLeft: '4px solid #777', paddingLeft: '10px'
                        }}>
                            WARP POINTS
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {NAV_LINKS.map((link, i) => (
                                <li key={i} style={{ marginBottom: '12px', paddingLeft: '15px' }}>
                                    <a href={link.href} className="footer-nav-link">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ flex: isMobile ? '1 1 100%' : '1 1 200px' }}>
                        <h4 style={{ 
                            fontFamily: '"Press Start 2P", cursive', 
                            color: '#fff', fontSize: '1rem', marginBottom: '20px',
                            borderLeft: '4px solid #777', paddingLeft: '10px'
                        }}>
                            CONNECT
                        </h4>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {SOCIAL_LINKS.map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    className="footer-social-btn"
                                    style={{
                                        width: '45px', height: '45px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                >
                                    <img src={social.icon} alt={social.name} style={{ width: '24px', opacity: 0.9 }} />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. LAYER BEDROCK */}
            <div style={{
                backgroundColor: '#1a1a1a',
                backgroundImage: `
                    repeating-linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111),
                    repeating-linear-gradient(45deg, #111 25%, #1a1a1a 25%, #1a1a1a 75%, #111 75%, #111)
                `,
                backgroundPosition: '0 0, 10px 10px',
                backgroundSize: '20px 20px',
                borderTop: '4px solid #000',
                padding: '20px',
                textAlign: 'center',
                color: '#666',
                fontSize: '0.8rem'
            }}>
                <p style={{ margin: 0, fontFamily: 'monospace' }}>
                    © {new Date().getFullYear()} NAFHAN. Crafted with <span style={{color: '#cc0000'}}>♥</span> and lots of coffee blocks.
                </p>
            </div>
        </footer>
    );
};

// Bungkus dengan memo agar tidak re-render sia-sia
export default memo(MinecraftFooter);