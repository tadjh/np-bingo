import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Room, SocketId } from 'socket.io-adapter';
import dotenv from 'dotenv';
dotenv.config();

import { IPlayer } from './Models/player';
import connectDB from './Config/db';
import { Ball, Card, Winner } from '@np-bingo/types';

// routes
import game from './Routes/game';

const app = express();
const httpServer = createServer(app);
// TODO set origin to production server
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

connectDB();

// middleware

app.use(cors({ origin: true, credentials: true })); // TODO is this duplicaton with line 7?
app.use(express.json());
// use Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/game/', game);

io.on('connection', (socket: Socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  /**
   * From Host: Create room
   * @param room Room
   */
  socket.on('create-room', (room: Room) => {
    socket.join(room);
    console.log(`User created room ${room}`);
  });

  /**
   * From Player: Join room
   * @param room Room
   * @param host
   * @param player
   */
  socket.on('join-room', (room: Room, host: SocketId, player: IPlayer) => {
    // TODO Prevent room join if host is already playing
    socket.join(room);
    console.log(`Player joined ${room}`);
    io.to(host).emit('player-joined', player);
  });

  /**
   * From Host or Player: Leave room
   * @param room
   * @param host (Optional) Socket ID
   */
  socket.on(
    'leave-room',
    (room: Room, hostSocketId?: SocketId, player?: IPlayer) => {
      socket.leave(room);

      // Only resolves true when non-host leaves
      if (hostSocketId && player) {
        console.log(`Player left ${room}`);

        io.to(hostSocketId).emit('player-left', player);
      } else {
        console.log(`Host left ${room}`);
        socket.to(room).emit('host-left');
      }
    }
  );

  /**
   * From Host: Remove player from room
   */
  socket.on('remove-player', (player: IPlayer) => {
    if (player.socket) {
      io.to(player.socket).emit('player-remove');
      console.log(`${player.name} removed from room`);
    } else {
      console.log(`${player.name} socket not found in remove player`);
    }
  });

  /**
   * From Player: Player is ready
   * @param hostSocketId Host Socket ID
   * @param player IPlayer
   */
  socket.on('ready-up', (hostSocketId: SocketId, player: IPlayer) => {
    console.log(`${player.name} is ready`);
    io.to(hostSocketId).emit('player-ready', player);
  });

  /**
   * From Host: Ready Check
   * @param room Room
   */
  socket.on('ready', (room: Room) => {
    console.log('Waiting for players to ready up');
    socket.to(room).emit('game-ready');
  });

  /**
   * From Host: On Standby
   * @param room Room
   */
  socket.on('standby', (room: Room) => {
    socket.to(room).emit('game-standby');
    console.log('Game beginning...');
  });

  /**
   * From Host: Game Started
   * @param room Room
   */
  socket.on('start', (room: Room) => {
    socket.to(room).emit('game-start');
    console.log('Game started');
  });

  /**
   * From Host: Ball dispensed
   * @param room Room
   * @param ball Ball
   */
  socket.on('ball', (room: Room, ball: Ball) => {
    socket.to(room).emit('game-ball', ball);
    console.log(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
  });

  /**
   * From Player: Send Card
   * @param room Room
   * @param hostSocketId Socket ID
   * @param player IPlayer
   *     @param card Card
   */
  socket.on(
    'send-card',
    (room: Room, hostSocketId: SocketId, player: IPlayer, card: Card) => {
      io.to(hostSocketId).emit('receive-card', room, player, card);
      console.log(`${player.name} sent card to host`);
    }
  );

  /**
   * From Host: Checking Card
   * @param room Room
   * @param player IPlayer
   */
  socket.on('checking-card', (room: Room) => {
    socket.to(room).emit('game-validation');
    console.log('Checking card for Bingo...');
  });

  /**
   * From Host: Winning Card
   * @param card Card
   * @param player IPlayer
   * @param methods string[]
   * @param data Winning Numbers by methods won
   */
  socket.on('winning-card', (room: Room, winner: Winner) => {
    if (winner.player.socket) {
      io.to(winner.player.socket).emit('winner', room, {
        player: winner.player,
        card: winner.card,
        methods: winner.methods,
        data: winner.data,
      } as Winner);
      console.log('Bingo!');
    } else {
      console.log(`${winner.player.name} socket not found in wininng card`);
    }
  });

  /**
   * From Player: Won
   * @param room Room
   * @param name Winner name
   */
  socket.on('win', (room: Room, name: string) => {
    socket.to(room).emit('game-win', name);
  });

  /**
   * From Host: Continue Game
   * @param room Room
   */
  socket.on('losing-card', (room: Room) => {
    socket.to(room).emit('game-continue');
    console.log('The card is not a winner...');
  });

  /**
   * From Host: Game Over!
   * @param room Room
   */
  socket.on('end', (room: Room) => {
    socket.to(room).emit('game-end');
    console.log('Game over!');
  });
});

const port = process.env.PORT || 8082;

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
