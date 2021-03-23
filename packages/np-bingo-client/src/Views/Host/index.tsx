import React from 'react';
import Ball from '../../Components/Ball';
import { GameContext } from '../../App';
import { Gamestate, Player, Pool, Room } from '../../types';
import StatusMessage from '../../Components/Status';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Footer from '../../Components/Footer';
import Draws from '../../Components/Draws';
import Players from '../../Components/Players';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './style.css';

type Props = {
  checkCard: () => void;
  newBall: () => void;
  draws: Pool;
  leaveRoom: (room: Room) => void;
  players: Player[];
  gameToggle: (gamestate: Gamestate, room: Room) => void;
  removePlayer: (player: Player) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    width: {
      width: theme.spacing(16),
    },
  })
);

function Host(props: Props) {
  const classes = useStyles();
  let {
    checkCard,
    newBall,
    draws,
    leaveRoom,
    players,
    gameToggle,
    removePlayer,
  } = props;

  const buttonText = (gamestate: Gamestate) => {
    switch (gamestate) {
      case Gamestate.READY:
        return 'Start Game';
      case Gamestate.END:
        return 'New Game';
      default:
        return 'End Game';
    }
  };

  return (
    <GameContext.Consumer>
      {(value) => (
        <div className="Host">
          <header>
            <div className="app-buttons">
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button
                  className={classes.width}
                  onClick={() => gameToggle(value.gamestate, value.room)}
                >
                  {buttonText(value.gamestate)}
                </Button>
                <Button
                  className={`${classes.width} ${
                    value.gamestate !== Gamestate.VALIDATE && 'disabled'
                  }`}
                  disabled={value.gamestate !== Gamestate.VALIDATE && true}
                  onClick={checkCard}
                >
                  Check Card
                </Button>
              </ButtonGroup>
            </div>
          </header>
          <div className="main" role="main">
            <StatusMessage
              host={true}
              gamestate={value.gamestate}
              count={players.length}
            />
            {value.gamestate === Gamestate.READY ? (
              <Players players={players} removePlayer={removePlayer} />
            ) : (
              <React.Fragment>
                <Ball
                  disabled={
                    value.gamestate !== Gamestate.START &&
                    value.gamestate !== Gamestate.STANDBY &&
                    value.gamestate !== Gamestate.FAILURE &&
                    true
                  }
                  host={true}
                  newBall={newBall}
                />
                <Draws
                  draws={draws}
                  disabled={value.gamestate === Gamestate.END && true}
                />
              </React.Fragment>
            )}
          </div>
          <Footer room={value.room} leaveRoom={() => leaveRoom(value.room)} />
        </div>
      )}
    </GameContext.Consumer>
  );
}

export default Host;
