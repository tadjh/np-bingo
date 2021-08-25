import React, { useContext } from 'react';
import { Gamemode } from '@np-bingo/types';
import {
  BallContext,
  FeaturesContext,
  GameContext,
  RoomContext,
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

export interface PlayProps {
  gamemode?: Gamemode;
  confettiOverride?: boolean;
}

export default function Play({
  gamemode = 'default',
  confettiOverride = false,
}: PlayProps) {
  const { allowNewCard } = useContext(FeaturesContext);
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
  const { primaryButtonText, disablePrimaryButton, disableBallDisplay } =
    usePlayDisplay();
  return (
    <React.Fragment>
      <header className="gap-3">
        {allowNewCard && (
          <Button disabled={gamestate !== 'ready' && true} onClick={setCard}>
            New Card
          </Button>
        )}
        <Button
          variant="primary"
          disabled={disablePrimaryButton()}
          onClick={handlePrimaryButton}
          className="w-[108px]"
        >
          {primaryButtonText()}
        </Button>
        <Button
          variant="success"
          disabled={gamestate !== 'start' && true}
          onClick={handleSendCard}
        >
          Bingo
        </Button>
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
      <footer className="gap-3">
        <Widgets variant={gamemode} room={room} />
        <Link className="hover:underline" onClick={handleLeaveRoom} to="/">
          Leave Room
        </Link>
      </footer>
      {gamemode !== 'solo' && <KickedModal open={status} reason={reason} />}
      {isWinner && <Confetti isActive={isWinner} />}
    </React.Fragment>
  );
}
