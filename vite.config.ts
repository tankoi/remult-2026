import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: { 
    proxy: { 
      "/api": "http://localhost:3002" 
    } 
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Remult entities use legacy TypeScript decorators. Vite 8 transforms with Oxc,
  // not esbuild, so the old `esbuild.tsconfigRaw` option here had no effect.
  oxc: {
    decorator: {
      legacy: true,
    },
  },
})
