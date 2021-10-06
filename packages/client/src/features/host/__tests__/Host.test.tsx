import { useEffect } from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Host from '../routes/Host';
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
import socket from '../../../lib/socket.io';
import { READY_CHECK, START } from '../../../config/constants';
import { useApp, useAppState } from '../../../hooks';
import { Gamestate, Room } from '@np-bingo/types';
import userEvent from '@testing-library/user-event';

interface HostWithContextProps {
  gamestateOverride: Gamestate;
}
const room: Room = 'ABCD';

/**
 * Mock Component
 * @returns
 */
function HostWithContext({
  gamestateOverride,
}: HostWithContextProps): JSX.Element {
  const {
    state: { gamestate, pool, draws },
    dispatch,
  } = useAppState();
  const { newBall } = useApp(pool, draws);

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
          <BallContext.Provider value={{ ...initialBallContext, newBall }}>
            <Host draws={[]} />
          </BallContext.Provider>
        </GameContext.Provider>
      </RoomContext.Provider>
    </UserContext.Provider>
  );
}

describe('Host unit tests', () => {
  it('handles primary button', () => {
    render(<HostWithContext gamestateOverride="ready" />, {
      wrapper: MemoryRouter,
    });
    const startButton = screen.getByRole('button', { name: /start/i });
    expect(
      screen.getByText(/waiting for player\(s\) to join\.\.\./i)
    ).toBeInTheDocument();
    expect(startButton).toBeEnabled();
    expect(screen.getByRole('button', { name: /validate/i })).toBeDisabled();

    userEvent.click(startButton);

    const endButton = screen.getByRole('button', { name: /end/i });
    expect(
      screen.getByText(/click "\+" to dispense a ball\./i)
    ).toBeInTheDocument();
    expect(endButton).toBeInTheDocument();

    userEvent.click(endButton);

    expect(screen.getByText(/game over!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /replay/i })).toBeInTheDocument();
  });

  it('draws a new ball', () => {
    render(<HostWithContext gamestateOverride="start" />, {
      wrapper: MemoryRouter,
    });
    const main = screen.getByRole('main');
    const ballButton = within(main).getByRole('button');

    userEvent.click(ballButton);

    expect(
      screen.getByText(/call out the ball, then dispense another/i)
    ).toBeInTheDocument();
  });
});
