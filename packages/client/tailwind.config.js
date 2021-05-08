const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      mono: [
        'Roboto Mono',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      red: colors.red,
      gray: colors.gray,
      green: colors.emerald,
      orange: colors.orange,
    },
    extend: {
      colors: {
        blue: {
          bingo: '#1b2c98',
        },
        red: {
          bingo: '#fa3934',
        },
        gray: {
          bingo: '#aaaaaa',
        },
        green: {
          bingo: '#1a5e47',
        },
        orange: {
          bingo: '#fd9e28',
        },
      },
      backgroundImage: (theme) => ({
        'bingo-pattern-light': "url('/src/Assets/background-blur.png')",
      }),
    },
  },
  variants: {
    extend: {
      boxShadow: ['disabled'],
      textColor: ['disabled'],
      backgroundColor: ['even', 'active', 'disabled'],
      borderWidth: ['last'],
      opacity: ['dark', 'disabled'],
      backgroundImage: ['dark'],
      cursor: ['disabled'],
      translate: ['hover', 'active', 'disabled'],
    },
  },
  plugins: [],
};
