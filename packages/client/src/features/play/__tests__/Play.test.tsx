// import dependencies
import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Play from '../routes/Play';
import {
  GameContext,
  initialGameContext,
  initialUserContext,
  UserContext,
} from '../../../context';
import socket from '../../../lib/socket.io';

it('loads and displays play status', () => {
  render(
    <UserContext.Provider value={{ ...initialUserContext, socket: socket() }}>
      <GameContext.Provider
        value={{ ...initialGameContext, gamestate: 'ready' }}
      >
        <Play />
      </GameContext.Provider>
    </UserContext.Provider>,
    { wrapper: MemoryRouter }
  );
  expect(
    screen.getByText(/click ready, then wait for host to begin\./i)
  ).toBeInTheDocument();
});
