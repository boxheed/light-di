import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'], // Output text and HTML reports
      exclude: ['examples/**', 'dist', '**/*.ts'], // Exclude the examples dist and typescript files
    },
  },
});
