// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    reporters: 'tap-flat',
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
    include: ['src/__tests__/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})