import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Naikkan batas peringatan size (opsional, biar terminal gak cerewet)
    chunkSizeWarningLimit: 1000, 
    
    rollupOptions: {
      output: {
        // 2. INI BAGIAN PENTINGNYA (Manual Chunks)
        manualChunks: {
          // A. Pisahkan React Core (wajib load duluan)
          vendor: ['react', 'react-dom', 'react-router-dom'],
          
          // B. Pisahkan Three.js & Teman-temannya (paling berat)
          // Jadi kalau user buka web, file ini didownload terpisah secara paralel
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          
          // C. Pisahkan Framer Motion (kalau pakai animasi berat)
          animations: ['framer-motion']
        }
      }
    }
  }
})