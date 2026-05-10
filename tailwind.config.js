/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#c9a44c',
        'brand-dark': '#111111',
        'brand-muted': '#444444',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        'brand-wide': '8px',
        'brand-normal': '4px',
      }
    },
  },
  plugins: [],
}
