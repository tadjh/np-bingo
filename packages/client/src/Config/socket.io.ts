import { io } from 'socket.io-client';

const socket = io(process.env.SERVER || 'http://localhost:8082/', {
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('User connected');
});

socket.on('disconnect', () => {
  console.log('User disconnected');
});

// TODO Reconnect to room?

export default socket;
