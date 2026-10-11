import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

import { seoAssetsPlugin } from './scripts/vite-plugin-seo.ts';

const DEFAULT_SITE_URL = 'https://bujosaclima.com.br';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      seoAssetsPlugin({
        siteUrl,
        whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      assetsInlineLimit: 2048,
    },
    test: {
      environment: 'node',
      include: ['src/**/*.test.ts'],
    },
  };
});
