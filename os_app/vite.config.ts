import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/empresa': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/cliente': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/os': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
