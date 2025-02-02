import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $actions: path.resolve(__dirname, 'src/actions'),
      $ai: path.resolve(__dirname, 'src/ai'),
      $data: path.resolve(__dirname, 'src/data'),
      $icons: path.resolve(__dirname, 'src/icons'),
      $lib: path.resolve(__dirname, 'src/lib'),
      $scenes: path.resolve(__dirname, 'src/scenes'),
      $stores: path.resolve(__dirname, 'src/stores'),
      $types: path.resolve(__dirname, 'src/types'),
      $helpers: path.resolve(__dirname, 'src/helpers'),
    }
  }
})
