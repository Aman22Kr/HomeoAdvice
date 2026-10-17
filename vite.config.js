import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base ('./') + HashRouter => works under ANY repository name
// (https://<user>.github.io/<repo>/) with no changes and no 404 on refresh.
// Override with VITE_BASE=/my-repo/ at build time if you prefer absolute paths.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
});
