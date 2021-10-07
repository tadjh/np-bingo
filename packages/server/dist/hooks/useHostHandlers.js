"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHostHandlers = void 0;
var useCommonHandlers_1 = require("./useCommonHandlers");
function useHostHandlers(io, socket) {
    var _a = (0, useCommonHandlers_1.useCommonHandlers)(io, socket), emitLeaveRoom = _a.emitLeaveRoom, emitRoomGamestate = _a.emitRoomGamestate, emitRoomNewBall = _a.emitRoomNewBall, emitRoomWinners = _a.emitRoomWinners, emitRoomLosers = _a.emitRoomLosers;
    /**
     * Host: Create room and join it
     * @param room
     */
    var createRoom = function (room, username) {
        console.log("Room " + room + ": " + username + " created room");
        socket.join(room);
    };
    /**
     * To Room: Host leaving room
     * @param room
     */
    var hostLeaveRoom = function (room) {
        socket.to(room).emit('host:event', 'left-room');
        emitLeaveRoom(room, 'Host');
    };
    /**
     * Host: Kick player from room
     * @param player
     */
    var kickPlayer = function (room, player) {
        if (player.socketId === null)
            return console.log("Room " + room + ": " + player.name + " could not be kicked. Invalid socket.");
        io.to(player.socketId).emit('host:event', 'kick-player');
        console.log("Room " + room + ": " + player.name + " kicked");
    };
    /**
     * To Room: New Gamestate
     * @param gamestate
     * @param room
     */
    var hostGamestate = function (room, gamestate) {
        switch (gamestate) {
            case 'ready':
                console.log("Room " + room + ": Waiting for players to ready up");
                break;
            case 'standby':
                console.log("Room " + room + ": Game beginning...");
                break;
            case 'start':
                console.log("Room " + room + ": Game started");
                break;
            case 'end':
                console.log("Room " + room + ": Game over!");
                break;
            default:
                break;
        }
        emitRoomGamestate(room, gamestate);
    };
    /**
     * To Room: New ball dispensed
     * @param room
     * @param ball
     */
    var dispenseBall = function (room, ball) {
        console.log("Room " + room + ": Ball " + ball.column.toUpperCase() + ball.number + " dispensed");
        emitRoomNewBall(room, ball);
    };
    var winningCards = function (room, winners) {
        var winnerNames = winners.map(function (winner) {
            if (!winner.player.socketId)
                return { name: winner.player.name, socketId: '' };
            console.log("Room " + room + ": " + winner.player.name + " has BINGO!");
            io.to(winner.player.socketId).emit('host:event', 'winning-cards', winner);
            return { name: winner.player.name, socketId: winner.player.socketId };
        });
        emitRoomWinners(room, winnerNames);
    };
    var losingCards = function (room, losers) {
        var loserNames = losers.map(function (loser) {
            if (!loser.socketId)
                return loser.name;
            console.log("Room " + room + ": " + loser.name + " does not have BINGO...");
            // io.to(loser.socketId).emit('host:event', 'losing-cards');
            return loser.name;
        });
        emitRoomLosers(room, loserNames);
    };
    /**
     * Host Events Listener
     * @param event
     * @param room
     * @param payload
     */
    var hostEventsListener = function (event, room, payload) {
        switch (event) {
            case 'create-room':
                createRoom(room, payload);
                break;
            case 'leave-room':
                hostLeaveRoom(room);
                break;
            case 'kick-player':
                kickPlayer(room, payload);
                break;
            case 'sync-gamestate':
                hostGamestate(room, payload);
                break;
            case 'dispense-ball':
                dispenseBall(room, payload);
                break;
            case 'winning-cards':
                winningCards(room, payload);
                break;
            case 'losing-cards':
                losingCards(room, payload);
                break;
            default:
                throw new Error('Invalid Host Event');
        }
    };
    return {
        hostEventsListener: hostEventsListener,
    };
}
exports.useHostHandlers = useHostHandlers;
