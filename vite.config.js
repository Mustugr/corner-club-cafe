import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// During dev, forward /api/* to the local Express server (npm run server:dev).
// In production (Vercel), /api is served by api/index.js as a serverless function.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
    },
  },
})
