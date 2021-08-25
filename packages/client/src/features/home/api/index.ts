import { Host, Player, Room } from '@np-bingo/types';
import axios from '../../../lib/axios';
// import { handleError, logger } from '../../../utils';

/**
 * Create game room on server
 * @param body
 * @param callback
 */
export const apiCreateRoom = async (body: Player) =>
  await axios.post('/api/game', body);

// TODO DELETE FILE
