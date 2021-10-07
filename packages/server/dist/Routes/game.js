"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var common_1 = require("@np-bingo/common");
var game_1 = __importDefault(require("../models/game"));
var active_1 = __importDefault(require("../models/active"));
var router = express_1.default.Router();
/**
 * @route GET api/game/test/
 * @description Tests game route
 * @access Public
 */
router.get('/test', function (req, res) { return res.send('Game test'); });
/**
 * @route GET api/game/:id
 * @description Get game by id
 * @access Public
 */
router.get('/:id', function (req, res) {
    res.send("Game " + req.params.id);
});
/**
 * @route POST api/game/
 * @description Create a new game room
 * @access Public
 */
router.post('/', function (req, res) {
    // TODO Check active room ids first ?
    var room = (0, common_1.makeID)(4);
    var document = { host: req.body, room: room };
    game_1.default.create(document)
        .then(function (doc) {
        active_1.default.create({
            gameId: doc._id,
            room: doc.room,
            name: doc.host.name,
            joinable: true,
        })
            .then(function () {
            res.json({
                id: doc._id,
                room: doc.room,
                host: doc.host,
                message: "Created game room " + room,
            });
        })
            .catch(function (err) {
            console.log(err);
            res.status(400).json({ error: 'Unable to add active game room' });
        });
    })
        .catch(function (err) {
        console.log(err);
        res.status(400).json({ error: 'Unable to create a game room' });
    });
});
/**
 * @route PUT api/game/join/:room
 * @description Join game by room ID
 * @access Public
 */
router.put('/join/:room', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, update, activeGame, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filter = { room: req.params.room };
                update = { $addToSet: { players: req.body } };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, active_1.default.findOne(filter)];
            case 2:
                activeGame = _a.sent();
                if (activeGame) {
                    game_1.default.findByIdAndUpdate(activeGame.gameId, update, {}, function (err, doc) {
                        if (err) {
                            res
                                .status(400)
                                .json({ error: "Unable to update game room " + req.params.room });
                        }
                        if (doc) {
                            res.json({
                                room: doc.room,
                                host: doc.host,
                                message: "Joined game room " + req.params.room,
                            });
                        }
                        if (!doc) {
                            res
                                .status(404)
                                .json({ error: "Game room " + req.params.room + " does not exist" });
                        }
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res
                    .status(404)
                    .json({ error: "Unable to find active game room " + req.params.room });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @route PUT api/game/:id
 * @description Update game winner by room ID
 * @access Public
 */
router.put('/:id', function (req, res) {
    var update = { $addToSet: { winners: req.body } };
    game_1.default.findByIdAndUpdate(req.params.id, update, function (err, doc) {
        if (err) {
            res
                .status(400)
                .json({ error: "Error while finding game room " + req.params.id });
        }
        if (doc) {
            res.json({
                message: "Game room " + req.params.id + " saved",
            });
        }
        if (!doc) {
            res
                .status(404)
                .json({ error: "Game room " + req.params.id + " does not exist" });
        }
    });
});
// router.put('/leave/:id', async (req, res) => {
//   try {
//     await Game.findByIdAndUpdate(
//       { room: req.params.id },
//       { $pull: { 'players.uid': req.body.uid } },
//       function (err, result) {
//         if (err) {
//           res
//             .status(400)
//             .json({ error: `Unable to leave game room ${req.params.id}` });
//         } else {
//           res.json({
//             host: result.host,
//             msg: `Left game room ${req.params.id}`,
//           });
//         }
//       }
//     );
//   } catch (err) {
//     res
//       .status(400)
//       .json({ error: `Unable to leave game room ${req.params.id} ` });
//   }
// });
/**
 * @route DELETE api/game/:id
 * @description Remove empty game by ID
 * @access Public
 */
router.delete('/:id', function (req, res) {
    game_1.default.findByIdAndDelete(req.params.id)
        .then(function () {
        active_1.default.findOneAndDelete({ room: req.body.room })
            .then(function () {
            res.json({
                message: "Room " + req.body + " deleted",
            });
        })
            .catch(function (err) {
            console.log(err);
            res.status(400).json({ error: 'Unable to delete active game room' });
        });
    })
        .catch(function (err) {
        res
            .status(400)
            .json({ error: "Unable to find game room " + req.body + " to delete" });
    });
});
exports.default = router;
