import React, { useContext, useRef } from 'react';
import Ball from '../../Components/Ball';
import {
  BallContext,
  FeautresContext,
  GameContext,
} from '../../Utils/contexts';
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
}

export default function Host({
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
    <React.Fragment>
      <Header className="gap-3">
        <Button
          variant="contained"
          color="primary"
          className="w-36"
          onClick={() => gameToggle && gameToggle(gamestate, room)}
        >
          {buttonText(gamestate)}
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={gamestate !== 'validate' && true}
          onClick={checkCard}
        >
          Check Card
        </Button>
      </Header>
      <Main className="flex-1 gap-y-4">
        <StatusMessage
          host={true}
          gamestate={gamestate}
          count={players.length}
        />
        {gamestate === 'ready' ? (
          <PlayerList data={players} action={removePlayer} />
        ) : (
          <React.Fragment>
            <div className="flex items-center gap-x-3">
              <IconButton
                disabled={(isDisabled || inProgress) && true}
                onClick={() => handleBall(gamestate, room)}
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
                number={ball.number}
                column={ball.column}
                remainder={ball.remainder}
                inProgress={inProgress}
                progress={progress}
                disabled={isDisabled}
              />
            </div>
            <Draws draws={draws} disabled={gamestate === 'end' && true} />
          </React.Fragment>
        )}
      </Main>
      <Footer className="gap-3">
        <Widgets room={room} />
        <Link
          className="hover:underline"
          onClick={() => leaveRoom && leaveRoom(room)}
          to="/"
        >
          Leave Room
        </Link>
      </Footer>
    </React.Fragment>
  );
}
