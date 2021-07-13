import { AxiosResponse } from 'axios';
import axios from '../Config/axios';
import { Player, Room, Winner } from '@np-bingo/types';
import { handleError } from '../Utils';

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
      console.log('Error in Create Room');
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
      console.log('Error in Join Room');
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
      console.log('Saving room');
    })
    .catch((err) => {
      console.log('Error in Save Room');
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
      console.log('Leaving room');
    })
    .catch((err) => {
      console.log('Error in Close Room');
      handleError(err);
    });
}
