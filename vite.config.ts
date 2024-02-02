import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

const timestamp = new Date().getTime()
// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
      manifest: false,
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash]-${timestamp}.js`,
          chunkFileNames: `assets/[name]-[hash]-${timestamp}.js`,
          assetFileNames: `assets/[ext]/[name]-[hash]-${timestamp}.[ext]`
        }
      }
  },
  server: {
      host: '0.0.0.0',
      https: false,
      port: Number(loadEnv(mode, process.cwd()).VITE_PORT) || 5173,
      proxy: {
        // 接口地址代理
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API_PROXY_URL,
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/')
        },
        // ... 更多地址继续加
      }
    },
})
