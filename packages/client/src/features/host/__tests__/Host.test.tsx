// import dependencies
import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Host from '../routes/Host';
import { initialUserContext, UserContext } from '../../../context';
import socket from '../../../lib/socket.io';

it('loads and displays waiting', () => {
  render(
    <UserContext.Provider value={{ ...initialUserContext, socket: socket() }}>
      <Host draws={[]} />
    </UserContext.Provider>,
    { wrapper: MemoryRouter }
  );
  const statusElement = screen.getByTestId(/host-status/i);
  expect(statusElement).toBeInTheDocument();
});
