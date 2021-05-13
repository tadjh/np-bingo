import React, { useContext, useRef } from 'react';
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
import { useProgress } from '../../Utils/custom-hooks';

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
}: HostProps) {
  const { gamestate, room } = useContext(GameContext);
  const ball = useContext(BallContext);
  const { ballDelay } = useContext(FeautresContext);

  const max = useRef(100);
  const multiplier = useRef(max.current / ballDelay);

  const incrementProgress = (elapsed: number) =>
    setProgress(Math.min(multiplier.current * elapsed, max.current));

  const { progress, inProgress, setProgress, enableProgress } = useProgress(
    ballDelay,
    incrementProgress
  );

  const isDisabled =
    gamestate !== 'start' &&
    gamestate !== 'standby' &&
    gamestate !== 'failure' &&
    true;

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
    enableProgress();
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
                disabled={(isDisabled || inProgress) && true}
                        description="New Ball"
                        direction="left"
                      >
                        <PlusCircleIcon
                          className={`${
                    isDisabled || inProgress
                              ? 'text-gray-300 dark:text-gray-500 cursor-default'
                              : 'text-blue-700 dark:text-blue-300'
                          } text-opacity-90 dark:text-opacity-90 group-hover:text-opacity-60`}
                        />
                      </IconButton>
                      <Ball
                inProgress={inProgress}
                progress={progress}
                disabled={isDisabled}
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
