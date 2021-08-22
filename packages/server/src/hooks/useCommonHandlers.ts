import { Server, Socket } from 'socket.io';

export function useCommonHandlers(io: Server, socket: Socket) {
  /**
   * Send socket's gamestate to room
   * @param room
   * @param gamestate
   */
  const emitRoomGamestate = (room: string, gamestate: string) => {
    socket.to(room).emit('room:gamestate', gamestate);
  };

  return { emitRoomGamestate };
}
