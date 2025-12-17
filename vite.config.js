import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        // GANTI BAGIAN manualChunks JADI FUNCTION SEPERTI INI:
        manualChunks(id) {
          // Cek apakah file ini berasal dari folder node_modules (library luar)
          if (id.includes('node_modules')) {
            
            // 1. Deteksi Three.js, React Three Fiber, Drei
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-bundle'; // Gabung jadi satu file bernama three-bundle.js
            }

            // 2. Deteksi React & Router
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react'; // Gabung jadi vendor-react.js
            }

            // 3. (Opsional) Deteksi Framer Motion HANYA jika ada
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            
            // Sisanya biarkan Vite yang atur (atau masuk ke file utama yang kecil)
          }
        }
      }
    }
  }
})