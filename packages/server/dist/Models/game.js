"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var player_1 = require("./player");
var winner_1 = require("./winner");
var GameSchema = new mongoose_1.Schema({
    room: String,
    host: player_1.PlayerSchema,
    players: [player_1.PlayerSchema],
    winners: [winner_1.WinnerSchema],
});
exports.default = mongoose_1.model('Game', GameSchema);
