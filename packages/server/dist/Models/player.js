"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSchema = void 0;
var mongoose_1 = require("mongoose");
exports.PlayerSchema = new mongoose_1.Schema({
    uid: {
        type: Number,
        required: true,
    },
    name: String,
    socket: mongoose_1.Schema.Types.Mixed,
});
exports.default = mongoose_1.model('Player', exports.PlayerSchema);
