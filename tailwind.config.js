/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'calligraphy': ['"Great Vibes"', 'cursive'],
        'serif': ['"Cormorant Garamond"', 'serif'],
        'sans': ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        'paper-beige': '#dcd7ce',
        'paper-white': '#fdfcfb',
        'ink': '#2c2c2c',
      }
    },
  },
  plugins: [],
}