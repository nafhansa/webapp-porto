import React from 'react';

const MapNav: React.FC = () => {
    const handleClick = () => {
        window.location.href = '/story';
    };

    return (
        <div
            onClick={handleClick}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8B4513 0%, #6B3410 100%)',
                border: '3px solid #4e270a',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)';
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
            }}
        >
            {/* Map icon SVG */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3))' }}
            >
                <path
                    d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z"
                    stroke="#FFD700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgba(255, 215, 0, 0.1)"
                />
                <path
                    d="M9 3V18M15 6V21"
                    stroke="#FFD700"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="2" fill="#FFD700" />
            </svg>
        </div>
    );
};

export default MapNav;
