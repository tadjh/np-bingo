import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'dark',
        value: 'rgb(24, 24, 27)',
      },
      {
        name: 'light',
        value: 'rgb(244, 244, 245)',
      },
    ],
  },
};
export const globalTypes = {
  darkMode: true,
};
