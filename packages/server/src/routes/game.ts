import express from 'express';
import { makeID } from '@np-bingo/common';
import Game from '../models/game';

const router = express.Router();

/**
 * @route GET api/game/test/
 * @description Tests game route
 * @access Public
 */
router.get('/test', (req, res) => res.send('Game test'));

/**
 * @route GET api/game/:id
 * @description Get game by id
 * @access Public
 */
router.get('/:id', (req, res) => {
  res.send(`Game ${req.params.id}`);
});

/**
 * @route POST api/game/
 * @description Create a new game room
 * @access Public
 */
router.post('/', (req, res) => {
  let room = makeID(4);
  // TODO check unique ID against previous game IDs
  Game.create({ host: req.body, room: room })
    .then((doc) =>
      res.json({
        room: doc.room,
        host: doc.host,
        message: `Created game room ${room}`,
      })
    )
    .catch((err) => {
      console.log(err);

      res.status(400).json({ error: 'Unable to create a game room' });
    });
});

/**
 * @route PUT api/game/:id
 * @description Update game winner by room ID
 * @access Public
 */
router.put('/:id', async (req, res) => {
  try {
    await Game.findOneAndUpdate(
      { room: req.params.id },
      { $addToSet: { winners: req.body } },
      {},
      function (err, doc) {
        if (err) {
          res
            .status(400)
            .json({ error: `Error while finding game room ${req.params.id}` });
        }
        if (doc) {
          res.json({
            msg: `Game room ${req.params.id} saved`,
          });
        }
        if (!doc) {
          res
            .status(404)
            .json({ error: `Game room ${req.params.id} does not exist` });
        }
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({ error: `Unable to update game room ${req.params.id} ` });
  }
});

// TODO hinges on ID being unique, otherwise grabs first document with this ID
// TODO Will add a subdoc every time user exits and rejoins...
/**
 * @route PUT api/game/join/:id
 * @description Join game by room ID
 * @access Public
 */
router.put('/join/:id', async (req, res) => {
  try {
    await Game.findOneAndUpdate(
      { room: req.params.id },
      { $addToSet: { players: req.body } },
      {},
      function (err, doc) {
        if (err) {
          res
            .status(400)
            .json({ error: `Unable to find game room ${req.params.id}` });
        }
        if (doc) {
          res.json({
            host: doc.host,
            msg: `Joined game room ${req.params.id}`,
          });
        }
        if (!doc) {
          res
            .status(404)
            .json({ error: `Game room ${req.params.id} does not exist` });
        }
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({ error: `Unable to join game room ${req.params.id} ` });
  }
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
 * @description End game by ID
 * @access Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findOne({ room: req.params.id }).exec();
    if (game && game.players.length < 1) {
      Game.deleteOne({ _id: game._id }, {}, function (err) {
        if (err) {
          res
            .status(400)
            .json({ error: `Unable to delete game room ${game.room}` });
        } else {
          res.json({ msg: `Game room ${game.room} deleted` });
        }
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: `Unable to find game room ${req.params.id} to delete` });
  }
});

export default router;
