import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  base: '/tootaapp/', // ➡️ Must match your repository name
  build: {
    outDir: 'dist', // ➡️ Explicitly set output directory
    emptyOutDir: true, // ➡️ Clear the directory before build
    sourcemap: false // ➡️ Disable sourcemaps for smaller build (optional)
  },
  server: {
    port: 3000, // ➡️ Set development server port (optional)
    open: true // ➡️ Automatically open browser (optional)
  }
})