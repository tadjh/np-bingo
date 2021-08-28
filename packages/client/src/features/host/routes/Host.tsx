import React, { useContext } from 'react';
import clsx from 'clsx';
import Ball from '../../../components/Display/Ball';
import {
  BallContext,
  GameContext,
  RoomContext,
  UserContext,
} from '../../../context';
import { Draws as DrawsType, Gamestate, Player } from '@np-bingo/types';
import Button from '../../../components/Inputs/Button';
import Draws from '../components/Draws';
import { PlayerList } from '../components/PlayerList';
import IconButton from '../../../components/Inputs/IconButton/components/IconButton';
import PlusCircleIcon from '../../../assets/icons/PlusCircle';
import Widgets from '../../../components/Widgets';
import { Link as RouterLink } from 'react-router-dom';
// import Link from '../../../components/Navigation/Link';
import { useHost, useHostButtons, useHostSounds } from '../hooks';
import HostStatus from '../components/HostStatus';
import PlayerName from '../../../components/Display/PlayerName';
import ChevronLeftIcon from '../../../assets/icons/ChevronLeft';

interface HostStoriesContext {
  players?: Player[];
  gamestate?: Gamestate;
}

export interface HostProps extends HostStoriesContext {
  draws: DrawsType;
}

export default function Host({ draws = [[], [], [], [], []] }: HostProps) {
  const { user, socket, isSocketLoading } = useContext(UserContext);
  const { room, players } = useContext(RoomContext);
  const { gamestate } = useContext(GameContext);
  const {
    ball: { number, column, remainder },
  } = useContext(BallContext);
  const {
    progress,
    inProgress,
    activePlayerCount,
    handleRemovePlayer,
    handleBall,
  } = useHost(socket);
  const {
    gamestateToggle,
    toggleText,
    handleValidate,
    disableCheckCard,
    setDisabled,
    handleLeaveRoom,
  } = useHostButtons();
  const [playRandomSfx] = useHostSounds();
  return (
    <React.Fragment>
      <header className="flex gap-2 items-center justify-between">
        <RouterLink to="/" onClick={handleLeaveRoom}>
          <IconButton description="Back">
            <ChevronLeftIcon />
          </IconButton>
        </RouterLink>
        <div className="flex gap-2">
          <div className="w-[108px] text-center">
            <Button variant="primary" onClick={gamestateToggle}>
              {toggleText()}
            </Button>
          </div>
          <Button
            variant="success"
            disabled={disableCheckCard()}
            onClick={handleValidate}
          >
            Validate
          </Button>
        </div>
        <div className="w-[40px]" />
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
      <footer className="gap-1">
        <Widgets room={room} />
        <PlayerName
          status={socket.connected}
          name={user.name}
          isLoading={isSocketLoading}
        />
        {/* <Link className="hover:underline" onClick={handleLeaveRoom} to="/">
          Leave Room
        </Link> */}
      </footer>
    </React.Fragment>
  );
}
