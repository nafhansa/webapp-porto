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
            // 1. CORE: Library dasar yang dibutuhkan di mana saja
            if (id.includes('react') || id.includes('@react-three/fiber') || id.includes('three/src')) {
              return 'vendor-core';
            }

            // 2. NETHER: Library yang HANYA ada di NetherPortalScene
            // Memindahkan ini ke chunk sendiri akan menghilangkan 'unused JS' di Hero
            if (id.includes('postprocessing') || id.includes('maath')) {
              return 'vendor-nether-heavy';
            }

            // 3. DREI & UTILS: Sering dipakai di Hero dan section lain
            if (id.includes('@react-three/drei')) {
              return 'vendor-drei';
            }

            // 4. ANIMATIONS
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animations';
            }
          }
        }
      }
    }
  }
})