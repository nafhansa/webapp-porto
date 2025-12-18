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
          // Pisahkan Bloom & EffectComposer karena hanya dipakai di Nether
          if (id.includes('@react-three/postprocessing') || id.includes('postprocessing')) {
            return 'postprocessing-bundle';
          }
          // Sisanya tetap di three-bundle
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-bundle';
          }
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'animations';
          }
        }
      }
      }
    }
  }
})