import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import { ORIGIN, PORT } from './config';

import { IPlayer } from './models/player';
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
  const { createRoom, hostLeaveRoom, hostEmitRoomGamestate, newBall } =
    useHostHandlers(io, socket);
  usePlayerHandlers(io, socket);

  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  /**
   * From Host: Create room
   */
  socket.on('host:create-room', createRoom);

  /**
   * From Host: Leaving room
   */
  socket.on('host:leave-room', hostLeaveRoom);

  /**
   * From Host: Gamestate listener
   */
  socket.on('host:gamestate', hostEmitRoomGamestate);

  /**
   * From Host: Ball dispensed
   * @param room Room
   * @param ball Ball
   */
  socket.on('host:ball', newBall);

  const joinRoom = (room: Room, host: SocketId, player: IPlayer) => {
    // TODO Prevent room join if host is already playing
    socket.join(room);
    console.log(`Player joined ${room}`);
    io.to(host).emit('player-joined', player);
  };
  /**
   * From Player: Join room
   * @param room Room
   * @param host
   * @param player
   */
  socket.on('player:join-room', joinRoom);

  /**
   * From Host: Remove player from room
   */
  // socket.on('remove-player', (player: IPlayer) => {
  //   if (player.socket) {
  //     io.to(player.socket).emit('player-remove');
  //     console.log(`${player.name} removed from room`);
  //   } else {
  //     console.log(`${player.name} socket not found in remove player`);
  //   }
  // });

  /**
   * From Player: Player is ready
   * @param hostSocketId Host Socket ID
   * @param player IPlayer
   */
  // socket.on('ready-up', (hostSocketId: SocketId, player: IPlayer) => {
  //   console.log(`${player.name} is ready`);
  //   io.to(hostSocketId).emit('player-ready', player);
  // });

  /**
   * From Host: Ready Check
   * @param room Room
   */
  // socket.on('ready', (room: Room) => {
  //   console.log('Waiting for players to ready up');
  //   socket.to(room).emit('game-ready');
  // });

  /**
   * From Player: Send Card
   * @param room Room
   * @param hostSocketId Socket ID
   * @param player IPlayer
   *     @param card Card
   */
  // socket.on(
  //   'send-card',
  //   (room: Room, hostSocketId: SocketId, player: IPlayer, card: Card) => {
  //     io.to(hostSocketId).emit('receive-card', room, player, card);
  //     console.log(`${player.name} sent card to host`);
  //   }
  // );

  /**
   * From Host: Checking Card
   * @param room Room
   * @param player IPlayer
   */
  // socket.on('checking-card', (room: Room) => {
  //   socket.to(room).emit('game-validation');
  //   console.log('Checking card for Bingo...');
  // });

  /**
   * From Host: Winning Card
   * @param card Card
   * @param player IPlayer
   * @param methods string[]
   * @param data Winning Numbers by methods won
   */
  // socket.on('winning-card', (room: Room, winner: Winner) => {
  //   if (winner.player.socket) {
  //     io.to(winner.player.socket.id).emit('winner', room, winner);
  //     console.log('Bingo!');
  //   } else {
  //     console.log(`${winner.player.name} socket not found in wininng card`);
  //   }
  // });

  /**
   * From Host: Card not a winner
   * @param room Room
   */
  // socket.on('losing-card', (room: Room, winner: Winner) => {
  //   console.log(winner.player.socket);

  //   if (winner.player.socket) {
  //     socket.to(room).emit('game-continue');
  //     // TODO Probably double sends to sender
  //     io.to(winner.player.socket.id).emit('loser');
  //     console.log('The card is not a winner...');
  //   } else {
  //   }
  // });

  /**
   * From Player: Won
   * @param room Room
   * @param name Winner name
   */
  // socket.on('win', (room: Room, name: string) => {
  //   socket.to(room).emit('game-win', name);
  // });

  /**
   * From Host: Game Over!
   * @param room Room
   */
  // socket.on('end', (room: Room) => {
  //   socket.to(room).emit('game-end');
  //   console.log('Game over!');
  // });
});

const port = PORT || 8082;

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
