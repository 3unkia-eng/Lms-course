import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built prototype also opens from any static folder.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5173, open: true },
});
