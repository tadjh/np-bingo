import React from 'react';
import Ball from '../../Components/Ball';
import { BallContext, GameContext } from '../../Utils/contexts';
import { Gamestate, Player, Pool, Room } from '@np-bingo/types';
import StatusMessage from '../../Components/Status';
import Button from '@material-ui/core/Button';
import Footer from '../../Components/Footer';
import Draws from '../../Components/Draws';
import PlayerList from '../../Components/PlayerList';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './style.css';
import IconButton from '@material-ui/core/IconButton';

export interface HostProps {
  draws: Pool;
  players: Player[];
  checkCard?: () => void;
  newBall?: () => void;
  leaveRoom?: (room: Room) => void;
  gameToggle?: (gamestate: Gamestate, room: Room) => void;
  removePlayer?: (player: Player) => void;
  start?: (room: Room) => void;
  cooldown?: () => () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    width: {
      width: theme.spacing(18),
    },
  })
);

function Host({
  draws = [[], [], [], [], []],
  players = [],
  checkCard,
  newBall,
  leaveRoom,
  gameToggle,
  removePlayer,
  start,
  cooldown,
}: HostProps) {
  const classes = useStyles();

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
      start && start(room);
    }
    newBall && newBall();
    cooldown && cooldown();
  };

  return (
    <GameContext.Consumer>
      {(gameContext) => (
        <div className="Host">
          <header>
            <div className="app-buttons">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.width}
                onClick={() =>
                  gameToggle &&
                  gameToggle(gameContext.gamestate, gameContext.room)
                }
              >
                {buttonText(gameContext.gamestate)}
              </Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={`${classes.width} ${
                  gameContext.gamestate !== 'validate' && 'disabled'
                }`}
                disabled={gameContext.gamestate !== 'validate' && true}
                onClick={checkCard}
              >
                Check Card
              </Button>
            </div>
            <StatusMessage
              host={true}
              gamestate={gameContext.gamestate}
              count={players.length}
            />
          </header>
          <div className="main" role="main">
            {gameContext.gamestate === 'ready' ? (
              <PlayerList data={players} action={removePlayer} />
            ) : (
              <React.Fragment>
                <BallContext.Consumer>
                  {(ballContext) => (
                    <div className="ball-wrapper">
                      <IconButton
                        color="primary"
                        disabled={
                          ((gameContext.gamestate !== 'start' &&
                            gameContext.gamestate !== 'standby' &&
                            gameContext.gamestate !== 'failure') ||
                            ballContext.loop) &&
                          true
                        }
                        className={`${
                          ((gameContext.gamestate !== 'start' &&
                            gameContext.gamestate !== 'standby' &&
                            gameContext.gamestate !== 'failure') ||
                            ballContext.loop) &&
                          'disabled'
                        }`}
                        onClick={() =>
                          handleBall(gameContext.gamestate, gameContext.room)
                        }
                      >
                        <AddCircleOutlineIcon fontSize="large" />
                      </IconButton>
                      <Ball
                        number={ballContext.ball.number}
                        column={ballContext.ball.column}
                        remainder={ballContext.ball.remainder}
                        loop={ballContext.loop}
                        progress={ballContext.progress}
                        disabled={
                          gameContext.gamestate !== 'start' &&
                          gameContext.gamestate !== 'standby' &&
                          gameContext.gamestate !== 'failure' &&
                          true
                        }
                      />
                    </div>
                  )}
                </BallContext.Consumer>

                <Draws
                  draws={draws}
                  disabled={gameContext.gamestate === 'end' && true}
                />
              </React.Fragment>
            )}
          </div>
          <Footer
            room={gameContext.room}
            onClick={() => leaveRoom && leaveRoom(gameContext.room)}
          />
        </div>
      )}
    </GameContext.Consumer>
  );
}

export default Host;
