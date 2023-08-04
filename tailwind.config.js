/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#000211',
      white: '#FBF3FF',
      grey1: '#BBBABA',
      grey2: '#989898',
      grey3: '#454545',
      grey4: '#1E1E1E',
      pink: '#E801BE',
      blue: '#334FE8',
      red: '#D28686',
      green: '#76CE7A',
      transparent: 'transparent',
    },
  },
  plugins: [],
};
