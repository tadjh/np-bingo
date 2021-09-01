import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { ORIGIN, PORT } from './config';
import { Host, Player } from '@np-bingo/types';
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

io.on('connection', (socket: Socket) => {
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

  /**
   * From Player: Won
   * @param room Room
   * @param name Winner name
   */
  // socket.on('win', (room: Room, name: string) => {
  //   socket.to(room).emit('game-win', name);
  // });
});

const port = PORT || 8082;

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
