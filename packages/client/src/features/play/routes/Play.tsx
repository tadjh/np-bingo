import React, { Fragment, useContext } from 'react';
import { Gamemode } from '@np-bingo/types';
import { Link as RouterLink } from 'react-router-dom';
import {
  BallContext,
  // FeaturesContext,
  GameContext,
  RoomContext,
  UserContext,
} from '../../../context';
import Ball from '../../../components/Display/Ball';
import { Board } from '../components/Board';
import Button from '../../../components/Inputs/Button';
import Link from '../../../components/Navigation/Link';
import Widgets from '../../../components/Widgets';
import KickedModal from '../components/KickedModal';
import Confetti from '../components/Confetti';
import { usePlay, usePlayButton, usePlayDisplay } from '../hooks';
import PlayStatus from '../components/PlayStatus';
import { PlayContext } from '../../../context/PlayContext';
import PlayerName from '../../../components/Display/PlayerName';
import IconButton from '../../../components/Inputs/IconButton';
import ChevronLeftIcon from '../../../assets/icons/ChevronLeft';
import IconMenu from '../../../components/Inputs/IconMenu';

export interface PlayProps {
  gamemode?: Gamemode;
  confettiOverride?: boolean;
}

export default function Play({
  gamemode = 'default',
  confettiOverride = false,
}: PlayProps) {
  const { user, socket, isSocketLoading } = useContext(UserContext);
  // const { allowNewCard } = useContext(FeaturesContext);
  const { room } = useContext(RoomContext);
  const { gamestate } = useContext(GameContext);
  const { ball } = useContext(BallContext);
  const {
    card,
    serial,
    crossmarks,
    kicked: { status, reason },
  } = useContext(PlayContext);
  const { isWinner, setCard } = usePlay(gamemode, confettiOverride);
  const {
    progress,
    inProgress,
    handlePrimaryButton,
    handleSendCard,
    handleLeaveRoom,
  } = usePlayButton();
  const {
    primaryButtonText,
    disablePrimaryButton,
    disableBallDisplay,
  } = usePlayDisplay();
  return (
    <Fragment>
      <header className="flex gap-2 items-center justify-between">
        <RouterLink to="/">
          <IconButton description="Back">
            <ChevronLeftIcon />
          </IconButton>
        </RouterLink>
        {/* {allowNewCard && (
          <Button disabled={gamestate !== 'ready' && true} onClick={setCard}>
            New Card
          </Button>
        )} */}
        <div className="flex gap-2">
          <div className="w-[108px] text-center">
            <Button
              variant="primary"
              disabled={disablePrimaryButton()}
              onClick={handlePrimaryButton}
              // className="w-[94px]"
            >
              {primaryButtonText()}
            </Button>
          </div>
          <Button
            variant="success"
            disabled={gamestate !== 'start' && true}
            onClick={handleSendCard}
            // className="w-[94px]"
          >
            Bingo
          </Button>
        </div>
        <div className="w-[40px]" />
      </header>
      <main>
        <PlayStatus gamestate={gamestate} gamemode={gamemode} />
        <Ball
          number={ball.number}
          column={ball.column}
          remainder={ball.remainder}
          inProgress={inProgress}
          progress={progress}
          disabled={disableBallDisplay()}
        />
        <Board
          card={[...card]}
          serial={serial}
          winner={isWinner}
          crossmarks={crossmarks}
        />
      </main>
      <footer className="gap-1">
        {gamemode === 'solo' ? (
          <IconMenu direction="up" />
        ) : (
          <Widgets room={room} />
        )}
        <PlayerName
          status={socket.connected}
          name={user.name}
          isLoading={isSocketLoading}
        />
        {/* <Link className="hover:underline" onClick={handleLeaveRoom} to="/">
          Leave Room
        </Link> */}
      </footer>
      {gamemode !== 'solo' && <KickedModal open={status} reason={reason} />}
      {isWinner && <Confetti isActive={isWinner} />}
    </Fragment>
  );
}
