import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()] as any,
  server: {
    hmr: {
      overlay: false
    }
  }
})