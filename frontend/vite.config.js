import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxImportSource: 'react', // React 19 compatible
      babel: {
        plugins: ['@babel/plugin-transform-react-jsx']
      }
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Disable for production
    chunkSizeWarningLimit: 1600, // Vercel can handle larger chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Optimized splitting for Vercel's CDN
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons'],
          vendor: ['tailwindcss']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  preview: {
    port: 4173,
    open: true
  }
})