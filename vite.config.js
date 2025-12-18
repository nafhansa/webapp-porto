import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // Kita naikkan limitnya karena bundle 3D pasti besar
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            
            // SATUKAN SEMUA GRAFIS (Three, Fiber, Drei, Postprocessing)
            // Ini mencegah error "Cannot access before initialization"
            if (
              id.includes('three') || 
              id.includes('@react-three') || 
              id.includes('postprocessing') || 
              id.includes('maath')
            ) {
              return 'vendor-3d'; 
            }

            // Animasi (Framer Motion / GSAP) boleh dipisah karena mereka mandiri
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animations';
            }
          }
        }
      }
    }
  }
})