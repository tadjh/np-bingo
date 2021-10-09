import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ORIGIN, PORT } from './config';
import connectDB from './config/db';
import { usePlayerHandlers, useHostHandlers } from './hooks';
// routes
import game from './routes/game';

const app = express();
const httpServer = createServer(app);
/**
 * Socket.io CORS
 */
const io = new Server(httpServer, {
  cors: {
    origin: ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

connectDB();

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * REST Api CORS
 */
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());
// use Routes
app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/game/', game);

// export const getCurrentRoom = (
//   socketId: string,
//   rooms: Set<string>
// ): string => {
//   let currentRoom = '';
//   for (const room of rooms) {
//     if (room !== socketId) {
//       currentRoom = room;
//       break;
//     }
//   }
//   return currentRoom;
// };

/**
 * Connection handler
 * @param socket Socket
 */
const onConnection = (socket: Socket) => {
  const { hostEventsListener } = useHostHandlers(io, socket);
  const { playerEventsListener } = usePlayerHandlers(io, socket);

  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  /**
   * From Host: Host event
   */
  socket.on('host:event', hostEventsListener);

  /**
   * From Player: Player event
   */
  socket.on('player:event', playerEventsListener);
};

io.on('connection', onConnection);

const port = PORT || 8082;

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
