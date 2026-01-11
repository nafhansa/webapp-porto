import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", 
  ignoreMobileResize: true,
  syncInterval: 999
});
const MinecraftGridBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridBlocksRef = useRef<any[]>([]);
    const rafIdRef = useRef<number | null>(null);
    const mouseRef = useRef<{ x: number | undefined; y: number | undefined }>({ x: undefined, y: undefined });
    const GRID_BLOCK_SIZE = 40; const FADE_DURATION = 300;
    const HIGHLIGHT_BG = "rgba(255, 255, 255, 0.05)"; const HIGHLIGHT_BORDER = "rgba(255, 255, 255, 0.6)";

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const initGrid = () => {
            container.innerHTML = ""; gridBlocksRef.current = [];
            const width = container.clientWidth; const height = container.clientHeight;
            const cols = Math.ceil(width / GRID_BLOCK_SIZE); const rows = Math.ceil(height / GRID_BLOCK_SIZE);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    createBlock(c * GRID_BLOCK_SIZE, r * GRID_BLOCK_SIZE, c, r);
                }
            }
        };
        const createBlock = (x: number, y: number, col: number, row: number) => {
            const block = document.createElement("div");
            block.style.cssText = `position:absolute;width:${GRID_BLOCK_SIZE}px;height:${GRID_BLOCK_SIZE}px;left:${x}px;top:${y}px;border:1px solid rgba(255,255,255,0.02);box-sizing:border-box;transition:background-color 0.1s, border-color 0.1s;`;
            container.appendChild(block);
            gridBlocksRef.current.push({ element: block, x: x + GRID_BLOCK_SIZE / 2, y: y + GRID_BLOCK_SIZE / 2, gridX: col, gridY: row, highlightEndTime: 0 });
        };
        const updateLoop = () => {
            const now = Date.now();
            gridBlocksRef.current.forEach(block => {
                if (block.highlightEndTime > 0 && now > block.highlightEndTime) {
                    block.highlightEndTime = 0;
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
            mouseRef.current.x = e.clientX - rect.left; mouseRef.current.y = e.clientY - rect.top;
            const mouseX = mouseRef.current.x; const mouseY = mouseRef.current.y;
            let closestBlock = null; let minDist = Infinity;
            for (const block of gridBlocksRef.current) {
                const dx = mouseX - block.x; const dy = mouseY - block.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDist) { minDist = dist; closestBlock = block; }
            }
            if (!closestBlock || minDist > GRID_BLOCK_SIZE * 1.5) return;
            closestBlock.highlightEndTime = Date.now() + FADE_DURATION;
            closestBlock.element.style.borderColor = HIGHLIGHT_BORDER;
            closestBlock.element.style.backgroundColor = HIGHLIGHT_BG;
            closestBlock.element.style.zIndex = "1";
        };
        const handleResize = () => initGrid();
        initGrid(); window.addEventListener("resize", handleResize); window.addEventListener("mousemove", handleMouseMove);
        rafIdRef.current = requestAnimationFrame(updateLoop);
        return () => { window.removeEventListener("resize", handleResize); window.removeEventListener("mousemove", handleMouseMove); if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current); };
    }, []);
    return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} />;
}

interface ItemData {
    id: number; name: string; icon: string; count: number; type: string; rarity: string; desc: string;
}

const getInitialItems = (): (ItemData | null)[] => {
    const slots = Array(36).fill(null);
    slots[0] = { id: 1, name: "React.js", icon: "https://cdn.simpleicons.org/react/61DAFB", count: 1, type: "Front-End Tool", rarity: "Epic", desc: "Highly reactive UI component. Grants +50 Coding Speed." };
    slots[1] = { id: 2, name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", count: 99, type: "Strong Typing", rarity: "Rare", desc: "Prevents type bugs. Essential for production raids." };
    slots[2] = { id: 3, name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", count: 1, type: "Back-End Engine", rarity: "Epic", desc: "JavaScript runtime. Powerful for server-side rendering." };
    slots[3] = { id: 4, name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", count: 1, type: "Meta Framework", rarity: "Legendary", desc: "The React Framework. Grants SSR & SEO buffs." };
    slots[4] = { id: 5, name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", count: 10, type: "Light Armor", rarity: "Common", desc: "Rapid styling capability." };
    slots[8] = { id: 9, name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", count: 1, type: "Save Point", rarity: "Common", desc: "Version Control System." };
    slots[9] = { id: 10, name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", count: 1, type: "Scripting", rarity: "Rare", desc: "Versatile language for AI and scripts." };
    slots[10] = { id: 11, name: "Burp Suite", icon: "https://cdn.simpleicons.org/burpsuite/FF6633", count: 1, type: "Hacking Tool", rarity: "Epic", desc: "Essential for Web Penetration Testing." };
    slots[11] = { id: 12, name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624", count: 1, type: "Environment", rarity: "Uncommon", desc: "Home of the hackers." };
    slots[12] = { id: 13, name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", count: 3, type: "Container", rarity: "Rare", desc: "Wraps apps in isolated environments." };
    slots[27] = { id: 101, name: "Coffee", icon: "https://cdn.simpleicons.org/buymeacoffee/FFDD00", count: 64, type: "Consumable", rarity: "Common", desc: "Restores stamina instantly." };
    slots[35] = { id: 109, name: "CV", icon: "https://cdn.simpleicons.org/googledocs/4285F4", count: 1, type: "Quest Item", rarity: "Legendary", desc: "Contains career history." };
    return slots;
};

const InventorySection: React.FC = () => {
    const [items, setItems] = useState<(ItemData | null)[]>(getInitialItems());
    const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [pickedIndex, setPickedIndex] = useState<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const slotsRef = useRef<HTMLDivElement[]>([]);

    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    const moveItem = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        const newItems = [...items];
        const temp = newItems[toIndex];
        newItems[toIndex] = newItems[fromIndex];
        newItems[fromIndex] = temp;
        setItems(newItems);
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        setPickedIndex(null); 
        setSelectedItem(null);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex !== null) {
            moveItem(draggedIndex, targetIndex);
            setDraggedIndex(null);
        }
    };

    const handleSlotClick = (index: number) => {
        if (pickedIndex === null) {
            if (items[index]) {
                setPickedIndex(index);
                setSelectedItem(items[index]);
            }
        } else {
            if (pickedIndex === index) {
                setPickedIndex(null);
            } else {
                moveItem(pickedIndex, index);
                setPickedIndex(null);
            }
            setSelectedItem(null); 
        }
    };
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, { scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }, y: -50, opacity: 0, duration: 1, ease: "bounce.out" });
            gsap.from(containerRef.current, { scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 30%", toggleActions: "play none none reverse" }, scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.5)" });
            gsap.from(slotsRef.current, { scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }, scale: 0, opacity: 0, stagger: { grid: [4, 9], from: "start", amount: 1 }, duration: 0.4, ease: "back.out(2)" });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    const renderSlot = (index: number) => {
        const item = items[index];
        const isDragging = draggedIndex === index;
        const isPicked = pickedIndex === index;

        let borderColor = '#373737 #FFF #FFF #373737';
        let backgroundColor = '#8B8B8B';

        if (isPicked) {
            borderColor = '#FFF'; 
            backgroundColor = '#555'; 
        }

        return (
            <div
                key={index}
                ref={el => { if (el && !slotsRef.current.includes(el)) slotsRef.current.push(el); }}
                draggable={!!item}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => handleSlotClick(index)}
                onMouseEnter={() => {
                    if (!draggedIndex && pickedIndex === null && item && !isMobile) {
                        setSelectedItem(item);
                    }
                }}
                onMouseLeave={() => {
                    if (!isMobile && pickedIndex === null) setSelectedItem(null);
                }}
                style={{
                    width: '100%', aspectRatio: '1 / 1',
                    background: backgroundColor,
                    border: isPicked ? '3px solid #FFFF00' : '3px solid',
                    borderColor: isPicked ? '#FFFF00' : borderColor,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    position: 'relative', 
                    cursor: item ? (isPicked ? 'grabbing' : 'grab') : (pickedIndex !== null ? 'pointer' : 'default'),
                    opacity: isDragging ? 0.5 : 1, 
                    transform: isPicked ? 'scale(0.95)' : 'none',
                    transition: 'background 0.1s, transform 0.1s',
                    zIndex: isPicked ? 20 : 10,
                    boxSizing: 'border-box',
                    boxShadow: isPicked ? 'inset 0 0 10px rgba(0,0,0,0.5)' : 'none'
                }}
            >
                {item && (
                    <>
                        <img
                            src={item.icon} alt={item.name}
                            style={{ 
                                width: '60%', height: '60%', objectFit: 'contain', 
                                filter: isPicked ? 'brightness(1.2) drop-shadow(0 0 5px yellow)' : 'drop-shadow(3px 3px 0px rgba(0,0,0,0.5))', 
                                pointerEvents: 'none' 
                            }}
                        />
                        {item.count > 1 && (
                            <span style={{ position: 'absolute', bottom: '4px', right: '6px', fontSize: '12px', color: '#FFF', textShadow: '2px 2px 0 #000', fontWeight: 'bold', fontFamily: '"Press Start 2P", cursive', pointerEvents: 'none' }}>
                                {item.count}
                            </span>
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
                width: '100%', minHeight: '100vh', backgroundColor: '#1d1d1d',
                position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '50px 20px', fontFamily: 'monospace', overflow: 'hidden'
            }}
        >
            <MinecraftGridBackground />

            <h2 ref={titleRef} style={{ fontFamily: '"Press Start 2P", cursive', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '40px', color: '#fff', textShadow: '4px 4px 0 #000', textAlign: 'center', borderBottom: '4px solid #555', paddingBottom: '10px', zIndex: 10, position: 'relative' }}>
                TECH STACK EXPERTISE
            </h2>

            <div ref={containerRef} style={{ background: '#C6C6C6', padding: '20px', border: '4px solid #000', boxShadow: 'inset 4px 4px 0px #FFF, inset -4px -4px 0px #555, 10px 10px 0px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '850px', width: '100%', zIndex: 10, position: 'relative' }}>
                <h3 style={{ fontFamily: '"Press Start 2P", cursive', color: '#404040', fontSize: '1.2rem', marginLeft: '5px', marginBottom: '5px' }}>
                    {pickedIndex !== null ? "SELECT DESTINATION..." : "INVENTORY"}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(40px, 1fr))' : 'repeat(9, 1fr)', gap: '6px', padding: '12px', background: '#8B8B8B', border: '3px solid', borderColor: '#373737 #FFF #FFF #373737' }}>
                    {items.slice(0, 27).map((_, i) => renderSlot(i))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(40px, 1fr))' : 'repeat(9, 1fr)', gap: '6px', padding: '12px', marginTop: '10px', background: '#8B8B8B', border: '3px solid', borderColor: '#373737 #FFF #FFF #373737' }}>
                    {items.slice(27, 36).map((_, i) => renderSlot(i + 27))}
                </div>
            </div>

            {selectedItem && !draggedIndex && (
                <div style={isMobile ? {
                    position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                    background: 'rgba(16, 0, 16, 0.98)', border: '4px solid #2e004f', 
                    // FIX: Ukuran Padding & Width dikecilkan untuk Mobile
                    padding: '10px', 
                    zIndex: 9999, pointerEvents: 'auto', 
                    minWidth: '220px', maxWidth: '90%',
                    boxShadow: '6px 6px 0px rgba(0,0,0,0.5)', borderRadius: '8px'
                } : {
                    position: 'fixed', top: mousePos.y, left: mousePos.x,
                    background: 'rgba(16, 0, 16, 0.98)', border: '4px solid #2e004f', 
                    padding: '16px',
                    zIndex: 9999, pointerEvents: 'none', 
                    minWidth: '250px', maxWidth: '350px',
                    boxShadow: '6px 6px 0px rgba(0,0,0,0.5)', borderRadius: '4px'
                }}>
                    <div style={{ 
                        color: selectedItem.rarity === 'Legendary' ? '#FFAA00' : selectedItem.rarity === 'Epic' ? '#A335EE' : selectedItem.rarity === 'Rare' ? '#0070DD' : '#FFFFFF', 
                        fontFamily: '"Press Start 2P", cursive', 
                        fontSize: isMobile ? '0.9rem' : '1.1rem', 
                        marginBottom: '10px', lineHeight: '1.4', textShadow: '3px 3px 0 #000' 
                    }}>
                        {selectedItem.name} {pickedIndex !== null && <span style={{fontSize: '0.7rem', color: '#FFFF00', marginLeft: '5px'}}>(MOVING...)</span>}
                    </div>
                    
                    <div style={{ 
                        color: '#AAAAAA', 
                        fontSize: isMobile ? '0.75rem' : '0.9rem', 
                        fontStyle: 'italic', marginBottom: '12px', fontFamily: 'monospace' 
                    }}>
                        {selectedItem.type}
                    </div>
                    
                    <div style={{ 
                        color: '#CCCCCC', 
                        fontSize: isMobile ? '0.85rem' : '1rem', 
                        lineHeight: '1.5', fontFamily: 'monospace' 
                    }}>
                        {selectedItem.desc}
                    </div>
                    
                    {isMobile && pickedIndex !== null && (
                         <div style={{ marginTop: '10px', color: '#FFFF00', fontSize: '0.7rem', fontStyle: 'italic' }}>
                            &gt; Tap another slot to move
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default InventorySection;