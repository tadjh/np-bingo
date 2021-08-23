import React, { useContext } from 'react';
import clsx from 'clsx';
import Ball from '../../../components/Display/Ball';
import { BallContext, GameContext, RoomContext } from '../../../context';
import { Player, Pool } from '@np-bingo/types';
import Button from '../../../components/Inputs/Button';
import { Draws } from '../components/Draws';
import { PlayerList } from '../components/PlayerList';
import IconButton from '../../../components/Inputs/IconButton/components/IconButton';
import PlusCircleIcon from '../../../assets/icons/PlusCircle';
import Widgets from '../../../components/Widgets';
import Link from '../../../components/Navigation/Link';
import { useHost, useHostButtons, useHostSounds } from '../hooks';
import HostStatus from '../components/HostStatus';

export interface HostDispatchers {
  dispatchRemovePlayer: (player: Player) => void;
  dispatchPlayerJoined: (player: Player) => void;
  dispatchPlayerLeft: (player: Player) => void;
  dispatchPlayerReady: (player: Player) => void;
}

export interface HostProps {
  dispatchers: HostDispatchers;
  draws: Pool;
}

export default function Host({
  dispatchers,
  draws = [[], [], [], [], []],
}: HostProps) {
  const { room, players } = useContext(RoomContext);
  const { gamestate, checkCard } = useContext(GameContext);
  const {
    ball: { number, column, remainder },
  } = useContext(BallContext);
  const {
    progress,
    inProgress,
    activePlayerCount,
    handleRemovePlayer,
    handleBall,
  } = useHost(dispatchers);
  const {
    gamestateToggle,
    toggleText,
    disableCheckCard,
    setDisabled,
    handleLeaveRoom,
  } = useHostButtons();
  const [playRandomSfx] = useHostSounds();
  return (
    <React.Fragment>
      <header className="gap-3">
        <Button
          variant="primary"
          className="w-[132px]"
          onClick={gamestateToggle}
        >
          {toggleText()}
        </Button>
        <Button
          variant="success"
          disabled={disableCheckCard()}
          onClick={checkCard}
        >
          Check Card
        </Button>
      </header>
      <main>
        <HostStatus gamestate={gamestate} count={activePlayerCount()} />
        {gamestate === 'init' || gamestate === 'ready' ? (
          <PlayerList data={players} action={handleRemovePlayer} />
        ) : (
          <React.Fragment>
            <div className="flex items-center gap-x-3">
              <IconButton
                disabled={(setDisabled() || inProgress) && true}
                onClick={handleBall}
                onMouseDown={playRandomSfx}
                description="New Ball"
                direction="left"
              >
                <PlusCircleIcon
                  className={clsx(
                    'text-opacity-90 dark:text-opacity-90 group-hover:text-opacity-60',
                    setDisabled() || inProgress
                      ? 'text-gray-300 dark:text-gray-500 cursor-default'
                      : 'text-blue-700 dark:text-blue-300'
                  )}
                />
              </IconButton>
              <Ball
                number={number}
                column={column}
                remainder={remainder}
                inProgress={inProgress}
                progress={progress}
                disabled={setDisabled()}
              />
            </div>
            <Draws draws={draws} disabled={gamestate === 'end' && true} />
          </React.Fragment>
        )}
      </main>
      <footer className="gap-3">
        <Widgets room={room} />
        <Link className="hover:underline" onClick={handleLeaveRoom} to="/">
          Leave Room
        </Link>
      </footer>
    </React.Fragment>
  );
}
