import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Đảm bảo bạn đã cài plugin này

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dawng278.github.io/', // <--- RẤT QUAN TRỌNG: Thay your-repo-name bằng tên repository của bạn trên GitHub
  build: {
    outDir: 'dist', // Thư mục đầu ra mặc định của Vite, có thể không cần thay đổi
    rollupOptions: {
      output: {
        // Cấu hình để các tài nguyên có đường dẫn tương đối
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name]-[hash].js`,
        entryFileNames: `assets/[name]-[hash].js`,
      },
    },
  },
});