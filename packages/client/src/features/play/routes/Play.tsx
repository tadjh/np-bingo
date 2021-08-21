import React, { useContext } from 'react';
import {
  Winner,
  Gamemode,
  Kicked,
  Card,
  Player,
  Ball as BallType,
} from '@np-bingo/types';
import { BallContext, FeautresContext, GameContext } from '../../../context';
import Ball from '../../../components/Display/Ball';
import { Board } from '../components/Board';
import Button from '../../../components/Inputs/Button';
import Link from '../../../components/Navigation/Link';
import { initialState as appState } from '../../../reducers/app.reducer';
import Widgets from '../../../components/Widgets';
import KickedModal from '../components/KickedModal';
import Confetti from '../components/Confetti';
import { usePlay, usePlayButton, usePlayDisplay } from '../hooks';
import PlayStatus from '../components/PlayStatus';
import { useToggle } from '../../../hooks';

export interface PlayerDispatchers {
  dispatchRoomAbandoned?: () => void;
  dispatchPlayerKicked?: () => void;
  dispatchDispenseBall: (ball: BallType) => void;
  dispatchPlayerReady: (player: Player) => void;
  dispatchCheckCardSuccess: (winner: Winner) => void;
  dispatchCheckCardFailure: () => void;
  dispatchSendCard: (card: Card, user: Player) => void;
}

export interface PlayProps {
  dispatchers: PlayerDispatchers;
  gamemode?: Gamemode;
  confettiOverride?: boolean;
}

export default function Play({
  dispatchers,
  gamemode = 'default',
  confettiOverride = false,
}: PlayProps) {
  const { allowNewCard } = useContext(FeautresContext);
  const { gamestate, room } = useContext(GameContext);
  const { ball } = useContext(BallContext);
  const {
    isWinner,
    card,
    serial,
    crossmarks,
    kicked,
    setCard,
    toggleCrossmark,
  } = usePlay(dispatchers, gamemode, confettiOverride);
  const {
    progress,
    inProgress,
    handlePrimaryButton,
    handleSendCard,
    handleLeaveRoom,
  } = usePlayButton(card, dispatchers.dispatchSendCard);
  const {
    primaryButtonText,
    disablePrimaryButton,
    disableBallDisplay,
  } = usePlayDisplay();
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
          onClick={toggleCrossmark}
        />
      </main>
      <footer className="gap-3">
        <Widgets variant={gamemode} room={room} />
        <Link className="hover:underline" onClick={handleLeaveRoom} to="/">
          Leave Room
        </Link>
      </footer>
      {gamemode !== 'solo' && (
        <KickedModal open={kicked.status} reason={kicked.reason} />
      )}
      {isWinner && <Confetti isActive={isWinner} />}
    </React.Fragment>
  );
}
