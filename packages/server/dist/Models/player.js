"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSchema = void 0;
var mongoose_1 = require("mongoose");
exports.PlayerSchema = new mongoose_1.Schema({
    uid: Number,
    name: String,
    socketId: String,
    ready: Boolean,
    kicked: Boolean,
    leave: Boolean,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Player', exports.PlayerSchema);
