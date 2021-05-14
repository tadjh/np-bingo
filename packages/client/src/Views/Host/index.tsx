import React, { useContext, useEffect } from 'react';
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
import socket from '../../Config/socket.io';

export interface HostProps {
  gameToggle?: (gamestate: Gamestate) => void;
  draws: Pool;
  players: Player[];
  checkCard?: () => void;
  newBall?: () => void;
  leaveRoom?: (room: Room) => void;
  removePlayer?: (player: Player) => void;
}

export default function Host({
  gameToggle,
  draws = [[], [], [], [], []],
  players = [],
  checkCard,
  newBall,
  leaveRoom,
  removePlayer,
}: HostProps) {
  const { gamestate, room, play } = useContext(GameContext);
  const ball = useContext(BallContext);
  const { ballDelay } = useContext(FeautresContext);
  const { progress, inProgress, enableProgress } = useProgress(ballDelay);

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
      play('start');
    }
    newBall && newBall();
    enableProgress();
  };

  /**
   * Keep room in sync with host
   */
  useEffect(() => {
    if (gamestate === 'init') {
      play('ready');
      socket.emit('create-room', room);
    }
    if (gamestate === 'ready') {
      socket.emit('ready', room);
    }
    if (gamestate === 'standby') {
      socket.emit('standby', room);
    }
    if (gamestate === 'start') {
      socket.emit('start', room);
    }
    if (gamestate === 'end') {
      socket.emit('end', room);
    }
  }, [gamestate, room, play]);

  return (
    <React.Fragment>
      <Header className="gap-3">
        <Button
          variant="contained"
          color="primary"
          className="w-36"
          onClick={() => gameToggle && gameToggle(gamestate)}
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
        {gamestate === 'init' || gamestate === 'ready' ? (
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
