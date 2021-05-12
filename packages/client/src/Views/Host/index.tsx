import React from 'react';
import Ball from '../../Components/Ball';
import { BallContext, GameContext } from '../../Utils/contexts';
import { Gamestate, Player, Pool, Room } from '@np-bingo/types';
import StatusMessage from '../../Components/Status';
import Button from '../../Components/Button';
import Footer from '../../Components/Footer';
import Draws from '../../Components/Draws';
import PlayerList from '../../Components/PlayerList';
import IconButton from '../../Components/IconButton';
import PlusCircleIcon from '../../Assets/PlusCircle';
import Main from '../../Components/Main';
import Header from '../../Components/Header';
import Widgets from '../../Components/Widgets';
import Link from '../../Components/Link';

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
        <React.Fragment>
          <Header className="gap-3">
            <Button
              variant="contained"
              color="primary"
              className="w-36"
              onClick={() =>
                gameToggle &&
                gameToggle(gameContext.gamestate, gameContext.room)
              }
            >
              {buttonText(gameContext.gamestate)}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={gameContext.gamestate !== 'validate' && true}
              onClick={checkCard}
            >
              Check Card
            </Button>
          </Header>
          <Main className="flex-1 gap-y-4">
            <StatusMessage
              host={true}
              gamestate={gameContext.gamestate}
              count={players.length}
            />
            {gameContext.gamestate === 'ready' ? (
              <PlayerList data={players} action={removePlayer} />
            ) : (
              <React.Fragment>
                <BallContext.Consumer>
                  {(ballContext) => (
                    <div className="flex items-center gap-x-3">
                      <IconButton
                        disabled={
                          ((gameContext.gamestate !== 'start' &&
                            gameContext.gamestate !== 'standby' &&
                            gameContext.gamestate !== 'failure') ||
                            ballContext.loop) &&
                          true
                        }
                        onClick={() =>
                          handleBall(gameContext.gamestate, gameContext.room)
                        }
                        description="New Ball"
                        direction="left"
                      >
                        <PlusCircleIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
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
          </Main>
          <Footer className="gap-3">
            <Widgets room={gameContext.room} />
            <Link
              className="hover:underline"
              onClick={() => leaveRoom && leaveRoom(gameContext.room)}
              to="/"
            >
              Leave Room
            </Link>
          </Footer>
        </React.Fragment>
      )}
    </GameContext.Consumer>
  );
}

export default Host;
