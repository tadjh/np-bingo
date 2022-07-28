import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { NODE_ENV, ORIGIN, PORT } from './config';
import connectDB from './config/db';
import { usePlayerHandlers, useHostHandlers } from './hooks';
import game from './routes/game';
import { instrument } from '@socket.io/admin-ui';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [ORIGIN, 'https://admin.socket.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

if (NODE_ENV === 'development') {
  // {
  //   type: 'basic',
  //   username: SOCKET_ADMIN_USERNAME,
  //   password: SOCKET_ADMIN_PASSWORD,
  // },
  instrument(io, {
    auth: false,
  });
}

connectDB();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());
app.use('/api/game/', game);

const onConnection = (socket: Socket) => {
  const { hostEventsListener } = useHostHandlers(io, socket);
  const { playerEventsListener, playerLeaveRoom } = usePlayerHandlers(
    io,
    socket
  );

  console.log('User connected', socket.id);

  const onDisconnect = (reason: string) => {
    if (socket.data.room && socket.data.host && socket.data.player) {
      playerLeaveRoom(socket.data.room, socket.data.host, socket.data.player);
    }
    console.log('User disconnected', socket.id);
  };

  socket.on('disconnect', onDisconnect);

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
