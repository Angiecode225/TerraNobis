/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#113721',
        accent: '#88D945',
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
};
