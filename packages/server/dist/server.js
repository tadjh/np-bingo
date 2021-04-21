"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var db_1 = __importDefault(require("./Config/db"));
// routes
var game_1 = __importDefault(require("./Routes/game"));
var app = express_1.default();
var httpServer = http_1.createServer(app);
/**
 * Socket.io CORS
 */
// TODO set origin to production server
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});
db_1.default();
// middleware
/**
 * REST Api CORS
 */
app.use(cors_1.default({ origin: process.env.ORIGIN, credentials: true })); // TODO is this duplicaton with line 7?
app.use(express_1.default.json());
// use Routes
app.get('/api/', function (req, res) {
    res.send('Hello World!');
});
app.use('/api/game/', game_1.default);
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
    /**
     * From Host: Create room
     * @param room Room
     */
    socket.on('create-room', function (room) {
        socket.join(room);
        console.log("User created room " + room);
    });
    /**
     * From Player: Join room
     * @param room Room
     * @param host
     * @param player
     */
    socket.on('join-room', function (room, host, player) {
        // TODO Prevent room join if host is already playing
        socket.join(room);
        console.log("Player joined " + room);
        io.to(host).emit('player-joined', player);
    });
    /**
     * From Host or Player: Leave room
     * @param room
     * @param host (Optional) Socket ID
     */
    socket.on('leave-room', function (room, hostSocketId, player) {
        socket.leave(room);
        // Only resolves true when non-host leaves
        if (hostSocketId && player) {
            console.log("Player left " + room);
            io.to(hostSocketId).emit('player-left', player);
        }
        else {
            console.log("Host left " + room);
            socket.to(room).emit('host-left');
        }
    });
    /**
     * From Host: Remove player from room
     */
    socket.on('remove-player', function (player) {
        if (player.socket) {
            io.to(player.socket).emit('player-remove');
            console.log(player.name + " removed from room");
        }
        else {
            console.log(player.name + " socket not found in remove player");
        }
    });
    /**
     * From Player: Player is ready
     * @param hostSocketId Host Socket ID
     * @param player IPlayer
     */
    socket.on('ready-up', function (hostSocketId, player) {
        console.log(player.name + " is ready");
        io.to(hostSocketId).emit('player-ready', player);
    });
    /**
     * From Host: Ready Check
     * @param room Room
     */
    socket.on('ready', function (room) {
        console.log('Waiting for players to ready up');
        socket.to(room).emit('game-ready');
    });
    /**
     * From Host: On Standby
     * @param room Room
     */
    socket.on('standby', function (room) {
        socket.to(room).emit('game-standby');
        console.log('Game beginning...');
    });
    /**
     * From Host: Game Started
     * @param room Room
     */
    socket.on('start', function (room) {
        socket.to(room).emit('game-start');
        console.log('Game started');
    });
    /**
     * From Host: Ball dispensed
     * @param room Room
     * @param ball Ball
     */
    socket.on('ball', function (room, ball) {
        socket.to(room).emit('game-ball', ball);
        console.log("Ball: " + ball.column.toUpperCase() + ball.number);
    });
    /**
     * From Player: Send Card
     * @param room Room
     * @param hostSocketId Socket ID
     * @param player IPlayer
     *     @param card Card
     */
    socket.on('send-card', function (room, hostSocketId, player, card) {
        io.to(hostSocketId).emit('receive-card', room, player, card);
        console.log(player.name + " sent card to host");
    });
    /**
     * From Host: Checking Card
     * @param room Room
     * @param player IPlayer
     */
    socket.on('checking-card', function (room) {
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
    socket.on('winning-card', function (room, winner) {
        if (winner.player.socket) {
            io.to(winner.player.socket).emit('winner', room, {
                player: winner.player,
                card: winner.card,
                methods: winner.methods,
                data: winner.data,
            });
            console.log('Bingo!');
        }
        else {
            console.log(winner.player.name + " socket not found in wininng card");
        }
    });
    /**
     * From Player: Won
     * @param room Room
     * @param name Winner name
     */
    socket.on('win', function (room, name) {
        socket.to(room).emit('game-win', name);
    });
    /**
     * From Host: Continue Game
     * @param room Room
     */
    socket.on('losing-card', function (room) {
        socket.to(room).emit('game-continue');
        console.log('The card is not a winner...');
    });
    /**
     * From Host: Game Over!
     * @param room Room
     */
    socket.on('end', function (room) {
        socket.to(room).emit('game-end');
        console.log('Game over!');
    });
});
var port = process.env.PORT || 8082;
httpServer.listen(port, function () {
    console.log("Listening on port " + port);
});
