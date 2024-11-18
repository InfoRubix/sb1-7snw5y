/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Century Gothic"', 'CenturyGothic', 'AppleGothic', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#000000',
          light: '#262626',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#FFD700',
          light: '#FFEB3B',
          dark: '#FFC107',
        },
      },
    },
  },
  plugins: [],
};