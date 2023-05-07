import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: __dirname,
  plugins: [dynamicImportVars({
    include: ['src/asses/**/*'],
  }), vue()],
  build: {
    sourcemap: false,
  },
  assetsInclude: ['src/assets/**/*'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/_normalize.scss";
          @import "@/assets/_global.scss";
          @import "@/assets/_variables.scss";
          @import "@/assets/_mixins.scss";
        `,
      },
    },
  },
});
