import { createServer } from 'http';
import { Server, Socket as ServerSocket } from 'socket.io';
import Client, { Socket as ClientSocket } from 'socket.io-client';

// TODO Implement socket.io tests

describe('Basic Socket.io Tests', () => {
  let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should work', (done) => {
    clientSocket.on('room-gamestate', (gamestate) => {
      expect(gamestate).toBe('ready');
      done();
    });
    serverSocket.emit('room-gamestate', 'ready');
  });

  // test('should work (with ack)', (done) => {
  //   serverSocket.on('hi', (cb) => {
  //     cb('hola');
  //   });
  //   clientSocket.emit('hi', (arg) => {
  //     expect(arg).toBe('hola');
  //     done();
  //   });
  // });
});
