import React, { Fragment, useContext } from 'react';
import { Card, Gamemode } from '@np-bingo/types';
import { Link as RouterLink } from 'react-router-dom';
import {
  BallContext,
  FeaturesContext,
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
import PlayerName from '../../../components/Display/PlayerName';
import IconButton from '../../../components/Inputs/IconButton';
import ChevronLeftIcon from '../../../assets/icons/ChevronLeft';
import IconMenu from '../../../components/Inputs/IconMenu';

export interface PlayProps {
  gamemode?: Gamemode;
  confettiOverride?: boolean;
  staticCard?: Card;
}

export default function Play({
  gamemode = 'default',
  confettiOverride = false,
  staticCard,
}: PlayProps) {
  const { user, socket, isSocketLoading } = useContext(UserContext);
  const { allowNewCard } = useContext(FeaturesContext);
  const { room } = useContext(RoomContext);
  const { gamestate } = useContext(GameContext);
  const { ball } = useContext(BallContext);
  const {
    card,
    serial,
    crossmarks,
    kicked: { status, reason },
    isWinner,
    handleNewCard,
  } = usePlay(gamemode, confettiOverride);
  const {
    progress,
    inProgress,
    handlePrimaryButton,
    handleSendCard,
    handleLeaveRoom,
  } = usePlayButton(card);
  const { primaryButtonText, disablePrimaryButton, disableBallDisplay } =
    usePlayDisplay();
  return (
    <Fragment>
      <header className="flex gap-2 items-center justify-between">
        <RouterLink to="/" onClick={handleLeaveRoom}>
          <IconButton description="Back">
            <ChevronLeftIcon />
          </IconButton>
        </RouterLink>
        {allowNewCard && (
          <Button
            disabled={gamestate !== 'ready' && true}
            onClick={handleNewCard}
          >
            New Card
          </Button>
        )}
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
          card={staticCard || [...card]}
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
        {/* <Link className="hover:underline" to="/">
          Leave Room
        </Link> */}
      </footer>
      {gamemode !== 'solo' && <KickedModal open={status} reason={reason} />}
      {isWinner && <Confetti isActive={isWinner} />}
    </Fragment>
  );
}
