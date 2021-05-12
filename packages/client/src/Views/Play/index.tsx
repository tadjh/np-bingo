import React, { useCallback, useEffect, useReducer } from 'react';
import {
  Action,
  PlayerState as State,
  Card,
  Results,
  Gamestate,
  Winner,
  Host,
  Room,
  Gamemode,
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

export interface PlayProps {
  gamestate?: Gamestate;
  winner?: Winner;
  kicked?: boolean;
  sendCard?: (mode: Gamemode, card: Card, room?: Room, host?: Host) => void;
  leaveRoom?: (room: Room, host: Host) => void;
  standby?: (mode: Gamemode) => void;
  init?: () => void;
}

export default function Play({
  gamestate = 'init',
  winner = { ...appState.winner },
  kicked = false,
  sendCard,
  leaveRoom,
  standby,
  init,
}: PlayProps) {
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
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
      dispatch({ type: INIT_GAME });
    }
    if (gamestate === 'ready') {
      getCard();
    }
  }, [gamestate, getCard]);

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

  const { card, serial, crossmarks } = state;
  const board = [...card];

  return (
    <React.Fragment>
      <Header className="gap-3">
        <GameContext.Consumer>
          {(gameContext) => (
            <React.Fragment>
              <FeautresContext.Consumer>
                {(features) =>
                  features['new-card'] && (
                    <Button
                      className={`${
                        gameContext.gamestate !== 'ready' && 'disabled'
                      }`}
                      disabled={gameContext.gamestate !== 'ready' && true}
                      onClick={getCard}
                    >
                      New Card
                    </Button>
                  )
                }
              </FeautresContext.Consumer>
              <Button
                variant="contained"
                className={`${
                  gameContext.gamestate !== 'ready' &&
                  gameContext.gamestate !== 'failure' &&
                  'disabled'
                }`}
                disabled={
                  gameContext.gamestate !== 'ready' &&
                  gameContext.gamestate !== 'failure' &&
                  true
                }
                onClick={() => standby && standby(gameContext.mode)}
              >
                {gameContext.gamestate === 'failure'
                  ? 'Resume'
                  : gameContext.mode === 'solo'
                  ? 'Start'
                  : 'Ready'}
              </Button>
              <Button
                variant="contained"
                className={`${gameContext.gamestate !== 'start' && 'disabled'}`} // TODO removed value.gamestate !== 'failure' on these??
                disabled={gameContext.gamestate !== 'start' && true}
                onClick={() =>
                  handleSendCard(
                    gameContext.mode,
                    card,
                    gameContext.room,
                    gameContext.host
                  )
                }
              >
                Bingo
              </Button>
            </React.Fragment>
          )}
        </GameContext.Consumer>
      </Header>
      <Main className="flex-1 gap-y-4">
        <GameContext.Consumer>
          {(gameContext) => (
            <React.Fragment>
              <StatusMessage
                gamestate={gameContext.gamestate}
                mode={gameContext.mode}
              />
              <BallContext.Consumer>
                {(ballContext) => (
                  <div className="ball-wrapper">
                    <Ball
                      number={ballContext.ball.number}
                      column={ballContext.ball.column}
                      remainder={ballContext.ball.remainder}
                      loop={ballContext.loop}
                      progress={ballContext.progress}
                      disabled={
                        gameContext.gamestate !== 'start' &&
                        gameContext.gamestate !== 'failure' &&
                        true
                      }
                    />
                  </div>
                )}
              </BallContext.Consumer>
            </React.Fragment>
          )}
        </GameContext.Consumer>
        <Board
          card={board}
          serial={serial}
          winner={winner.methods.length > 0 && true}
          crossmarks={crossmarks}
          onClick={toggleCrossmark}
        />
      </Main>
      <Footer className="gap-3">
        <GameContext.Consumer>
          {(gameContext) => (
            <React.Fragment>
              {gameContext.mode !== 'solo' && (
                <Widgets room={gameContext.room} />
              )}
              <Link
                className="hover:underline"
                onClick={() =>
                  leaveRoom && leaveRoom(gameContext.room, gameContext.host)
                }
                to="/"
              >
                Leave Room
              </Link>
            </React.Fragment>
          )}
        </GameContext.Consumer>
      </Footer>
      <Modal
        id="leave-modal"
        open={kicked}
        onClose={init}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ModalHeader id="alert-dialog-title">{'Leaving Room'}</ModalHeader>
        <ModalContent>
          <p id="alert-dialog-description">
            You have been kicked from the room.
          </p>
        </ModalContent>
        <ModalFooter>
          <Link className="hover:underline" onClick={init} to="/">
            Leave Room
          </Link>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
