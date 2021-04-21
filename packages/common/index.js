"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRegex = exports.roomPattern = exports.roomChar = exports.makeID = void 0;
/**
 * Creates an id
 * @param length String length of id
 * @returns
 */
function makeID(length) {
    var i;
    var result = '';
    // exclude: I, O, 0
    var characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    for (i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
exports.makeID = makeID;
exports.roomChar = '[A-HJ-NP-Z1-9]';
exports.roomPattern = exports.roomChar + "{4}";
exports.roomRegex = new RegExp(exports.roomPattern);
