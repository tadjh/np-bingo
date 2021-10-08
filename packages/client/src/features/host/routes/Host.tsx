import { Fragment, useContext } from 'react';
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
import { useHost, useHostButtons, useHostSounds } from '../hooks';
import HostStatus from '../components/HostStatus';
import PlayerName from '../../../components/Display/PlayerName';
import Back from '../../../components/Navigation/Back';

interface HostStoriesContext {
  players?: Player[];
  gamestate?: Gamestate;
}

export interface HostProps extends HostStoriesContext {
  draws: DrawsType;
}

export default function Host({ draws = [[], [], [], [], []] }: HostProps) {
  const {
    user: { name },
    socket,
    isSocketLoading,
  } = useContext(UserContext);
  const { room, players } = useContext(RoomContext);
  const { gamestate } = useContext(GameContext);
  const {
    ball: { number, column, remainder },
  } = useContext(BallContext);
  const {
    progress,
    inProgress,
    playerCount,
    handleRemovePlayer,
    handleBall,
  } = useHost(socket);
  const {
    disableDraws,
    gamestateToggle,
    toggleText,
    handleValidate,
    disableCheckCard,
    setDisabled,
    handleLeaveRoom,
  } = useHostButtons();
  const { playRandomSfx } = useHostSounds();
  return (
    <Fragment>
      <header className="justify-between">
        <Back to="/" onClick={handleLeaveRoom} />
        <div className="flex gap-2">
          <div className="w-[98px] text-center">
            <Button variant="primary" onClick={gamestateToggle}>
              {toggleText()}
            </Button>
          </div>
          <Button
            variant="success"
            disabled={disableCheckCard}
            onClick={handleValidate}
          >
            Validate
          </Button>
        </div>
        <div className="w-[40px]" />
      </header>
      <main className="flex-auto">
        <HostStatus gamestate={gamestate} count={playerCount} />
        {gamestate === 'init' || gamestate === 'ready' ? (
          <PlayerList data={players} action={handleRemovePlayer} />
        ) : (
          <Fragment>
            <div className="flex items-center gap-x-3">
              <IconButton
                onClick={handleBall}
                onMouseDown={playRandomSfx}
                description="New Ball"
                direction="left"
                disabled={inProgress || setDisabled()}
                data-testid="new-ball"
              >
                <PlusCircleIcon
                  className={clsx(
                    'text-opacity-90 dark:text-opacity-90',
                    inProgress || setDisabled()
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
            <Draws draws={draws} disabled={disableDraws} />
          </Fragment>
        )}
      </main>
      <footer>
        <Widgets room={room} />
        <PlayerName
          status={socket.connected}
          socketId={socket.id}
          name={name}
          isLoading={isSocketLoading}
        />
      </footer>
    </Fragment>
  );
}
