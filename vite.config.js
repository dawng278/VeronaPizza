import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 👉 dùng base tương đối khi deploy trên Vercel
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name]-[hash].js`,
        entryFileNames: `assets/[name]-[hash].js`,
      },
    },
  },
});
