// import dependencies
import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../routes/Home';

it('loads and displays Play button', () => {
  render(<Home />, { wrapper: MemoryRouter });
  expect(screen.getByText('Play')).toBeInTheDocument();

  // TODO join button routes to /join
});
