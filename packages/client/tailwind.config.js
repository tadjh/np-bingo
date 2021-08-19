const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
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
        'bingo-light': "url('/src/assets//img/bg-tranparent-light.svg')",
        'bingo-dark': "url('/src/assets/img/bg-tranparent-dark.svg')",
        'gradient-radial':
          'radial-gradient(circle at 25% 25%, var(--tw-gradient-stops))',
      }),
      width: {
        23.5: '5.875rem',
      },
      height: {
        23.5: '5.875rem',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '50%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
      },
      animation: {
        bounce: 'bounce 1500ms infinite',
      },
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
