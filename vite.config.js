import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, 
    // AKTIFKAN INI: Menginstruksikan Vite untuk membuat tag preload otomatis
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. PISAHKAN THREE.JS & TEMAN-TEMANNYA 
            // Tambahkan @react-spring atau library math jika ada agar masuk ke bundle yang sama
            if (
              id.includes('three') || 
              id.includes('@react-three') || 
              id.includes('maath') || 
              id.includes('postprocessing')
            ) {
              return 'three-bundle';
            }

            // 2. Deteksi Framer Motion / GSAP
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'animations';
            }
          }
        }
      }
    }
  }
})