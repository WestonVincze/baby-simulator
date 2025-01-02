import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $actions: path.resolve('./src/actions'),
      $ai: path.resolve('./src/ai'),
      $data: path.resolve('./src/data'),
      $icons: path.resolve('./src/icons'),
      $lib: path.resolve('./src/lib'),
      $scenes: path.resolve('./src/scenes'),
      $stores: path.resolve('./src/stores'),
      $types: path.resolve('./src/types'),
      $helpers: path.resolve('./src/helpers'),
    }
  }
})
