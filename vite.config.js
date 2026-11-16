import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seo from './seo/vite-plugin-seo.js'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), seo()],
})
