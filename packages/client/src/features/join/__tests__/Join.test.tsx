import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Join from '../routes/Join';

it('loads and displays join header', () => {
  render(<Join />, { wrapper: MemoryRouter });
  const headerElement = screen.getByText(/join/i);
  expect(headerElement).toBeInTheDocument();
});
