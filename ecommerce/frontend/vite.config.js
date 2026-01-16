import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default defineConfig({
    plugins: [react(), tailwindcss()],

  // ... other config
  resolve: {
    alias: {
      // Manually map the missing specifier to the actual file location
      'react-phone-number-input/index.css': 'react-phone-number-input/style.css',
    },
  },
});

