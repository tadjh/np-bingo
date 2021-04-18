import React from 'react';
import Ball from '../../Components/Ball';
import { BallContext, GameContext } from '../../Utils/contexts';
import { Gamestate, Player, Pool, Room } from '@np-bingo/types';
import StatusMessage from '../../Components/Status';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Footer from '../../Components/Footer';
import Draws from '../../Components/Draws';
import PlayerList from '../../Components/PlayerList';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './style.css';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

export interface HostProps {
  checkCard: () => void;
  newBall: () => void;
  draws: Pool;
  leaveRoom: (room: Room) => void;
  players: Player[];
  gameToggle: (gamestate: Gamestate, room: Room) => void;
  removePlayer: (player: Player) => void;
  start: (room: Room) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    width: {
      width: theme.spacing(16),
    },
  })
);

function Host({
  checkCard,
  newBall,
  draws,
  leaveRoom,
  players,
  gameToggle,
  removePlayer,
  start,
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
      start(room);
    }
    newBall();
  };

  return (
    <GameContext.Consumer>
      {(gameContext) => (
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
                  onClick={() =>
                    gameToggle(gameContext.gamestate, gameContext.room)
                  }
                >
                  {buttonText(gameContext.gamestate)}
                </Button>
                <Button
                  className={`${classes.width} ${
                    gameContext.gamestate !== 'validate' && 'disabled'
                  }`}
                  disabled={gameContext.gamestate !== 'validate' && true}
                  onClick={checkCard}
                >
                  Check Card
                </Button>
              </ButtonGroup>
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
                          gameContext.gamestate !== 'start' &&
                          gameContext.gamestate !== 'standby' &&
                          gameContext.gamestate !== 'failure' &&
                          true
                        }
                        className={`${
                          gameContext.gamestate !== 'start' &&
                          gameContext.gamestate !== 'standby' &&
                          gameContext.gamestate !== 'failure' &&
                          'disabled'
                        }`}
                        onClick={() =>
                          handleBall(gameContext.gamestate, gameContext.room)
                        }
                      >
                        <AddCircleOutlineIcon fontSize="large" />
                      </IconButton>
                      <Ball
                        ball={ballContext.ball}
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
            onClick={() => leaveRoom(gameContext.room)}
          />
        </div>
      )}
    </GameContext.Consumer>
  );
}

export default Host;
