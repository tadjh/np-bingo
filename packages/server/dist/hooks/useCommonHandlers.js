"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommonHandlers = void 0;
function useCommonHandlers(io, socket) {
    /**
     * Leave room
     * @param room
     */
    var emitLeaveRoom = function (room, name) {
        socket.leave(room);
        console.log("Room " + room + ": " + name + " left room");
    };
    /**
     * Send socket's gamestate to room
     * @param room
     * @param gamestate
     */
    var emitRoomGamestate = function (room, gamestate) {
        socket.to(room).emit('room:event', 'sync-gamestate', gamestate);
    };
    /**
     * Send new ball to room
     * @param room
     * @param ball
     */
    var emitRoomNewBall = function (room, ball) {
        socket.to(room).emit('room:event', 'dispense-ball', ball);
    };
    /**
     * Notify the room that a card was sent to the host
     * @param room
     * @param playerName
     */
    var emitRoomCheckCard = function (room, playerName) {
        socket.to(room).emit('room:event', 'send-card', playerName);
    };
    /**
     * Notify the room that the player's card is a winner
     * @param room
     * @param playerName
     */
    var emitRoomWinners = function (room, winningPlayers) {
        socket.to(room).emit('room:event', 'winning-cards', winningPlayers);
    };
    /**
     * Notify the room that the player's card is not a winner
     * @param room
     * @param playerName
     */
    var emitRoomLosers = function (room, playerNames) {
        // TODO Nothing being done with these names
        socket.to(room).emit('room:event', 'losing-cards', playerNames);
    };
    return {
        emitLeaveRoom: emitLeaveRoom,
        emitRoomGamestate: emitRoomGamestate,
        emitRoomNewBall: emitRoomNewBall,
        emitRoomCheckCard: emitRoomCheckCard,
        emitRoomWinners: emitRoomWinners,
        emitRoomLosers: emitRoomLosers,
    };
}
exports.useCommonHandlers = useCommonHandlers;
