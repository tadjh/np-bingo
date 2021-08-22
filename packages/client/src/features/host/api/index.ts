import axios from '../../../lib/axios';
import { Room, Winner } from '@np-bingo/types';
import { handleError, logger } from '../../../utils';

/**
 * Update game with winner
 * @param room Room code
 * @param body Winner
 */
export async function apiSaveRoom(room: Room, body: Winner) {
  await axios
    .put(`/api/game/${room}`, body)
    .then(() => {
      logger('Saving room');
    })
    .catch((err) => {
      logger('Error in Save Room');
      handleError(err);
    });
}

/**
 * Delete room from server (if no players have joined)
 * @param room
 */
export async function apiDeleteRoom(room: Room) {
  await axios
    .delete(`/api/game/${room}`)
    .then(() => {
      logger('Leaving room');
    })
    .catch((err) => {
      logger('Error in Close Room');
      handleError(err);
    });
}