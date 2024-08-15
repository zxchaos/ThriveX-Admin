import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts';
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts()],
  // 配置快捷路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, 'src')
    },
  },
  // 配置scss样式自动引入
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/var.scss";`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://openapi.baidu.com/', // 你的后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
