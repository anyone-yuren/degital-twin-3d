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
    },
  };
});
