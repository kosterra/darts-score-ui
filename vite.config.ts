import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv('mock', process.cwd(), '')

  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    )
  }

  return {
    define: processEnvValues,
    server: {
      port: 3000,
      host: true,
      strictPort: true,
    },
    plugins: [react()]
  }
})
