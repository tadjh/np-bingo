"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var serve_favicon_1 = __importDefault(require("serve-favicon"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var config_1 = require("./config");
var db_1 = __importDefault(require("./config/db"));
var hooks_1 = require("./hooks");
// routes
var game_1 = __importDefault(require("./routes/game"));
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
/**
 * Socket.io CORS
 */
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: config_1.ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});
(0, db_1.default)();
// middleware
app.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, 'public', 'favicon.ico')));
/**
 * REST Api CORS
 */
app.use((0, cors_1.default)({ origin: config_1.ORIGIN, credentials: true }));
app.use(express_1.default.json());
// use Routes
app.get('/api/', function (req, res) {
    res.send('Hello World!');
});
app.use('/api/game/', game_1.default);
io.on('connection', function (socket) {
    var hostEventsListener = (0, hooks_1.useHostHandlers)(io, socket).hostEventsListener;
    var playerEventsListener = (0, hooks_1.usePlayerHandlers)(io, socket).playerEventsListener;
    console.log('User connected');
    socket.on('disconnect', function () {
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
var port = config_1.PORT || 8082;
httpServer.listen(port, function () {
    console.log("Listening on port " + port);
});
