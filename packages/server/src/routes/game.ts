import express from 'express';
import { makeID } from '@np-bingo/common';
import Game from '../models/game';
import Active from '../models/active';

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
  // TODO Check active room ids first ?
  const room = makeID(4);
  const document = { host: req.body, room: room };
  Game.create(document)
    .then((doc) => {
      Active.create({
        gameId: doc._id,
        room: doc.room,
        name: doc.host.name,
        joinable: true,
      })
        .then(() => {
          res.json({
            id: doc._id,
            room: doc.room,
            host: doc.host,
            message: `Created game room ${room}`,
          });
        })
        .catch((err) => {
          console.log(err);

          res.status(400).json({ error: 'Unable to add active game room' });
        });
    })
    .catch((err) => {
      console.log(err);

      res.status(400).json({ error: 'Unable to create a game room' });
    });
});

/**
 * @route PUT api/game/join/:room
 * @description Join game by room ID
 * @access Public
 */
router.put('/join/:room', async (req, res) => {
  const filter = { room: req.params.room };
  const update = { $addToSet: { players: req.body } };
  try {
    const activeGame = await Active.findOne(filter);
    if (activeGame) {
      Game.findByIdAndUpdate(activeGame.gameId, update, {}, (err, doc) => {
        if (err) {
          res
            .status(400)
            .json({ error: `Unable to update game room ${req.params.room}` });
        }
        if (doc) {
          res.json({
            room: doc.room,
            host: doc.host,
            message: `Joined game room ${req.params.room}`,
          });
        }
        if (!doc) {
          res
            .status(404)
            .json({ error: `Game room ${req.params.room} does not exist` });
        }
      });
    }
    if (!activeGame) {
      res.status(404).json({ error: `Game room ${req.params.room} not found` });
    }
  } catch (err) {
    res
      .status(404)
      .json({ error: `Unable to find active game room ${req.params.room}` });
  }
});

/**
 * @route PUT api/game/:id
 * @description Update game winner by room ID
 * @access Public
 */
router.put('/:id', (req, res) => {
  const update = { $addToSet: { winners: req.body } };
  Game.findByIdAndUpdate(req.params.id, update, (err, doc) => {
    if (err) {
      res
        .status(400)
        .json({ error: `Error while finding game room ${req.params.id}` });
    }
    if (doc) {
      res.json({
        message: `Game room ${req.params.id} saved`,
      });
    }
    if (!doc) {
      res
        .status(404)
        .json({ error: `Game room ${req.params.id} does not exist` });
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
router.delete('/:id', (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => {
      Active.findOneAndDelete({ room: req.body.room })
        .then(() => {
          res.json({
            message: `Active Room ${req.body} deleted`,
          });
        })
        .catch((err) => {
          console.log(err);

          res.status(400).json({ error: 'Unable to delete active game room' });
        });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: `Unable to find game room ${req.body} to delete` });
    });
});

/**
 * @route DELETE api/game/done/:id
 * @description Remove empty game by ID
 * @access Public
 */
router.delete('/done/:room', (req, res) => {
  Active.findOneAndDelete({ room: req.params.room })
    .then(() => {
      res.json({
        message: `Active Room ${req.body} deleted`,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(400).json({ error: 'Unable to delete active game room' });
    });
});

export default router;
