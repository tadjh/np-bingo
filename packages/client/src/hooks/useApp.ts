import { useCallback } from 'react';
import { Ball, Draws, PlayerCard, Pool, Winner } from '@np-bingo/types';
import { getBall, removeBall, updateDraws } from '../utils/bingo';
import { validateCard } from '../utils/bingo.validate';

export function useApp(pool: Pool, draws: Draws) {
  /**
   * Get new ball
   * @param pool
   * @param draws
   * @returns Ball
   */
  const newBall = (): { ball: Ball; draws: Draws; pool: Pool } => {
    const ball = getBall(pool);
    if (ball.number === 0) return { ball, draws: [], pool: [] };
    // safely clone multidimenional array
    const drawsArray = draws.map((array) => array.slice());
    const newDraws = updateDraws(drawsArray, ball);
    const filteredPool = removeBall(pool, ball);
    return { ball, draws: newDraws, pool: filteredPool };
  };

  /**
   * Checks if input card is a winner
   * @param mode Game mode
   * @param playerCard Input card to be checked and owner of card
   * @param draws Pool of bingo balls that have already been drawn
   * @return boolean
   */
  const checkCard = useCallback(
    (playerCard: PlayerCard): Winner | null => {
      // if (playerCard.length === 1) return null;
      const { card, owner } = playerCard;
      const [results, methods] = validateCard(card, draws);

      // No winning methods
      if (methods.length <= 0) return null;

      return {
        methods,
        results,
        player: owner,
        card: card,
      };
    },
    [draws]
  );

  return { newBall, checkCard };
}
