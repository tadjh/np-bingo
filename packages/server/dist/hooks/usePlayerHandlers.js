"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayerHandlers = void 0;
var useCommonHandlers_1 = require("./useCommonHandlers");
function usePlayerHandlers(io, socket) {
    var _a = (0, useCommonHandlers_1.useCommonHandlers)(io, socket), emitLeaveRoom = _a.emitLeaveRoom, emitRoomCheckCard = _a.emitRoomCheckCard;
    /**
     * To Host: Player Join room
     * @param room
     * @param hostSocketId
     * @param player
     */
    var joinRoom = function (room, hostSocketId, player) {
        socket.join(room);
        socket.data = { room: room, player: player, host: hostSocketId };
        console.log("Room " + room + ": " + player.name + " joined");
        io.to(hostSocketId).emit('host:player-event', 'join-room', player);
    };
    /**
     * To Host: Player Leave Room
     * @param room
     * @param hostSocketId
     * @param player
     */
    var playerLeaveRoom = function (room, hostSocketId, player) {
        io.to(hostSocketId).emit('host:player-event', 'leave-room', player);
        emitLeaveRoom(room, player.name);
    };
    /**
     * Kick player from room
     * @param room Room
     * @param player Player
     */
    var playerKicked = function (room) {
        socket.leave(room);
    };
    /**
     * To Host: Player is Ready
     * @param room
     * @param hostSocketId
     * @param player
     */
    var readyUp = function (room, hostSocketId, player) {
        console.log("Room " + room + ": " + player.name + " is ready");
        io.to(hostSocketId).emit('host:player-event', 'ready-up', player);
    };
    /**
     * To Host & Room: Player sent a card
     * @param room
     * @param hostSocketId
     * @param player
     * @param card
     */
    var sendCard = function (room, hostSocketId, playerCard) {
        console.log("Room " + room + ": " + playerCard.owner.name + " sent a card");
        io.to(hostSocketId).emit('host:player-event', 'send-card', playerCard);
        emitRoomCheckCard(room, playerCard.owner.name);
    };
    /**
     * Player: Event listener
     * @param event
     * @param room
     * @param hostSocketId
     * @param player
     * @param card (optional)
     */
    var playerEventsListener = function (event, room, hostSocketId, payload) {
        switch (event) {
            case 'join-room':
                joinRoom(room, hostSocketId, payload);
                break;
            case 'leave-room':
                playerLeaveRoom(room, hostSocketId, payload);
                break;
            case 'kick-player':
                playerKicked(room);
                break;
            case 'ready-up':
                readyUp(room, hostSocketId, payload);
                break;
            case 'send-card':
                sendCard(room, hostSocketId, payload);
                break;
            default:
                throw new Error('Invalid player event');
        }
    };
    return { playerEventsListener: playerEventsListener, playerLeaveRoom: playerLeaveRoom };
}
exports.usePlayerHandlers = usePlayerHandlers;
