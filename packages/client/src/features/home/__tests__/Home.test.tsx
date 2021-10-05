import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../routes/Home';

it('loads and displays correctly', () => {
  render(<Home />, { wrapper: MemoryRouter });
  expect(screen.getByTestId('home-logo')).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /host/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: /play/i,
    })
  ).toBeInTheDocument();
});
