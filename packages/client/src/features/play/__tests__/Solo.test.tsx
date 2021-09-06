// import dependencies
import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Solo } from '../routes/Solo';
import {
  GameContext,
  initialGameContext,
  initialUserContext,
  UserContext,
} from '../../../context';
import socket from '../../../lib/socket.io';

const SoloWithContext = () => (
  <UserContext.Provider value={{ ...initialUserContext, socket: socket() }}>
    <GameContext.Provider
      value={{ ...initialGameContext, gamemode: 'solo', gamestate: 'ready' }}
    >
      <Solo />
    </GameContext.Provider>
  </UserContext.Provider>
);

it('loads and displays play status and start button', () => {
  render(<SoloWithContext />, { wrapper: MemoryRouter });
  expect(screen.getByText(/click start to begin\./i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /bingo/i })).toBeDisabled();
});
