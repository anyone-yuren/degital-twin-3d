import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginCompression from 'vite-plugin-compression';
import { resolve } from 'path';

const baseUrl = 'digital-dist';

export default defineConfig((config) => {
  return {
    plugins: [
      react(),
      vitePluginCompression({
        threshold: 1024 * 10, // 对大于 10kb 的文件进行压缩
        // deleteOriginFile: true,
      }),
    ],
    resolve: {
      alias: {
        '@': `${resolve(process.cwd(), 'src')}`,
      },
    },
    server: {
      open: true,
      port: 9000,
      host: true,
      proxy: {
        '/api': {
          target: 'http://120.79.8.215:5980/api',
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // base: config.mode === 'development' ? '/' : `/${baseUrl}/`,
    base: `/degital-twin-3d/`,
    build: {
      outDir: `../../${baseUrl}`,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  };
});
