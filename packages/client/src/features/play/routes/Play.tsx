import React, { Fragment, useContext } from 'react';
import { Card, Gamemode, Serial } from '@np-bingo/types';
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
  winOverride?: boolean;
  staticCard?: Card;
  staticSerial?: Serial;
}

export default function Play({
  gamemode = 'default',
  winOverride = false,
  staticCard,
  staticSerial,
}: PlayProps) {
  const {
    user: { name },
    socket,
    isSocketLoading,
  } = useContext(UserContext);
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
  } = usePlay(gamemode);
  const {
    progress,
    inProgress,
    handlePrimaryButton,
    handleSendCard,
    handleLeaveRoom,
    disableSendCard,
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
            >
              {primaryButtonText()}
            </Button>
          </div>
          <Button
            variant="success"
            disabled={disableSendCard()}
            onClick={handleSendCard}
          >
            Bingo
          </Button>
        </div>
        <div className="w-[40px]" />
      </header>
      <main>
        <PlayStatus
          gamestate={gamestate}
          gamemode={gamemode}
          data-testid="play-status"
        />
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
          serial={staticSerial || serial}
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
          name={name}
          isLoading={isSocketLoading}
        />
      </footer>
      {gamemode !== 'solo' && <KickedModal open={status} reason={reason} />}
      {(winOverride || isWinner) && (
        <Confetti isActive={winOverride || isWinner} />
      )}
    </Fragment>
  );
}
