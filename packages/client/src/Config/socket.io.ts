import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER || 'http://localhost:8082/', {
  withCredentials: true,
  reconnectionAttempts: 10,
});

// TODO Manual Reconnect to room?

export default socket;
