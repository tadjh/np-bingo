import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import {
  Action,
  Card,
  Results,
  Winner,
  Gamemode,
  Ball as BallType,
  Player,
} from '@np-bingo/types';
import {
  BallContext,
  FeautresContext,
  GameContext,
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
import Modal from '../../Components/Modal';
import ModalHeader from '../../Components/ModalHeader';
import ModalContent from '../../Components/ModalContent';
import ModalFooter from '../../Components/ModalFooter';
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
import { useProgress } from '../../Utils/custom-hooks';
import socket from '../../Config/socket.io';
import { useHistory } from 'react-router-dom';

export interface PlayProps {
  checkCard?: () => void;
  newBall: () => BallType;
  sendCard?: (card: Card, user?: Player) => void;
  winner?: Winner;
  kicked?: boolean;
}

export default function Play({
  checkCard,
  newBall,
  sendCard,
  winner = { ...appState.winner },
  kicked = false,
}: PlayProps) {
  let history = useHistory();
  const [playState, playDispatch] = useReducer<
    (state: PlayerState, action: Action) => PlayerState
  >(reducer, initialState);
  const { gamestate, gamemode, room, host, user, play } = useContext(
    GameContext
  );
  const ball = useContext(BallContext);
  const { ballDelay, allowNewCard } = useContext(FeautresContext);
  const { card, serial, crossmarks } = playState;

  /**
   * Loop ball animation and call newBall each completion
   * @returns When ball number is 0
   */
  const onProgressDone = () => {
    const brandNewBall = newBall();
    if (brandNewBall.number === 0) return play('end');

    if (gamestate === 'start') {
      enableProgress();
    }
  };
  const { progress, inProgress, enableProgress } = useProgress(
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
   * Socket.io Emit Side-effects
   */
  useEffect(() => {
    if (gamemode === 'solo') return;

    if (gamestate === 'standby') {
      socket.emit('ready-up', host.socket, user);
    }
    if (gamestate === 'validate') {
      socket.emit('send-card', room, host.socket, user, card);
    }
  }, [gamestate, gamemode, card, host.socket, room, user]);

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
        play('pause');
        break;
      case 'pause':
        checkCard && checkCard();
        break;
      default:
        break;
    }
  }, [gamemode, gamestate, enableProgress, checkCard, play]);

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
   * Update winning results after successful validation
   */
  useEffect(() => {
    if (winner.methods.length <= 0) return;
    setWinningCrossmarks(winner.results);
  }, [winner.methods, winner.results]);

  /**
   * Sets gamestate to standby in default, start in solo mode
   */
  const handleStartOrStandby = () => {
    if (gamemode === 'solo') {
      return play('start');
    }
    // default
    play('standby');
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

  /**
   * Force route to home on kicked modal click events
   */
  const exit = () => {
    history.push('/');
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
          disabled={gamestate !== 'ready' && gamestate !== 'failure' && true}
          onClick={handleStartOrStandby}
          className="w-[115px]"
        >
          {gamestate === 'failure'
            ? 'Resume'
            : gamemode === 'solo'
            ? 'Start'
            : 'Ready'}
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
      <Modal
        id="leave-modal"
        open={kicked}
        onClose={exit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ModalHeader id="alert-dialog-title">Leaving Room</ModalHeader>
        <ModalContent>
          <p id="alert-dialog-description">
            You have been kicked from the room.
          </p>
        </ModalContent>
        <ModalFooter>
          <Link className="hover:underline" onClick={exit} to="/">
            Leave Room
          </Link>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
