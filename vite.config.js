import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: true,
      strictPort: true,
    },
    plugins: [react()]
  }
})
