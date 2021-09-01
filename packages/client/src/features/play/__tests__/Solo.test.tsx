// import dependencies
import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Solo } from '../routes/Solo';
import { initialUserContext, UserContext } from '../../../context';
import socket from '../../../lib/socket.io';

it('loads and displays play status', () => {
  render(
    <UserContext.Provider value={{ ...initialUserContext, socket: socket() }}>
      <Solo />
    </UserContext.Provider>,
    { wrapper: MemoryRouter }
  );
  const statusElement = screen.getByTestId(/play-status/i);
  expect(statusElement).toBeInTheDocument();
});
