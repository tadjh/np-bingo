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
import StatusMessage from '../../../components/Display/Status';
import Button from '../../../components/Inputs/Button';
import Link from '../../../components/Navigation/Link';
import { initialState as appState } from '../../../reducers/app.reducer';
import Widgets from '../../../components/Widgets';
import KickedModal from '../components/KickedModal';
import Confetti from '../components/Confetti';
import { usePlay, usePlayButton, usePlayDisplay } from '../hooks';

export interface PlayerDispatchers {
  dispatchRoomAbandoned: () => void;
  dispatchPlayerKicked: () => void;
  dispatchDispenseBall: (ball: BallType) => void;
  dispatchPlayerReady: (player: Player) => void;
  dispatchCheckCardSuccess: (winner: Winner) => void;
  dispatchCheckCardFailure: () => void;
  dispatchSendCard: (card: Card, user: Player) => void;
}

export interface PlayProps {
  dispatchers: PlayerDispatchers;
  winner?: Winner;
  kicked: Kicked;
  gamemode?: Gamemode;
  sendCard?: (card: Card, user?: Player) => void;
}

export default function Play({
  dispatchers,
  winner = { ...appState.winner },
  kicked = { status: false, reason: 'none' },
  gamemode = 'default',
}: PlayProps) {
  const { gamestate, room } = useContext(GameContext);
  const { ball } = useContext(BallContext);
  const { allowNewCard } = useContext(FeautresContext);
  const { isConfetti, card, serial, crossmarks, setCard, toggleCrossmark } =
    usePlay(dispatchers, gamemode);
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
          variant="contained"
          disabled={disablePrimaryButton()}
          onClick={handlePrimaryButton}
          className="w-32"
        >
          {primaryButtonText()}
        </Button>
        <Button
          variant="contained"
          disabled={gamestate !== 'start' && true}
          onClick={handleSendCard}
        >
          Bingo
        </Button>
      </header>
      <main>
        <StatusMessage />
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
          winner={winner.methods.length > 0 && true}
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
      {isConfetti && <Confetti isActive={isConfetti} />}
    </React.Fragment>
  );
}
