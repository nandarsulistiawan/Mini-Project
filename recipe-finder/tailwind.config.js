/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'newBlack': '#253D4E',
        'brandPrimary': '#509E2F',
        'neutralDGray': '#4D4D4D'
      },
      fontFamily: {
        'Inter': ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
};
