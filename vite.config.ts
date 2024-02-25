import { defineConfig } from 'vite';
import react from 'vite-react-plugin';

import 'https://esm.sh/react-dom@18.2.0/client';
import 'https://esm.sh/react-router-dom@6.4.5';
import 'https://esm.sh/react@18.2.0';
import type {} from 'https://esm.sh/v135/@types/react@18.2.38/index.d.ts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
