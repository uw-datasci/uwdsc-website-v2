/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'from-[#FFFFFF20]',
    'from-[#FFD700]',
    'from-[#A9A9A9]',
    'to-white',
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
      lightGreen: '#89C66D',
      pureWhite: '#FFFFFF',
      cxcGrey: '#332F39',
      cxcLightGrey: '#B1B1B1'
    },
    fontFamily: {
      sans: ['Satoshi-Variable', 'sans-serif'],
      display: ['ClashDisplay-Variable', 'sans-serif'],
      jersey: ['Jersey-10', 'sans-serif']
    },
    fontSize: {
      '2xs': '10px',
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
      '5xl': '36px',
      '6xl': '40px',
      '7xl': '44px',
      '8xl': '48px',
      '9xl': '52px',
      '10xl': '56px',
      '11xl': '60px',
      '12xl': '64px',
      '13xl': '68px',
      '14xl': '72px',
      '15xl': '76px',
      '16xl': '80px',
      '17xl': '84px',
      '18xl': '88px',
      '19xl': '92px',
      '20xl': '96px',
      '21xl': '100px',
      'responsive-big-title': 'clamp(80px, 8vw, 600px)',
      'responsive-title': 'clamp(30px, 8vw, 500px)',
      'responsive-subtitle': 'clamp(25px, 4vw, 45px)',
      'responsive-text': 'clamp(16px, 2vw, 30px)',
    },
    borderRadius: {
      none: '0',
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
      '5xl': '36px',
      '6xl': '40px',
      '7xl': '44px',
      '8xl': '48px',
      full: '9999px',
    },
    screens: {
      '3xs': '300px',
      '2xs': '360px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '840px',
      xl: '1024px',
      '2xl': '1280px',
      '3xl': '1400px',
      '4xl': '1600px',
      '5xl': '1800px',
    },
    extend: {
      spacing: {
        0.25: '1px',
        4.5: '18px',
        5.5: '22px',
        18: '72px',
      },
      keyframes: {
        typing: {
          '0%': {
            width: '0%',
            visibility: 'hidden'
          },
          '100%': {
            width: '100%'
          },
        },
        blink: {
          '50%': {
            borderColor: 'transparent'
          },
          '100%': {
            borderColor: 'white'
          }  
        },
        sparkle: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
            boxShadow: '0 0 5px 1px rgba(255, 255, 255, 0.8)',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.9',
            boxShadow: '0 0 10px 3px rgba(255, 255, 255, 0.5)',
          },
        },
        bounceY: {
          '0%, 100%': {
            transform: 'translateY(-10px)'
          },
          '50%': {
            transform: 'translateY(10px)'
          },
        },
        flicker: {
          '9%': {
            'text-shadow': '0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 1vh var(--lights)',
            filter: 'brightness(1)'
          },
          '10%':{
            'text-shadow': 'none',
            filter: 'brightness(.4)'
          },
          '11%':{
            'text-shadow': '0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 1vh var(--lights)',
            filter: 'brightness(1)'
          },
          '12%':{
            'text-shadow': 'none',
            filter: 'brightness(.4)'
          },
          '13%':{
            'text-shadow': '0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 1vh var(--lights)',
            filter: 'brightness(1)'
          },
          '66%':{
            'text-shadow': '0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 1vh var(--lights)',
            filter: 'brightness(1)'
          },
          '67%':{
            'text-shadow': 'none',
            filter: 'brightness(.4)'
          },
          '75%':{
            'text-shadow': 'none',
            filter: 'brightness(.4)'
          },
          '76%':{
            'text-shadow': '0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 .5vh var(--lights), 0 0 1vh var(--lights)',
            filter: 'brightness(1)'
          }
        }
      },
      animation: {
        typing: 'typing 1s steps(20) forwards, blink .9s infinite',
        'star-sparkle': 'sparkle 5s infinite',
        'slow-bounce': 'bounceY 5s infinite',
        'neon-lights': 'flicker 7s infinite'
      },
    },
  },
  plugins: [],
};
