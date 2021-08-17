import React, { useContext } from 'react';
import Ball from '../../../components/Display/Ball';
import { BallContext, GameContext } from '../../../context';
import { Player, Pool } from '@np-bingo/types';
import StatusMessage from '../../../components/Display/Status';
import Button from '../../../components/Inputs/Button';
import { Draws } from '../components/Draws';
import { PlayerList } from '../components/PlayerList';
import IconButton from '../../../components/Inputs/IconButton/components/IconButton';
import PlusCircleIcon from '../../../assets/icons/PlusCircle';
import Widgets from '../../../components/Widgets';
import Link from '../../../components/Navigation/Link';
import { useHost, useHostSounds } from '../hooks';

export interface HostProps {
  dispatchRemovePlayer: (player: Player) => void;
  draws: Pool;
  players: Player[];
}

export default function Host({
  dispatchRemovePlayer,
  draws = [[], [], [], [], []],
  players = [],
}: HostProps) {
  const { gamestate, room, checkCard } = useContext(GameContext);
  const {
    ball: { number, column, remainder },
  } = useContext(BallContext);
  const {
    progress,
    inProgress,
    isDisabled,
    gamestateToggle,
    toggleText,
    handleRemovePlayer,
    handleBall,
    handleLeaveRoom,
  } = useHost(dispatchRemovePlayer);

  const [playRandomSfx] = useHostSounds();
  return (
    <React.Fragment>
      <header className="gap-3">
        <Button
          variant="contained"
          color="primary"
          className="w-[132px]"
          onClick={gamestateToggle}
        >
          {toggleText}
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={gamestate !== 'validate' && true}
          onClick={checkCard}
        >
          Check Card
        </Button>
      </header>
      <main>
        <StatusMessage host={true} count={players.length} />
        {gamestate === 'init' || gamestate === 'ready' ? (
          <PlayerList data={players} action={handleRemovePlayer} />
        ) : (
          <React.Fragment>
            <div className="flex items-center gap-x-3">
              <IconButton
                disabled={(isDisabled || inProgress) && true}
                onClick={handleBall}
                onMouseDown={playRandomSfx}
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
                number={number}
                column={column}
                remainder={remainder}
                inProgress={inProgress}
                progress={progress}
                disabled={isDisabled}
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
