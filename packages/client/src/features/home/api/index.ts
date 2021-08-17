import { AxiosResponse } from 'axios';
import axios from '../../../lib/axios';
import { handleError, logger } from '../../../utils';

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
