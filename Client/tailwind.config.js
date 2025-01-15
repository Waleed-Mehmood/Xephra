/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '14': '3.5rem',
      },
      width: {
        '22': '6rem',
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        oldStandard: ['Old Standard TT', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },

    },
  },
  plugins: [],
}

