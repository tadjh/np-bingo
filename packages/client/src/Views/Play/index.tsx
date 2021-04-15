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
import { BallContext, GameContext } from '../../App';
import {
  BINGO,
  INIT_CROSSMARKS,
  INIT_GAME,
  NEW_CARD,
  UPDATE_CROSSMARKS,
  WINNER_CROSSMARKS,
} from '../../Constants';
import './style.css';
import Ball from '../../Components/Ball';
import Board from '../../Components/Board';
import StatusMessage from '../../Components/Status';
import { createCard, serializeCard } from '../../Utils/bingo';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Footer from '../../Components/Footer';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { initialState, reducer } from '../../Reducers/play.reducer';

type Props = {
  gamestate: Gamestate;
  winner: Winner;
  sendCard: (room: Room, host: Host, card: Card) => void;
  leaveRoom: (room: Room, host: Host) => void;
  standby: (mode: Gamemode) => void;
  kicked: boolean;
  init: () => void;
};

function Play(props: Props) {
  let { gamestate, winner, sendCard, leaveRoom, standby, kicked, init } = props;
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );

  /**
   * Creates a new card and stores it in state
   */
  const newCard = useCallback(() => {
    let card: Card = createCard(BINGO);
    let serialCard = [...card];
    let serial = serializeCard(serialCard);
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
      newCard();
    }
  }, [gamestate, newCard]);

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
   * @param methods Array of current winning methods (row, column, diagonal)
   * @param data Results of validation check
   */
  const setWinningCrossmarks = (methods: string[], data: Results) => {
    let winningCrossmarks = {};
    let i;
    for (i = 0; i < methods.length; i++) {
      let marks = (data[methods[i]] as number[]).map(function (item) {
        let id = `cell${item + 1}`;
        return { [id]: true };
      });
      winningCrossmarks = Object.assign(winningCrossmarks, ...marks);
    }

    dispatch({ type: WINNER_CROSSMARKS, payload: winningCrossmarks });
  };

  /**
   * Update winning results after successful validation
   */
  useEffect(() => {
    if (winner.methods.length > 0) {
      setWinningCrossmarks(winner.methods, winner.data);
    }
  }, [winner]);

  let { card, serial, crossmarks } = state;
  const board = [...card];
  return (
    <div className="Play">
      <header>
        <GameContext.Consumer>
          {(value) => (
            <div className="App-buttons">
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button
                  className={`${
                    value.gamestate !== 'start' &&
                    value.gamestate !== 'failure' &&
                    'disabled'
                  }`}
                  disabled={
                    value.gamestate !== 'start' &&
                    value.gamestate !== 'failure' &&
                    true
                  }
                  onClick={() => sendCard(value.room, value.host, card)}
                >
                  Bingo
                </Button>
                <Button
                  className={`${value.gamestate !== 'ready' && 'disabled'}`}
                  disabled={value.gamestate !== 'ready' && true}
                  onClick={newCard}
                >
                  New Card
                </Button>
                <Button
                  className={`ready ${
                    value.gamestate !== 'ready' && 'disabled'
                  }`}
                  disabled={value.gamestate !== 'ready' && true}
                  onClick={() => standby(value.mode)}
                >
                  Ready
                </Button>
              </ButtonGroup>
            </div>
          )}
        </GameContext.Consumer>
      </header>
      <div className="main" role="main">
        <GameContext.Consumer>
          {(value) => (
            <React.Fragment>
              <StatusMessage gamestate={value.gamestate} />
              <BallContext.Consumer>
                {(ballContext) => (
                  <Ball
                    ball={ballContext.ball}
                    loop={ballContext.loop}
                    progress={ballContext.progress}
                    disabled={
                      value.gamestate !== 'start' &&
                      value.gamestate !== 'failure' &&
                      true
                    }
                  />
                )}
              </BallContext.Consumer>
            </React.Fragment>
          )}
        </GameContext.Consumer>
        <Board
          board={board}
          serial={serial}
          winner={winner}
          crossmarks={crossmarks}
          toggleCrossmark={toggleCrossmark}
        />
      </div>
      <GameContext.Consumer>
        {(value) => (
          <Footer
            leaveRoom={() => leaveRoom(value.room, value.host)}
            room={value.room}
            mode={value.mode}
          />
        )}
      </GameContext.Consumer>
      <Dialog
        open={kicked}
        onClose={init}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Leaving Room'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have been kicked from the room.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link component={RouterLink} onClick={init} color="primary" to="/">
            Leave Room
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Play;
