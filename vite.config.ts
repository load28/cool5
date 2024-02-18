import react from 'npm:@vitejs/plugin-react@4.2.1';
import { defineConfig } from 'vite';

import type {} from 'npm:@types/react@^18.2';
import 'npm:react-dom@^18.2/client';
import 'npm:react-router-dom@^6.4';
import 'npm:react@^18.2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
