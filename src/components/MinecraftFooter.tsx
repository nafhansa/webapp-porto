import React from 'react';

const MinecraftFooter: React.FC = () => {
    
    // Data Social Media
    const socialLinks = [
        { name: "GitHub", url: "https://github.com/nafhansa", icon: "https://cdn.simpleicons.org/github/ffffff" },
        { name: "LinkedIn", url: "https://linkedin.com/in/nafhanshafy", icon: "https://cdn.simpleicons.org/linkedin/ffffff" },
        { name: "Instagram", url: "https://instagram.com/nafhanshafy", icon: "https://cdn.simpleicons.org/instagram/ffffff" },
        { name: "Email", url: "mailto:nafhan.sh@gmail.com", icon: "https://cdn.simpleicons.org/gmail/ffffff" },
    ];

    // Data Menu Links
    const navLinks = [
        { name: "Spawn Point", href: "#spawn-point" },     // Home
        { name: "Player Statistics", href: "#about" },  // About
        { name: "Inventory", href: "#inventory" },  // Skills
        { name: "Quest Logs", href: "#quest-log" },  // Projects
    ];

    return (
        <footer style={{
            width: '100%',
            position: 'relative',
            fontFamily: 'monospace',
            display: 'flex', flexDirection: 'column'
        }}>
            {/* 1. LAYER GRASS (Hijau Bagian Atas) */}
            <div style={{
                height: '24px',
                width: '100%',
                backgroundColor: '#588134', // Warna Rumput Minecraft
                borderTop: '4px solid #6aad41', // Highlight Rumput
                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 50%, transparent 50%)', // Pattern pixel halus
                backgroundSize: '8px 100%'
            }}></div>

            {/* 2. LAYER DIRT (Isi Konten Utama) */}
            <div style={{
                backgroundColor: '#3b2512', // Warna Tanah
                backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 10%, transparent 10%), 
                    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 5%, transparent 5%)
                `, // Tekstur Noise Tanah
                backgroundSize: '20px 20px, 40px 40px',
                padding: '60px 20px',
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
                    
                    {/* KOLOM 1: Brand / Server Info */}
                    <div style={{ flex: '1 1 250px' }}>
                        <h3 style={{ 
                            fontFamily: '"Press Start 2P", cursive', 
                            color: '#fff', 
                            fontSize: '1.2rem', 
                            marginBottom: '20px',
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

                    {/* KOLOM 2: Warp Points (Navigation) */}
                    <div style={{ flex: '1 1 150px' }}>
                        <h4 style={{ 
                            fontFamily: '"Press Start 2P", cursive', 
                            color: '#fff', fontSize: '1rem', 
                            marginBottom: '20px',
                            borderLeft: '4px solid #777',
                            paddingLeft: '10px'
                        }}>
                            WARP POINTS
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {navLinks.map((link, i) => (
                                <li key={i} style={{ marginBottom: '12px' }}>
                                    <a href={link.href} style={{ 
                                        color: '#bbb', textDecoration: 'none', 
                                        transition: 'color 0.2s', display: 'inline-block'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.textShadow = '2px 2px 0 #000';
                                        e.currentTarget.innerText = `> ${link.name}`; // Efek hover nambah ">"
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#bbb';
                                        e.currentTarget.style.textShadow = 'none';
                                        e.currentTarget.innerText = link.name;
                                    }}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KOLOM 3: Connect (Socials) */}
                    <div style={{ flex: '1 1 200px' }}>
                        <h4 style={{ 
                            fontFamily: '"Press Start 2P", cursive', 
                            color: '#fff', fontSize: '1rem', 
                            marginBottom: '20px',
                            borderLeft: '4px solid #777',
                            paddingLeft: '10px'
                        }}>
                            CONNECT
                        </h4>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {socialLinks.map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    style={{
                                        width: '45px', height: '45px',
                                        backgroundColor: '#5d4037', // Tombol Coklat
                                        border: '2px solid',
                                        borderColor: '#795548 #3e2723 #3e2723 #795548', // Efek 3D Tombol
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'transform 0.1s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#fff'; // Efek Highlight Selection Minecraft
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#795548 #3e2723 #3e2723 #795548';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <img src={social.icon} alt={social.name} style={{ width: '24px', opacity: 0.9 }} />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. LAYER BEDROCK (Footer Bottom / Copyright) */}
            <div style={{
                backgroundColor: '#1a1a1a', // Warna Bedrock
                backgroundImage: `
                    repeating-linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111),
                    repeating-linear-gradient(45deg, #111 25%, #1a1a1a 25%, #1a1a1a 75%, #111 75%, #111)
                `, // Pattern kasar
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

export default MinecraftFooter;