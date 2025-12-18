import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // JANGAN pisahkan react atau react-dom ke chunk lain!
          if (id.includes('node_modules')) {
            
            // 1. Pisahkan Three.js & kawan-kawan (Tanpa React)
            if (
              id.includes('three') || 
              id.includes('@react-three') || 
              id.includes('maath')
            ) {
              return 'three-bundle';
            }

            // 2. Pisahkan Postprocessing
            if (id.includes('postprocessing')) {
              return 'postprocessing-bundle';
            }

            // 3. Animasi
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'animations';
            }
          }
        }
      }
    }
  }
})