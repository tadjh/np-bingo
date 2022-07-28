import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Solo } from '../routes/Solo';
import {
  BallContext,
  GameContext,
  initialBallContext,
  initialGameContext,
  initialUserContext,
  UserContext,
} from '../../../context';
import socket from '../../../lib/socket.io';
import userEvent from '@testing-library/user-event';
import { useApp, useAppState } from '../../../hooks';
import { act } from 'react-dom/test-utils';
import { READY_CHECK } from '../../../config/constants';

describe('Solo unit tests', () => {
  function SoloWithContext(): JSX.Element {
    const {
      state: { gamestate, pool, draws },
      dispatch,
    } = useAppState();
    const { newBall } = useApp(pool, draws);

    useEffect(() => {
      if (gamestate !== 'init') return;
      dispatch({ type: READY_CHECK });
    }, [gamestate, dispatch]);
    return (
      <UserContext.Provider value={{ ...initialUserContext, socket: socket }}>
        <GameContext.Provider
          value={{
            ...initialGameContext,
            gamemode: 'solo',
            gamestate,
            dispatch,
          }}
        >
          <BallContext.Provider value={{ ...initialBallContext, newBall }}>
            <Solo />
          </BallContext.Provider>
        </GameContext.Provider>
      </UserContext.Provider>
    );
  }

  it('loads and displays play status and start button', () => {
    act(() => {
      render(<SoloWithContext />, { wrapper: MemoryRouter });
    });
    expect(screen.getByText(/click start to begin\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bingo/i })).toBeDisabled();
  });

  it('handles start, pause, resume', () => {
    act(() => {
      render(<SoloWithContext />, { wrapper: MemoryRouter });
    });
    const bingoButton = screen.getByRole('button', { name: /bingo/i });
    const startButton = screen.getByRole('button', { name: /start/i });

    expect(screen.getByText(/click start to begin\./i)).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(bingoButton).toBeDisabled();

    userEvent.click(startButton);
    const pauseButton = screen.getByRole('button', { name: /pause/i });

    expect(
      screen.getByText(/click a number to cross it out\./i)
    ).toBeInTheDocument();
    expect(pauseButton).toBeInTheDocument();
    expect(bingoButton).toBeEnabled();

    userEvent.click(pauseButton);
    const resumeButton = screen.getByRole('button', { name: /resume/i });
    expect(screen.getByText(/game paused\./i)).toBeInTheDocument();
    expect(resumeButton).toBeInTheDocument();
    expect(bingoButton).toBeDisabled();

    userEvent.click(resumeButton);

    expect(
      screen.getByText(/click a number to cross it out\./i)
    ).toBeInTheDocument();
    expect(pauseButton).toBeInTheDocument();
    expect(bingoButton).toBeEnabled();
  });
});
