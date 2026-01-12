/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F3D6C6',
        secondary: '#5F8F7E',
        background: '#FAF7F5',
        text: '#1F1F1F',
        muted: '#8A8A8A',
      },
      fontFamily: {
        title: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
