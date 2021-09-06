import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// TODO write test?
it.skip('renders home by default', () => {
  render(<App />, { wrapper: MemoryRouter });
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByTestId('home-logo')).toBeInTheDocument();
});
