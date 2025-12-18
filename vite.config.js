import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            
            // STRATEGI: Satukan semua library yang punya ketergantungan internal Three.js
            // Jika dipisah, akan muncul error "Cannot access before initialization"
            if (
              id.includes('three') || 
              id.includes('@react-three') || 
              id.includes('postprocessing') ||
              id.includes('maath')
            ) {
              return 'vendor-3d-all'; // SATUKAN LAGI UNTUK STABILITAS
            }

            // Animasi tetap dipisah tidak apa-apa
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animations';
            }
            
            // React Core
            if (id.includes('react')) {
              return 'vendor-react';
            }
          }
        }
      }
    }
  }
})