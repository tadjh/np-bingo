// import dependencies
import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from '../routes/Home';

it('loads and displays logo', () => {
  render(<Home />, { wrapper: MemoryRouter });
  const logoElement = screen.getByTestId(/home-logo/i);
  expect(logoElement).toBeInTheDocument();
});
