import { io } from 'socket.io-client';
import { API_URL } from '../config';

const socket = io(API_URL, {
  withCredentials: true,
  reconnectionAttempts: 10,
  autoConnect: true,
});

// TODO Manual Reconnect to room?

export default socket;
