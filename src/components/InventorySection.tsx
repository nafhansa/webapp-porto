import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. MINECRAFT INTERACTIVE GRID COMPONENT
// ==========================================
const MinecraftGridBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridBlocksRef = useRef<any[]>([]);
    const rafIdRef = useRef<number | null>(null);
    const mouseRef = useRef<{ x: number | undefined; y: number | undefined }>({
        x: undefined,
        y: undefined,
    });

    // Minecraft Config
    const GRID_BLOCK_SIZE = 40; // Ukuran block pixel art
    const FADE_DURATION = 300; // Durasi highlight hilang
    
    // Warna "Block Selection" di Minecraft (Putih Transparan)
    const HIGHLIGHT_BG = "rgba(255, 255, 255, 0.05)"; 
    const HIGHLIGHT_BORDER = "rgba(255, 255, 255, 0.6)"; 

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const initGrid = () => {
            container.innerHTML = ""; 
            gridBlocksRef.current = []; 

            const width = container.clientWidth;
            const height = container.clientHeight;

            const cols = Math.ceil(width / GRID_BLOCK_SIZE);
            const rows = Math.ceil(height / GRID_BLOCK_SIZE);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const posX = c * GRID_BLOCK_SIZE;
                    const posY = r * GRID_BLOCK_SIZE;
                    createBlock(posX, posY, c, r);
                }
            }
        };

        const createBlock = (x: number, y: number, col: number, row: number) => {
            const block = document.createElement("div");
            
            block.style.position = "absolute";
            block.style.width = `${GRID_BLOCK_SIZE}px`;
            block.style.height = `${GRID_BLOCK_SIZE}px`;
            block.style.left = `${x}px`;
            block.style.top = `${y}px`;
            // Garis Grid Samar (Bedrock style)
            block.style.border = "1px solid rgba(255, 255, 255, 0.02)"; 
            block.style.boxSizing = "border-box";
            // Transisi cepat supaya snappy kaya game
            block.style.transition = "background-color 0.1s, border-color 0.1s"; 
            
            container.appendChild(block);

            gridBlocksRef.current.push({
                element: block,
                x: x + GRID_BLOCK_SIZE / 2,
                y: y + GRID_BLOCK_SIZE / 2,
                gridX: col,
                gridY: row,
                highlightEndTime: 0, 
            });
        };

        const addHighlights = () => {
            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            if (mouseX === undefined || mouseY === undefined) return;

            let closestBlock = null;
            let minDist = Infinity;

            // Cari block terdekat dengan cursor
            for (const block of gridBlocksRef.current) {
                const dx = mouseX - block.x;
                const dy = mouseY - block.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < minDist) {
                    minDist = dist;
                    closestBlock = block;
                }
            }

            // Radius interaksi (dipersempit biar presisi)
            if (!closestBlock || minDist > GRID_BLOCK_SIZE * 1.5) return;

            const now = Date.now();
            highlightBlock(closestBlock, now + FADE_DURATION);
        };

        const highlightBlock = (block: any, endTime: number) => {
            block.highlightEndTime = endTime;
            // Style saat hover (Selection Box Minecraft)
            block.element.style.borderColor = HIGHLIGHT_BORDER; 
            block.element.style.backgroundColor = HIGHLIGHT_BG; 
            block.element.style.zIndex = "1"; 
        };

        const updateLoop = () => {
            const now = Date.now();

            gridBlocksRef.current.forEach(block => {
                if (block.highlightEndTime > 0 && now > block.highlightEndTime) {
                    block.highlightEndTime = 0;
                    // Reset ke style awal
                    block.element.style.borderColor = "rgba(255, 255, 255, 0.02)";
                    block.element.style.backgroundColor = "transparent";
                    block.element.style.zIndex = "0";
                }
            });

            rafIdRef.current = requestAnimationFrame(updateLoop);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            
            // Hitung posisi mouse relatif terhadap container section
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;

            addHighlights();
        };

        const handleResize = () => {
            initGrid();
        };

        initGrid();
        window.addEventListener("resize", handleResize);
        // Event listener ditempel ke window agar tetap smooth
        window.addEventListener("mousemove", handleMouseMove); 
        
        rafIdRef.current = requestAnimationFrame(updateLoop);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none', // Biar klik tembus ke inventory
                zIndex: 0
            }}
        />
    );
}

// ==========================================
// 2. MAIN INVENTORY SECTION
// ==========================================

// Tipe data Item
interface ItemData {
    id: number;
    name: string;
    icon: string;
    count: number;
    type: string;
    rarity: string;
    desc: string;
}

const getInitialItems = (): (ItemData | null)[] => {
    const slots = Array(36).fill(null);
    slots[0] = { id: 1, name: "React.js", icon: "https://cdn.simpleicons.org/react/61DAFB", count: 1, type: "Front-End Tool", rarity: "Epic", desc: "Highly reactive UI component. Grants +50 Coding Speed and declarative power." };
    slots[1] = { id: 2, name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", count: 99, type: "Strong Typing", rarity: "Rare", desc: "Prevents type bugs before they happen. Essential for production raids." };
    slots[2] = { id: 3, name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", count: 1, type: "Back-End Engine", rarity: "Epic", desc: "JavaScript runtime outside the browser. Powerful for server-side rendering." };
    slots[3] = { id: 4, name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", count: 1, type: "Meta Framework", rarity: "Legendary", desc: "The React Framework for Production. Grants SSR & SEO buffs." };
    slots[4] = { id: 5, name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", count: 10, type: "Light Armor", rarity: "Common", desc: "Rapid styling capability. No need to write separate CSS files." };
    slots[8] = { id: 9, name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", count: 1, type: "Save Point", rarity: "Common", desc: "Version Control System. Remember to commit before sleeping." };
    slots[9] = { id: 10, name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", count: 1, type: "Scripting Scroll", rarity: "Rare", desc: "Versatile language. Perfect for automation, AI, and hacking scripts." };
    slots[10] = { id: 11, name: "Burp Suite", icon: "https://cdn.simpleicons.org/burpsuite/FF6633", count: 1, type: "Hacking Tool", rarity: "Epic", desc: "Essential for Web Penetration Testing. Reveals security flaws." };
    slots[11] = { id: 12, name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624", count: 1, type: "OS Environment", rarity: "Uncommon", desc: "Home of the hackers. The terminal is your second home." };
    slots[12] = { id: 13, name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", count: 3, type: "Container Box", rarity: "Rare", desc: "Wraps apps in isolated environments. 'Works on my machine' fixed." };
    slots[13] = { id: 14, name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", count: 1, type: "Database", rarity: "Rare", desc: "Reliable and open-source relational database storage." };
    slots[27] = { id: 101, name: "Black Coffee", icon: "https://cdn.simpleicons.org/buymeacoffee/FFDD00", count: 64, type: "Consumable", rarity: "Common", desc: "Restores stamina instantly. Allows coding for 4 hours straight." };
    slots[35] = { id: 109, name: "The CV", icon: "https://cdn.simpleicons.org/googledocs/4285F4", count: 1, type: "Quest Item", rarity: "Legendary", desc: "An ancient scroll containing career history and achievements." };
    return slots;
};

const InventorySection: React.FC = () => {
    const [items, setItems] = useState<(ItemData | null)[]>(getInitialItems());
    const [hoveredItem, setHoveredItem] = useState<ItemData | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const slotsRef = useRef<HTMLDivElement[]>([]);

    slotsRef.current = [];
    const addToSlotsRef = (el: HTMLDivElement | null) => {
        if (el && !slotsRef.current.includes(el)) slotsRef.current.push(el);
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        setHoveredItem(null);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;
        const newItems = [...items];
        newItems[targetIndex] = items[draggedIndex];
        newItems[draggedIndex] = items[targetIndex];
        setItems(newItems);
        setDraggedIndex(null);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
                y: -50, opacity: 0, duration: 1, ease: "bounce.out"
            });
            gsap.from(containerRef.current, {
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 30%", toggleActions: "play none none reverse" },
                scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.5)"
            });
            gsap.from(slotsRef.current, {
                scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
                scale: 0, opacity: 0, stagger: { grid: [4, 9], from: "start", amount: 1 },
                duration: 0.4, ease: "back.out(2)"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    const renderSlot = (index: number) => {
        const item = items[index];
        const isDragging = draggedIndex === index;

        return (
            <div
                key={index}
                ref={addToSlotsRef}
                draggable={!!item}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onMouseEnter={() => !draggedIndex && item && setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                    width: 'clamp(40px, 6vw, 75px)',
                    height: 'clamp(40px, 6vw, 75px)',
                    background: '#8B8B8B',
                    border: '3px solid',
                    borderColor: '#373737 #FFF #FFF #373737',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    position: 'relative', cursor: item ? 'grab' : 'default',
                    opacity: isDragging ? 0.5 : 1, transition: 'background 0.1s',
                    zIndex: 10 // Penting: Agar di atas background grid
                }}
                onMouseOver={(e) => { if (item && !isDragging) e.currentTarget.style.background = '#A0A0A0'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = '#8B8B8B'; }}
            >
                {item && (
                    <>
                        <img
                            src={item.icon} alt={item.name}
                            style={{ width: '65%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.5))', pointerEvents: 'none' }}
                        />
                        {item.count > 1 && (
                            <span style={{
                                position: 'absolute', bottom: '4px', right: '6px', fontSize: '14px', color: '#FFF', textShadow: '2px 2px 0 #000', fontWeight: 'bold', fontFamily: '"Press Start 2P", cursive', pointerEvents: 'none'
                            }}>{item.count}</span>
                        )}
                    </>
                )}
            </div>
        );
    };

    return (
        <section
            id="inventory"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#1d1d1d', // Warna dasar gelap
                // HAPUS background radial gradient yang lama agar grid terlihat
                position: 'relative',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '50px 20px', fontFamily: 'monospace',
                overflow: 'hidden'
            }}
        >
            {/* PANGGIL COMPONENT BACKGROUND DI SINI */}
            <MinecraftGridBackground />

            <h2
                ref={titleRef}
                style={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    marginBottom: '40px', color: '#fff', textShadow: '4px 4px 0 #000',
                    textAlign: 'center', borderBottom: '4px solid #555', paddingBottom: '10px',
                    zIndex: 10, position: 'relative'
                }}>
                TECH STACK EXPERIENFCE
            </h2>

            <div
                ref={containerRef}
                style={{
                    background: '#C6C6C6', padding: '20px',
                    border: '4px solid #000',
                    boxShadow: 'inset 4px 4px 0px #FFF, inset -4px -4px 0px #555, 10px 10px 0px rgba(0,0,0,0.5)',
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    maxWidth: '850px', width: '100%',
                    zIndex: 10, position: 'relative' // Pastikan container di atas background
                }}
            >
                <h3 style={{ fontFamily: '"Press Start 2P", cursive', color: '#404040', fontSize: '1.2rem', marginLeft: '5px', marginBottom: '5px' }}>
                    INVENTORY
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '6px', padding: '12px', background: '#8B8B8B', border: '3px solid', borderColor: '#373737 #FFF #FFF #373737' }}>
                    {items.slice(0, 27).map((_, i) => renderSlot(i))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '6px', padding: '12px', marginTop: '10px', background: '#8B8B8B', border: '3px solid', borderColor: '#373737 #FFF #FFF #373737' }}>
                    {items.slice(27, 36).map((_, i) => renderSlot(i + 27))}
                </div>
            </div>

            {/* Tooltip */}
            {hoveredItem && !draggedIndex && (
                <div style={{
                    position: 'fixed', top: mousePos.y, left: mousePos.x,
                    background: 'rgba(16, 0, 16, 0.98)', border: '4px solid #2e004f', padding: '16px',
                    zIndex: 9999, pointerEvents: 'none', minWidth: '250px', maxWidth: '350px',
                    boxShadow: '6px 6px 0px rgba(0,0,0,0.5)', borderRadius: '4px'
                }}>
                    <div style={{ color: hoveredItem.rarity === 'Legendary' ? '#FFAA00' : hoveredItem.rarity === 'Epic' ? '#A335EE' : hoveredItem.rarity === 'Rare' ? '#0070DD' : '#FFFFFF', fontFamily: '"Press Start 2P", cursive', fontSize: '1.1rem', marginBottom: '10px', lineHeight: '1.4', textShadow: '3px 3px 0 #000' }}>
                        {hoveredItem.name}
                    </div>
                    <div style={{ color: '#AAAAAA', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '12px', fontFamily: 'monospace' }}>
                        {hoveredItem.type}
                    </div>
                    <div style={{ color: '#CCCCCC', fontSize: '1rem', lineHeight: '1.5', fontFamily: 'monospace' }}>
                        {hoveredItem.desc}
                    </div>
                    <div style={{ marginTop: '15px', textAlign: 'right', color: hoveredItem.rarity === 'Legendary' ? '#FFAA00' : hoveredItem.rarity === 'Epic' ? '#A335EE' : hoveredItem.rarity === 'Rare' ? '#0070DD' : '#555555', fontWeight: 'bold', fontSize: '0.8rem', fontFamily: '"Press Start 2P", cursive' }}>
                        {hoveredItem.rarity.toUpperCase()}
                    </div>
                </div>
            )}
        </section>
    );
};

export default InventorySection;