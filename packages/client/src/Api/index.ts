import { AxiosResponse } from 'axios';
import axios from '../config/axios';
import { Player, Room, Winner } from '@np-bingo/types';
import { handleError, logger } from '../Utils';

/**
 * Create game room on server
 * @param body
 * @param callback
 */
export async function apiCreateRoom(
  body: any,
  callback: (res: AxiosResponse) => void
) {
  await axios
    .post('/api/game', body)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      logger('Error in Create Room');
      handleError(err);
    });
}

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
