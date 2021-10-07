"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ActiveSchema = new mongoose_1.Schema({
    gameId: String,
    room: String,
    name: String,
    // count: Number,
    // private: Boolean,
    joinable: Boolean,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Active', ActiveSchema);
