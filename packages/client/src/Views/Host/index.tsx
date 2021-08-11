import React, { useContext, useEffect } from 'react';
import Ball from '../../Components/Ball';
import {
  BallContext,
  FeautresContext,
  GameContext,
  ThemeContext,
} from '../../Utils/contexts';
import {
  Ball as BallType,
  Gamestate,
  Player,
  Pool,
  Room,
  Winner,
} from '@np-bingo/types';
import StatusMessage from '../../Components/Status';
import Button from '../../Components/Button';
import Footer from '../../Components/Footer';
import Draws from '../../Components/Draws';
import PlayerList from '../../Components/PlayerList';
import IconButton from '../../Components/IconButton';
import PlusCircleIcon from '../../Assets/Icons/PlusCircle';
import Main from '../../Components/Main';
import Header from '../../Components/Header';
import Widgets from '../../Components/Widgets';
import Link from '../../Components/Link';
import useProgress from '../../Utils/useProgress';
import socket from '../../Config/socket.io';
import useSound from 'use-sound';
import dispenseSfx from '../..//Assets/Sounds/Ball_Dispenser.mp3';
import { randomNumber } from '../../Utils';

export interface HostProps {
  checkCard?: () => void;
  newBall?: () => BallType;
  removePlayer?: (player: Player) => void;
  leaveRoom?: (room: Room) => void;
  saveRoom?: (room: Room, winner: Winner) => void;
  draws: Pool;
  players: Player[];
}

export default function Host({
  checkCard,
  newBall,
  removePlayer,
  leaveRoom,
  saveRoom,
  draws = [[], [], [], [], []],
  players = [],
}: HostProps) {
  const { ballDelay, defaultVolume } = useContext(FeautresContext);
  const { gamestate, room, winner, play } = useContext(GameContext);
  const { sounds } = useContext(ThemeContext);
  const ball = useContext(BallContext);
  const { progress, inProgress, enableProgress } = useProgress(ballDelay);

  const [playSfx] = useSound(dispenseSfx, {
    volume: defaultVolume,
    sprite: {
      dispenseBall1: [0, 2000],
      dispenseBall2: [250, 1750],
      dispenseBall3: [2000, 2000],
      dispenseBall4: [2250, 1750],
    },
    soundEnabled: sounds,
  });

  /**
   * isDisabled is true when gamestate is not start, standby or failure
   */
  const isDisabled =
    gamestate !== 'start' &&
    gamestate !== 'standby' &&
    gamestate !== 'failure' &&
    true;

  /**
   * Three way toggle for host main button
   * @param gamestate Gamestate
   * @param room Room
   */
  const gamestateToggle = (gamestate: Gamestate) => {
    switch (gamestate) {
      case 'ready':
        play('standby');
        break;
      case 'end':
        play('ready');
        break;
      default:
        play('end');
        break;
    }
  };

  /**
   * Display text for main action button
   * @param gamestate
   * @returns
   */
  const gamestateToggleText = (gamestate: Gamestate): string => {
    switch (gamestate) {
      case 'ready':
        return 'Start Game';
      case 'end':
        return 'New Game';
      default:
        return 'End Game';
    }
  };

  /**
   * Kick player from room
   * @param player
   */
  const handleRemovePlayer = (player: Player) => {
    if (!removePlayer) return;
    socket.emit('remove-player', player);
    removePlayer(player);
  };

  /**
   * Trigger gamestate start, queue new ball and show ball progress animation
   * @param gamestate
   * @param room
   */
  const handleBall = (gamestate: Gamestate) => {
    if (!newBall) return;
    // If gamestate isn't already start, set it when a ball is drawn
    if (gamestate === 'standby' || gamestate === 'failure') {
      play('start');
    }
    const ball = newBall();

    if (ball.number === 0) {
      play('end');
    } else {
      enableProgress();
      socket.emit('ball', room, ball);
    }
  };

  /**
   * Leave room by room code
   * @param room Room code
   */
  const handleLeaveRoom = (room: Room) => {
    if (!leaveRoom) return;
    socket.emit('leave-room', room);
    leaveRoom(room);
  };

  /**
   * Check card for validation
   * @param room
   * @returns
   */
  const handleCheckCard = () => {
    if (!checkCard) return;
    checkCard();
  };

  /**
   * Keep the room in sync with this host's gamestate
   */
  useEffect(() => {
    switch (gamestate) {
      case 'init':
        socket.emit('create-room', room);
        play('ready');
        break;
      case 'ready':
        socket.emit('ready', room);
        break;
      case 'standby':
        socket.emit('standby', room);
        break;
      case 'start':
        socket.emit('start', room);
        break;
      case 'failure':
        socket.emit('losing-card', room);
        break;
      case 'win':
        socket.emit('winning-card', room, winner);
        saveRoom && saveRoom(room, winner);
        break;
      case 'end':
        socket.emit('end', room);
        break;
    }
  }, [gamestate, room, winner, play, saveRoom]);

  return (
    <React.Fragment>
      <Header className="gap-3">
        <Button
          variant="contained"
          color="primary"
          className="w-36"
          onClick={() => gamestateToggle(gamestate)}
        >
          {gamestateToggleText(gamestate)}
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={gamestate !== 'validate' && true}
          onClick={handleCheckCard}
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
          <PlayerList data={players} action={handleRemovePlayer} />
        ) : (
          <React.Fragment>
            <div className="flex items-center gap-x-3">
              <IconButton
                disabled={(isDisabled || inProgress) && true}
                onClick={() => handleBall(gamestate)}
                onMouseDown={() =>
                  playSfx({ id: `dispenseBall${randomNumber(4)}` })
                }
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
          onClick={() => handleLeaveRoom(room)}
          to="/"
        >
          Leave Room
        </Link>
      </Footer>
    </React.Fragment>
  );
}
