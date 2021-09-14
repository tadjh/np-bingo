import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Play from '../routes/Play';
import {
  BallContext,
  GameContext,
  initialBallContext,
  initialGameContext,
  initialRoomContext,
  initialUserContext,
  RoomContext,
  UserContext,
} from '../../../context';
import { READY_CHECK, START } from '../../../config/constants';
import { useAppState } from '../../../hooks';
import userEvent from '@testing-library/user-event';
import { Gamestate, Room } from '@np-bingo/types';
import socket from '../../../lib/socket.io';

interface PlayWithContextProps {
  gamestateOverride: Gamestate;
}
const room: Room = 'ABCD';

/**
 * Mock Component
 * @returns
 */
function PlayWithContext({
  gamestateOverride,
}: PlayWithContextProps): JSX.Element {
  const {
    state: { gamestate },
    dispatch,
  } = useAppState();

  useEffect(() => {
    switch (gamestateOverride) {
      case 'ready':
        dispatch({ type: READY_CHECK });
        break;
      case 'start':
        dispatch({ type: START });
        break;
      default:
        throw new Error('Invalid error in Play test');
    }
  }, [gamestateOverride, dispatch]);
  return (
    <UserContext.Provider value={{ ...initialUserContext, socket: socket() }}>
      <RoomContext.Provider value={{ ...initialRoomContext, room }}>
        <GameContext.Provider
          value={{
            ...initialGameContext,
            gamestate,
            dispatch,
          }}
        >
          <BallContext.Provider value={{ ...initialBallContext }}>
            <Play />
          </BallContext.Provider>
        </GameContext.Provider>
      </RoomContext.Provider>
    </UserContext.Provider>
  );
}

describe('Play unit tests', () => {
  it('handles player ready', () => {
    render(<PlayWithContext gamestateOverride="ready" />, {
      wrapper: MemoryRouter,
    });

    const bingoButton = screen.getByRole('button', { name: /bingo/i });
    const readyButton = screen.getByRole('button', { name: /ready/i });

    expect(
      screen.getByText(/click ready, then wait for host to begin\./i)
    ).toBeInTheDocument();
    expect(bingoButton).toBeDisabled();

    userEvent.click(readyButton);

    expect(readyButton).toBeDisabled();
    expect(
      screen.getByText(/waiting for host to dispense a ball\.\.\./i)
    ).toBeInTheDocument();
  });

  it('handles send card', () => {
    render(<PlayWithContext gamestateOverride="start" />, {
      wrapper: MemoryRouter,
    });

    const readyButton = screen.getByRole('button', { name: /ready/i });
    const bingoButton = screen.getByRole('button', { name: /bingo/i });

    expect(readyButton).toBeDisabled();
    expect(
      screen.getByText(/click a number to cross it out\./i)
    ).toBeInTheDocument();
    expect(bingoButton).toBeEnabled();

    userEvent.click(bingoButton);

    expect(screen.getByText(/sending card to host\.\.\./i)).toBeInTheDocument();
    expect(bingoButton).toBeDisabled();
  });
});
