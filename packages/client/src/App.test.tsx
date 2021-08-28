import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// TODO write test?
it.skip('renders home by default', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
