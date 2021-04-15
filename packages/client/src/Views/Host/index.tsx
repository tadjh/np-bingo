import React from 'react';
import Ball from '../../Components/Ball';
import { BallContext, GameContext } from '../../Utils/contexts';
import { Gamestate, Player, Pool, Room } from '@np-bingo/types';
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
  start: (room: Room) => void;
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
    start,
  } = props;

  const buttonText = (gamestate: Gamestate) => {
    switch (gamestate) {
      case 'ready':
        return 'Start Game';
      case 'end':
        return 'New Game';
      default:
        return 'End Game';
    }
  };

  const handleBall = (gamestate: Gamestate, room: Room) => {
    if (gamestate === 'standby' || gamestate === 'failure') {
      start(room);
    }
    newBall();
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
                    value.gamestate !== 'validate' && 'disabled'
                  }`}
                  disabled={value.gamestate !== 'validate' && true}
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
            {value.gamestate === 'ready' ? (
              <Players players={players} removePlayer={removePlayer} />
            ) : (
              <React.Fragment>
                <BallContext.Consumer>
                  {(ballContext) => (
                    <Ball
                      ball={ballContext.ball}
                      loop={ballContext.loop}
                      progress={ballContext.progress}
                      disabled={
                        value.gamestate !== 'start' &&
                        value.gamestate !== 'standby' &&
                        value.gamestate !== 'failure' &&
                        true
                      }
                      host={true}
                      newBall={() => handleBall(value.gamestate, value.room)}
                    />
                  )}
                </BallContext.Consumer>

                <Draws
                  draws={draws}
                  disabled={value.gamestate === 'end' && true}
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
