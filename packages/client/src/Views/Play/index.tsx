import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import {
  Action,
  PlayerState as State,
  Card,
  Results,
  Winner,
  Host,
  Room,
  Gamemode,
  Ball as BallType,
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
import { initialState, reducer } from '../../Reducers/play.reducer';
import { initialState as appState } from '../../Reducers/app.reducer';
import Main from '../../Components/Main';
import Header from '../../Components/Header';
import Widgets from '../../Components/Widgets';
import { useProgress } from '../../Utils/custom-hooks';
import socket from '../../Config/socket.io';
import { useHistory } from 'react-router-dom';

export interface PlayProps {
  winner?: Winner;
  kicked?: boolean;
  sendCard?: (mode: Gamemode, card: Card, room?: Room, host?: Host) => void;
  standby?: (mode: Gamemode) => void;
  newBall: () => BallType;
}

export default function Play({
  winner = { ...appState.winner },
  kicked = false,
  sendCard,
  standby,
  newBall,
}: PlayProps) {
  let history = useHistory();
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );
  const { gamestate, mode, room, host, user, play } = useContext(GameContext);
  const ball = useContext(BallContext);
  const { ballDelay, allowNewCard } = useContext(FeautresContext);

  /**
   * Loop ball animation and call newBall each completion
   * @returns When ball number is 0
   */
  const onProgressDone = () => {
    const brandNewBall = newBall();
    if (brandNewBall.number === 0) return;
    enableProgress();
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
    dispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
    clearCrossmarks();
  }, []);

  /**
   * Sync Play gamestate with App gamestate
   */
  useEffect(() => {
    // Syncing Player View with Host Game State.
    if (gamestate === 'init') {
      play('ready');
      dispatch({ type: INIT_GAME });
    }
    if (gamestate === 'ready') {
      getCard();
    }
  }, [gamestate, getCard, play]);

  /**
   * Toggle current target's crossmark visibility
   * @param event Click event
   */
  const toggleCrossmark = (event: React.MouseEvent) => {
    let target = event.target as HTMLDivElement;
    let value = state.crossmarks[target.id];
    let crossmark = { [target.id]: !value };
    dispatch({ type: UPDATE_CROSSMARKS, payload: crossmark });
  };

  /**
   * Resets all crossmarks
   */
  const clearCrossmarks = () => {
    dispatch({ type: INIT_CROSSMARKS, payload: {} });
  };

  /**
   * Sets Winning crossmarks after successful card validations
   * @param results Results of validation check
   */
  const setWinningCrossmarks = (results: Results) => {
    const winningCrossmarks = winningCells(results);
    dispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
  };

  /**
   * Update winning results after successful validation
   */
  useEffect(() => {
    if (winner.methods.length <= 0) return;
    setWinningCrossmarks(winner.results);
  }, [winner.methods, winner.results]);

  const handleStandby = () => {
    standby && standby(mode);
    if (mode === 'solo') enableProgress();
  };

  /**
   * Wrapper function for sendCard
   * @param mode
   * @param card
   * @param room
   * @param host
   * @returns
   */
  const handleSendCard = (
    mode: Gamemode,
    card: Card,
    room: Room,
    host: Host
  ) => {
    if (!sendCard) return;
    // default
    if (mode !== 'solo') {
      sendCard(mode, card, room, host);
      return;
    }
    // solo
    sendCard(mode, card);
  };

  const leaveRoom = () => {
    socket.emit('leave-room', room, host.socket, user);
  };

  const exit = () => {
    history.push(`/`);
  };

  const { card, serial, crossmarks } = state;
  const board = [...card];

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
          onClick={handleStandby}
        >
          {gamestate === 'failure'
            ? 'Resume'
            : mode === 'solo'
            ? 'Start'
            : 'Ready'}
        </Button>
        <Button
          variant="contained"
          disabled={gamestate !== 'start' && true}
          onClick={() => handleSendCard(mode, card, room, host)}
        >
          Bingo
        </Button>
      </Header>
      <Main className="flex-1 gap-y-4">
        <StatusMessage gamestate={gamestate} mode={mode} />
        <div className="ball-wrapper">
          <Ball
            number={ball.number}
            column={ball.column}
            remainder={ball.remainder}
            inProgress={inProgress}
            progress={progress}
            disabled={gamestate !== 'start' && gamestate !== 'failure' && true}
          />
        </div>
        <Board
          card={board}
          serial={serial}
          winner={winner.methods.length > 0 && true}
          crossmarks={crossmarks}
          onClick={toggleCrossmark}
        />
      </Main>
      <Footer className="gap-3">
        <Widgets variant={mode} room={room} />
        <Link className="hover:underline" onClick={leaveRoom} to="/">
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
