import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

const base = resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(base, 'assets'),
      '@components': path.resolve(base, 'components'),
      '@context': path.resolve(base, 'context'),
      '@hooks': path.resolve(base, 'hooks'),
      '@loaders': path.resolve(base, 'loaders'),
      '@pages': path.resolve(base, 'pages'),
      '@routes': path.resolve(base, 'routes'),
      '@services': path.resolve(base, 'services'),
      '@styles': path.resolve(base, 'styles'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/test-setup.ts',
  },
});
