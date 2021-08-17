import React, { useContext } from 'react';
import Ball from '../../../components/Display/Ball';
import { BallContext, FeautresContext, GameContext } from '../../../context';
import { Ball as BallType, Player, Pool } from '@np-bingo/types';
import StatusMessage from '../../../components/Display/Status';
import Button from '../../../components/Inputs/Button';
import { Draws } from '../components/Draws';
import { PlayerList } from '../components/PlayerList';
import IconButton from '../../../components/Inputs/IconButton/components/IconButton';
import PlusCircleIcon from '../../../assets/icons/PlusCircle';
import Widgets from '../../../components/Widgets';
import Link from '../../../components/Navigation/Link';
import { useProgress } from '../../../hooks';
import useHost from '../hooks/useHost';
import { useHostSounds } from '../hooks/useHostSounds';

export interface HostProps {
  checkCard: () => void;
  newBall: () => BallType;
  dispatchRemovePlayer: (player: Player) => void;
  draws: Pool;
  players: Player[];
}

export default function Host({
  checkCard,
  newBall,
  dispatchRemovePlayer,
  draws = [[], [], [], [], []],
  players = [],
}: HostProps) {
  const { ballDelay } = useContext(FeautresContext);
  const { gamestate, room } = useContext(GameContext);
  const ball = useContext(BallContext);
  const { progress, inProgress, enableProgress } = useProgress(ballDelay);
  const [
    isDisabled,
    gamestateToggle,
    toggleText,
    handleRemovePlayer,
    handleBall,
    handleLeaveRoom,
  ] = useHost(dispatchRemovePlayer, newBall, enableProgress);
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
