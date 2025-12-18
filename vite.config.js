import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2500, // Naikkan lagi limitnya
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // SATUKAN SEMUA: React + Three.js + Teman-temannya
            // Ini menjamin hooks seperti useLayoutEffect selalu ditemukan
            if (
              id.includes('react') || 
              id.includes('three') || 
              id.includes('@react-three') || 
              id.includes('postprocessing') ||
              id.includes('maath') ||
              id.includes('scheduler') // Penting untuk React internals
            ) {
              return 'vendor-main'; 
            }

            // Animasi boleh tetap dipisah karena biasanya mandiri
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animations';
            }
          }
        }
      }
    }
  }
})