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
          if (id.includes('node_modules')) {
            
            // 1. PISAHKAN THREE.JS & TEMAN-TEMANNYA 
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-bundle';
            }

            // 2. Deteksi Framer Motion (Kalau ada)
            if (id.includes('framer-motion')) {
              return 'animations';
            }
          }
        }
      }
    }
  }
})