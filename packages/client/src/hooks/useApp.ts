import { useCallback } from 'react';
import { Ball, PlayerCard, Pool, Winner } from '@np-bingo/types';
import { getBall, removeBall, updateDraws } from '../utils/bingo';
import { validateCard } from '../utils/bingo.validate';

export function useApp(
  playerCard: PlayerCard,
  pool: Pool,
  draws: Pool,
  dispatchCheckCardSuccess: (winner: Winner) => void,
  dispatchCheckCardFailure: () => void,
  dispatchNewBall: (ball: Ball, draws: Pool, pool: Pool) => void
): [() => Ball, () => boolean] {
  /**
   * Get new ball
   * @param pool
   * @param draws
   * @returns Ball
   */
  const newBall = (): Ball => {
    const ball = getBall(pool);
    if (ball.number === 0) return ball;

    // safely clone multidimenional array
    const drawsArray = draws.map((array) => array.slice());
    const newDraws = updateDraws(drawsArray, ball);
    const filteredPool = removeBall(pool, ball);

    dispatchNewBall(ball, newDraws, filteredPool);

    return ball;
  };

  /**
   * Checks if input card is a winner
   * @param mode Game mdoe
   * @param playerCard Input card to be checked and owner of card
   * @param draws Pool of bingo balls that have already been drawn
   * @return boolean
   */
  const checkCard = useCallback((): boolean => {
    const { card, owner } = playerCard;
    const [results, methods] = validateCard(card, draws);

    // No winning methods
    if (methods.length <= 0) {
      dispatchCheckCardFailure();
      return false;
    }

    const winner = {
      methods,
      results,
      player: owner,
      card: card,
    } as Winner;

    dispatchCheckCardSuccess(winner);
    return true;
  }, [playerCard, draws, dispatchCheckCardFailure, dispatchCheckCardSuccess]);

  return [newBall, checkCard];
}
