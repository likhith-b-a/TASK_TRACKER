import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // Default for Vite, ensures correct deployment
  },
  plugins: [react()],
})
