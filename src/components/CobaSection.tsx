import React from 'react';

const JournalBlueprint: React.FC = () => {
    const containerStyle: React.CSSProperties = {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#181818',
        backgroundImage: `
            radial-gradient(circle at 50% 50%, #2a2a2a 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 20%, transparent 80%, rgba(0,0,0,0.8))
        `,
        backgroundSize: '24px 24px, 100% 100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    };

    const paperStyle: React.CSSProperties = {
        width: '95%',
        maxWidth: '1400px',
        height: '92vh', // Tinggi aman
        backgroundColor: '#f2e8d5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 50px rgba(0,0,0,0.8)',
        border: '4px solid #3e2716',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', 
        gridTemplateRows: '60px 1fr 60px 110px', 
        gap: '15px',
        boxSizing: 'border-box'
    };

    const Zone = ({ id, label, span = false, color = 'rgba(92, 58, 33, 0.1)' }: any) => (
        <div style={{
            gridColumn: span ? '1 / -1' : 'auto',
            backgroundColor: color,
            border: '2px dashed #5c3a21',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#3e2716',
            textAlign: 'center',
            height: '100%', width: '100%',
            position: 'relative'
        }}>
            <span style={{ position: 'absolute', top: '2px', left: '5px', fontSize: '0.8rem', opacity: 0.5 }}>#{id}</span>
            <strong style={{ fontSize: '0.9rem' }}>{label}</strong>
        </div>
    );

    const ProjectCard = ({ num, isActive = false }: { num: number, isActive?: boolean }) => (
        <div style={{
            backgroundColor: isActive ? '#3e2716' : 'rgba(92, 58, 33, 0.1)', // Active = Gelap, Inactive = Transparan
            color: isActive ? '#e0c097' : '#3e2716',
            border: isActive ? '2px solid #e0c097' : '2px dashed #5c3a21',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: isActive ? '0 5px 15px rgba(0,0,0,0.3)' : 'none'
        }}>
            <span style={{ fontSize: '0.8rem', marginBottom: '4px' }}>PROJECT</span>
            <strong style={{ fontSize: '1.2rem' }}>0{num}</strong>
            {isActive && <span style={{ fontSize: '0.6rem', marginTop: '4px', color: '#4caf50' }}>● ACTIVE</span>}
        </div>
    );

    return (
        <section style={containerStyle}>
            <div style={paperStyle}>
                <Zone id="1" label="HEADER / TITLE" span={true} color="rgba(0,0,0,0.05)" />
                <Zone id="2" label="MEDIA PREVIEW (Slides)" color="rgba(65, 105, 225, 0.1)" />
                <Zone id="3" label="STORY DESCRIPTION (Slides)" color="rgba(92, 58, 33, 0.1)" />
                <Zone id="4" label="TECH STACK USED" span={true} color="rgba(220, 20, 60, 0.1)" />

                <div style={{ 
                    gridColumn: '1 / -1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '15px',
                        width: '90%',
                        height: '100%'
                    }}>
                        <ProjectCard num={1} isActive={true} />
                        <ProjectCard num={2} />
                        <ProjectCard num={3} />
                        <ProjectCard num={4} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JournalBlueprint;