import React from 'react';

interface PortalTransitionProps {
  isZooming: boolean;
}

const PortalTransition: React.FC<PortalTransitionProps> = ({ isZooming }) => {
  return (
    <>
      <style>
        {`
          /* Animasi "Wavy" / Gelombang Mabuk */
          @keyframes liquid-sway {
            0% { 
              transform: scale(1.1) rotate(0deg); 
              filter: blur(0px) hue-rotate(0deg);
            }
            33% { 
              transform: scale(1.2) rotate(3deg); 
              filter: blur(4px) hue-rotate(15deg);
            }
            66% { 
              transform: scale(1.15) rotate(-3deg); 
              filter: blur(2px) hue-rotate(-15deg);
            }
            100% { 
              transform: scale(1.1) rotate(0deg); 
              filter: blur(0px) hue-rotate(0deg);
            }
          }

          .video-overlay-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 999;
            overflow: hidden;
            background: black; 
            
            /* Kontrol visibilitas */
            opacity: ${isZooming ? 1 : 0};
            /* 
               Entry (isZooming=true): Delay 1.5s biar kamera nyampe dulu, baru fade cepet 0.5s 
               Exit (isZooming=false): Langsung fade out pelan 1s 
            */
            transition: opacity ${isZooming ? '0.5s ease-out 1.5s' : '1s ease-in'}; 
          }

          .portal-video {
            /* Wajib lebih besar dari 100% biar pas miring pinggirnya gak bocor */
            width: 120%;
            height: 120%;
            
            position: absolute;
            top: -10%;
            left: -10%;
            
            object-fit: cover;
            
            /* Animasi smooth (infinite loop) */
            animation: liquid-sway 6s ease-in-out infinite;
            
            /* HAPUS baris mix-blend-mode ini kalau videomu tidak transparan/hitam */
            mix-blend-mode: screen; 
          }
        `}
      </style>

      <div className="video-overlay-container">
        <video
          className="portal-video"
          src="/transition.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </>
  );
};

export default PortalTransition;
