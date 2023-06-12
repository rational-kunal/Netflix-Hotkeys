import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'

import manifest from './src/manifest.js'
import { config } from './src/read_pages_folder.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        input: config,
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
      minify: 'esbuild',
    },

    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    plugins: [crx({ manifest }), react()],
  }
})
