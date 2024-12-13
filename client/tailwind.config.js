/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '900px',
      'lg': '1180px',
      'xl': '1550px',
      '2xl': '1700px',
    },
  },
  plugins: [],
}