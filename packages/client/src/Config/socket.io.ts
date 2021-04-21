import { io } from 'socket.io-client';

const socket = io(process.env.SERVER || 'http://localhost:8082/', {
  withCredentials: true,
});

// TODO Limit reconnectionAttempts
// TODO Reconnect to room?

export default socket;
