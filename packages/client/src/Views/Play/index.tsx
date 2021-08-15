import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  Action,
  Card,
  Results,
  Winner,
  Gamemode,
  Ball as BallType,
  Player,
  Kicked,
  Gamestate,
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
} from '../../config/constants';
import Ball from '../../components/Ball';
import Board from '../../components/Board';
import StatusMessage from '../../components/Status';
import { newCard, winningCells } from '../../Utils/bingo';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Link from '../../components/Link';
import {
  initialState,
  PlayerState,
  reducer,
} from '../../Reducers/play.reducer';
import { initialState as appState } from '../../Reducers/app.reducer';
import Main from '../../components/Main';
import Header from '../../components/Header';
import Widgets from '../../components/Widgets';
import useProgress from '../../Utils/useProgress';
import socket from '../../config/socket.io';
import useSound from 'use-sound';
import dispenseSfx from '../../Assets/Sounds/Ball_Dispenser.mp3';
import winnerSfx from '../../Assets/Sounds/Bingo_Theme_by_Tadjh_Brooks.mp3';
import loseSfx from '../../Assets/Sounds/Denied.mp3';
import { logger, randomNumber } from '../../Utils';
import KickedModal from '../../components/KickedModal';
import Confetti from '../../components/Confetti';
import { useQuery } from '../../Utils/custom-hooks';
import {
  disableBallDisplay,
  disablePrimaryButton,
  primaryButtonText,
} from './common.play';

export interface PlayProps {
  checkCard?: () => boolean;
  newBall: () => BallType;
  sendCard?: (card: Card, user?: Player) => void;
  winner?: Winner;
  kicked?: Kicked;
  solo?: () => void;
}

export default function Play({
  checkCard,
  newBall,
  sendCard,
  winner = { ...appState.winner },
  kicked = { status: false, reason: 'none' },
  solo,
}: PlayProps) {
  const query = useQuery();
  const queryMode = useRef(query.get('m'));
  const [playState, playDispatch] = useReducer<
    (state: PlayerState, action: Action) => PlayerState
  >(reducer, initialState);
  const { sounds } = useContext(ThemeContext);
  const { gamestate, gamemode, room, host, user, play } =
    useContext(GameContext);
  const ball = useContext(BallContext);
  const { ballDelay, allowNewCard, defaultVolume } =
    useContext(FeautresContext);
  const { card, serial, crossmarks } = playState;
  const [confetti, setConfetti] = useState(false);
  // const [replay, setReplay] = useState(false);

  const [playDispenseSfx] = useSound(dispenseSfx, {
    volume: defaultVolume,
    sprite: {
      dispenseBall1: [0, 2000],
      dispenseBall2: [250, 1750],
      dispenseBall3: [2000, 2000],
      dispenseBall4: [2250, 1750],
    },
    soundEnabled: sounds,
  });
  const [playWinSfx, playWinSfxData] = useSound(winnerSfx, {
    volume: defaultVolume,
    soundEnabled: sounds,
  });

  const [playLoseSfx] = useSound(loseSfx, {
    volume: defaultVolume,
    soundEnabled: sounds,
  });

  /**
   * Loop ball animation and trigger newBall in solo mode
   * @returns When ball number is 0
   */
  const onProgressDone = () => {
    if (ball.remainder === 0) return play('end');
    if (gamemode === 'solo' && gamestate === 'start') return triggerBall();
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
   * New Ball w/ Side Effects
   */
  const triggerBall = () => {
    newBall();
    triggerBallEffects();
  };

  /**
   * Ball side effects
   */
  const triggerBallEffects = useCallback(() => {
    playDispenseSfx({ id: `dispenseBall${randomNumber(2)}` });
    enableProgress();
  }, [playDispenseSfx, enableProgress]);

  /**
   * Sets gamestate based on gamestate
   */
  const handlePrimaryButton = (gamemode: Gamemode, gamestate: Gamestate) => {
    if (gamemode === 'solo') return soloHandlePrimaryButton(gamestate);
    return play('standby');
  };

  /**
   * Solo handle primary button
   * @param gamestate
   * @returns
   */
  const soloHandlePrimaryButton = (gamestate: Gamestate) => {
    switch (gamestate) {
      case 'start':
        play('pause');
        break;
      case 'ready':
        triggerBall();
        play('start');
        break;
      case 'end':
        playWinSfxData.stop();
        play('init');
        solo && solo();
        break;
      default:
        play('start');
        enableProgress();
        break;
    }
  };

  /**
   * Wrapper function for sendCard
   * @param gamemode
   * @param card
   * @param user
   * @returns
   */
  const handleSendCard = (gamemode: Gamemode, card: Card, user: Player) => {
    if (gamemode === 'solo') sendCard && sendCard(card, user);
    // default & solo
    play('validate');
  };

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
   * Send leave event to room
   */
  const leaveRoom = (gamemode: Gamemode) => {
    if (gamemode === 'solo') return;
    socket.emit('leave-room', room, host.socket, user);
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
   * Handles win
   */
  const handleWin = useCallback(() => {
    // TODO if (winner.methods.length <= 0) return;
    setWinningCrossmarks(winner.results);
    playWinSfx();
    setConfetti(true);
    logger('handle win');
  }, [playWinSfx, winner.results]);

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
      setConfetti(false);
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
        play('end');
        break;
      case 'failure':
        handleLose();
        play('standby');
        break;
      default:
        break;
    }

    // TODO Does this work?
    socket.on('game-ball', () => {
      triggerBallEffects();
    });
  }, [
    gamestate,
    gamemode,
    card,
    host.socket,
    room,
    user,
    triggerBallEffects,
    handleWin,
    handleLose,
    play,
  ]);

  /**
   * Solo side-effects
   */
  useEffect(() => {
    if (gamemode !== 'solo') return;
    switch (gamestate) {
      case 'validate':
        // TODO pauseProgress();
        if (!checkCard) return;
        const valid = checkCard();
        valid ? handleWin() : handleLose();
        break;
      case 'pause':
        pauseProgress();
        break;
      // case 'win':
      //   play('end');
      //   break;
      // case 'failure':
      //   play('pause');
      //   break;
      // case 'end':
      //   setReplay(true);
      //   break;
      default:
        break;
    }
  }, [
    gamemode,
    gamestate,
    enableProgress,
    pauseProgress,
    checkCard,
    play,
    handleWin,
    handleLose,
  ]);

  /**
   * Force solo if in query
   */
  useEffect(() => {
    if (queryMode.current === 'solo' && gamemode !== 'solo') {
      solo && solo();
    }
  });

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
          disabled={disablePrimaryButton(gamemode, gamestate)}
          onClick={() => handlePrimaryButton(gamemode, gamestate)}
          className="w-32"
        >
          {() => primaryButtonText(gamemode, gamestate)}
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
          disabled={disableBallDisplay(gamestate)}
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
      {gamemode !== 'solo' && (
        <KickedModal open={kicked.status} reason={kicked.reason} />
      )}
      {confetti && <Confetti trigger={confetti} />}
    </React.Fragment>
  );
}
