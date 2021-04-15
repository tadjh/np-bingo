"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnerSchema = void 0;
var mongoose_1 = require("mongoose");
var player_1 = require("./player");
exports.WinnerSchema = new mongoose_1.Schema({
    methods: [String],
    data: {
        column: mongoose_1.Schema.Types.Mixed,
        diagonal: mongoose_1.Schema.Types.Mixed,
        row: mongoose_1.Schema.Types.Mixed,
    },
    player: player_1.PlayerSchema,
    card: [Number],
});
exports.default = mongoose_1.model('Winner', exports.WinnerSchema);
