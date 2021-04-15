"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StatusSchema = new mongoose_1.Schema({
    public: [
        {
            room: String,
            name: String,
            count: Number,
        },
    ],
});
exports.default = mongoose_1.model('Status', StatusSchema);
