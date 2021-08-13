import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import {
  Action,
  Card,
  Results,
  Winner,
  Gamemode,
  Ball as BallType,
  Player,
  Kicked,
} from '@np-bingo/types';
import {
  BallContext,
  FeautresContext,
  GameContext,
  ThemeContext,
} from '../../Utils/contexts';
import {
  BINGO,
  INIT_CROSSMARKS,
  INIT_GAME,
  NEW_CARD,
  UPDATE_CROSSMARKS,
  WINNER_CROSSMARKS,
} from '../../Constants';
import Ball from '../../Components/Ball';
import Board from '../../Components/Board';
import StatusMessage from '../../Components/Status';
import { newCard, winningCells } from '../../Utils/bingo';
import Button from '../../Components/Button';
import Footer from '../../Components/Footer';
import Link from '../../Components/Link';
import {
  initialState,
  PlayerState,
  reducer,
} from '../../Reducers/play.reducer';
import { initialState as appState } from '../../Reducers/app.reducer';
import Main from '../../Components/Main';
import Header from '../../Components/Header';
import Widgets from '../../Components/Widgets';
import useProgress from '../../Utils/useProgress';
import socket from '../../Config/socket.io';
import useSound from 'use-sound';
import dispenseSfx from '../../Assets/Sounds/Ball_Dispenser.mp3';
import winnerSfx from '../../Assets/Sounds/Bingo_Theme_by_Tadjh_Brooks.mp3';
import loseSfx from '../../Assets/Sounds/Denied.mp3';
import { randomNumber } from '../../Utils';
import confetti from 'canvas-confetti';
import KickedModal from '../../Components/KickedModal';

export interface PlayProps {
  checkCard?: () => void;
  newBall: () => BallType;
  sendCard?: (card: Card, user?: Player) => void;
  winner?: Winner;
  kicked?: Kicked;
}

export default function Play({
  checkCard,
  newBall,
  sendCard,
  winner = { ...appState.winner },
  kicked = { status: false, reason: 'none' },
}: PlayProps) {
  const [playState, playDispatch] = useReducer<
    (state: PlayerState, action: Action) => PlayerState
  >(reducer, initialState);
  const { sounds } = useContext(ThemeContext);
  const { gamestate, gamemode, room, host, user, play } = useContext(
    GameContext
  );
  const ball = useContext(BallContext);
  const { ballDelay, allowNewCard, defaultVolume } = useContext(
    FeautresContext
  );
  const { card, serial, crossmarks } = playState;

  const [playSfx] = useSound(dispenseSfx, {
    volume: defaultVolume,
    sprite: {
      dispenseBall1: [0, 2000],
      dispenseBall2: [250, 1750],
      dispenseBall3: [2000, 2000],
      dispenseBall4: [2250, 1750],
    },
    soundEnabled: sounds,
  });
  const [playWinSfx] = useSound(winnerSfx, {
    volume: defaultVolume,
    soundEnabled: sounds,
  });

  const [playLoseSfx] = useSound(loseSfx, {
    volume: defaultVolume,
    soundEnabled: sounds,
  });

  /**
   * Loop ball animation and call newBall each completion
   * @returns When ball number is 0
   */
  const onProgressDone = () => {
    const brandNewBall = newBall();
    if (brandNewBall.number === 0) return play('end');

    if (gamestate === 'start') {
      enableProgress();
      playSfx({ id: `dispenseBall${randomNumber(2)}` });
    }
  };
  const { progress, inProgress, enableProgress, pauseProgress } = useProgress(
    ballDelay,
    onProgressDone
  );

  /**
   * Creates a new card and stores it in state
   */
  const getCard = useCallback(() => {
    const [card, serial] = newCard(BINGO);
    playDispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
    clearCrossmarks();
  }, []);

  /**
   * Show confetti on the screen
   */
  const confettiAnimation = useCallback(() => {
    const duration = 15000 / 2; // theme song is 15 seconds
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      // keep going until we are out of time
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  /**
   * Handles win
   */
  const handleWin = useCallback(() => {
    if (winner.methods.length <= 0) return;
    setWinningCrossmarks(winner.results);
    playWinSfx();
    confettiAnimation();
  }, [confettiAnimation, playWinSfx, winner.methods.length, winner.results]);

  /**
   * Handles lose
   */
  const handleLose = useCallback(() => {
    playLoseSfx();
  }, [playLoseSfx]);

  /**
   * Sync Play gamestate with App gamestate
   */
  useEffect(() => {
    // Syncing Player View with Host Game State.
    if (gamestate === 'init') {
      playDispatch({ type: INIT_GAME });
      play('ready');
    }
    if (gamestate === 'ready') {
      getCard();
    }
  }, [gamestate, getCard, play]);

  /**
   * Multiplayer Side-effects
   */
  useEffect(() => {
    if (gamemode === 'solo') return;
    switch (gamestate) {
      case 'standby':
        socket.emit('ready-up', host.socket, user);
        break;
      case 'validate':
        socket.emit('send-card', room, host.socket, user, card);
        break;
      case 'win':
        handleWin();
        break;
      case 'failure':
        handleLose();
        break;
      default:
        break;
    }
  }, [
    gamestate,
    gamemode,
    card,
    host.socket,
    room,
    user,
    handleWin,
    handleLose,
  ]);

  /**
   * Solo side-effects
   */
  useEffect(() => {
    if (gamemode !== 'solo') return;
    switch (gamestate) {
      case 'start':
        enableProgress();
        break;
      case 'validate':
        // TODO pauseProgress();
        checkCard && checkCard();
        break;
      case 'pause':
        pauseProgress();
        break;
      case 'win':
        handleWin();
        break;
      case 'failure':
        handleLose();
        break;
      default:
        break;
    }
  }, [
    gamemode,
    gamestate,
    enableProgress,
    pauseProgress,
    checkCard,
    handleLose,
    handleWin,
  ]);

  /**
   * Toggle current target's crossmark visibility
   * @param event Click event
   */
  const toggleCrossmark = (event: React.MouseEvent) => {
    let target = event.target as HTMLDivElement;
    let value = playState.crossmarks[target.id];
    let crossmark = { [target.id]: !value };
    playDispatch({ type: UPDATE_CROSSMARKS, payload: crossmark });
  };

  /**
   * Resets all crossmarks
   */
  const clearCrossmarks = () => {
    playDispatch({ type: INIT_CROSSMARKS, payload: {} });
  };

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   */
  const setWinningCrossmarks = (results: Results) => {
    const winningCrossmarks = winningCells(results);
    playDispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
  };

  /**
   * Sets gamestate to standby in default, start in solo mode, or pause when solo is already started
   */
  const handlePrimaryButton = () => {
    if (gamemode === 'solo' && gamestate === 'start') return play('pause');
    if (gamemode === 'solo') return play('start');
    // default
    return play('standby');
  };

  /**
   * Text to display on primary button
   * @returns String
   */
  const primaryButtonText = (): string => {
    if (gamemode !== 'solo') return 'Ready';
    // solo
    if (gamestate === 'pause' || gamestate === 'failure') return 'Resume';
    if (gamestate === 'start') return 'Pause';
    return 'Start';
  };

  /**
   * Disables primary button except once ready, solo start, solo pause, or solo failure
   * @returns boolean
   */
  const disablePrimaryButton = (): boolean => {
    // default
    if (gamestate === 'ready') return false;
    if (gamemode !== 'solo') return true;
    // solo
    if (gamestate === 'start') return false;
    if (gamestate === 'pause') return false;
    if (gamestate === 'failure') return false;
    return true;
  };

  /**
   * Wrapper function for sendCard
   * @param mode
   * @param card
   * @param room
   * @param host
   * @returns
   */
  const handleSendCard = (gamemode: Gamemode, card: Card, user: Player) => {
    if (gamemode === 'solo') sendCard && sendCard(card, user);
    // default & solo
    play('validate');
  };

  /**
   * Send leave event to room
   */
  const leaveRoom = (gamemode: Gamemode) => {
    if (gamemode === 'solo') return;
    socket.emit('leave-room', room, host.socket, user);
  };

  return (
    <React.Fragment>
      <Header className="gap-3">
        {allowNewCard && (
          <Button disabled={gamestate !== 'ready' && true} onClick={getCard}>
            New Card
          </Button>
        )}
        <Button
          variant="contained"
          disabled={disablePrimaryButton()}
          onClick={handlePrimaryButton}
          className="w-[115px]"
        >
          {primaryButtonText()}
        </Button>
        <Button
          variant="contained"
          disabled={gamestate !== 'start' && true}
          onClick={() => handleSendCard(gamemode, card, user)}
        >
          Bingo
        </Button>
      </Header>
      <Main className="flex-1 gap-y-4">
        <StatusMessage gamestate={gamestate} mode={gamemode} />
        <Ball
          number={ball.number}
          column={ball.column}
          remainder={ball.remainder}
          inProgress={inProgress}
          progress={progress}
          disabled={gamestate !== 'start' && gamestate !== 'failure' && true}
        />
        <Board
          card={[...card]}
          serial={serial}
          winner={winner.methods.length > 0 && true}
          crossmarks={crossmarks}
          onClick={toggleCrossmark}
        />
      </Main>
      <Footer className="gap-3">
        <Widgets variant={gamemode} room={room} />
        <Link
          className="hover:underline"
          onClick={() => leaveRoom(gamemode)}
          to="/"
        >
          Leave Room
        </Link>
      </Footer>
      <KickedModal open={kicked.status} reason={kicked.reason} />
    </React.Fragment>
  );
}
