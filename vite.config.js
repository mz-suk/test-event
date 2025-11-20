import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
    viteSingleFile({
      useRecommendedBuildConfig: false,
      removeViteModuleLoader: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 100000000, // 100MB 이하 파일은 전부 인라인 (사실상 모든 이미지 인라인)
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false, // CSS 분리 안 함
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
