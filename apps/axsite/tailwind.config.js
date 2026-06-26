/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        muted: {
          DEFAULT: 'rgb(241 245 249)',
          foreground: 'rgb(100 116 139)',
        },
        background: 'rgb(255 255 255)',
        foreground: 'rgb(15 23 42)',
        ring: 'rgb(59 130 246)',
      },
    },
  },
  plugins: [],
};