import axios from '../../../lib/axios';
import { Room, Winner } from '@np-bingo/types';
import { handleError, logger } from '../../../utils';

/**
 * Update game with winner
 * @param room Room code
 * @param body Winner
 */
// TODO handle array
export async function apiSaveRoom(room: Room, body: Winner[]) {
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
 * @param id
 * @param room
 */
export async function apiDeleteRoom(id: string, room: Room) {
  await axios
    .delete(`/api/game/${id}`, { data: { room } })
    .then(() => {
      logger('Leaving room');
    })
    .catch((err) => {
      logger('Error in Close Room');
      handleError(err);
    });
}

/**
 * Delete room from server (if no players have joined)
 * @param id
 * @param room
 */
export async function apiDeactivateRoom(room: Room) {
  await axios
    .delete(`/api/game/done/${room}`)
    .then(() => {
      logger('Deactivating room');
    })
    .catch((err) => {
      logger('Error in Deactivating Room');
      handleError(err);
    });
}
