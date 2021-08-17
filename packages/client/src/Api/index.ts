import { AxiosResponse } from 'axios';
import axios from '../lib/axios';
import { Player, Room } from '@np-bingo/types';
import { handleError, logger } from '../utils';

/**
 * Update game room with player information
 * @param room Room code
 * @param body Player
 * @param callback
 */
export async function apiUpdateRoom(
  room: Room,
  body: Player,
  callback: (res: AxiosResponse) => void
) {
  axios
    .put(`/api/game/join/${room}`, body)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      logger('Error in Join Room');
      // TODO Show error on front-end
      handleError(err);
    });
}
