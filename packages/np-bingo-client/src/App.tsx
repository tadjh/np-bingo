import React, { useEffect, useReducer } from 'react';
import socket from './Config/socket.io';
import './App.css';
import {
  INIT_GAME,
  READY_CHECK,
  START_GAME,
  END_GAME,
  CHECK_CARD_SUCCESS,
  NEW_BALL,
  UPDATE_POOL,
  STANDBY,
  VALIDATE,
  GET_CARD,
  FAILURE,
  SET_ROOM,
  JOIN_ROOM,
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_READY,
  SET_BALL,
  PLAYER_KICKED,
  PLAYER_UNREADY,
  PAUSE,
  CHECK_CARD_FAILURE,
  WIN_GAME,
} from './Constants';
import { getBall, removeBall, validateCard, getPoolSize } from './Utils/bingo';
import {
  Ball,
  Card,
  Pool,
  Results,
  Gamestate,
  Winner,
  Player,
  PlayerCard,
  Room,
  Host as RoomHost,
} from './types';
import { Switch, Route, useHistory } from 'react-router-dom';
import Host from './Views/Host';
import Play from './Views/Play';
import Home from './Views/Home';
import Join from './Views/Join';
import Create from './Views/Create';
import { State, Action, initialState, reducer } from './Reducers/app.reducer';
import {
  apiCreateRoom,
  apiDeleteRoom,
  apiSaveRoom,
  apiUpdateRoom,
} from './Api';
import features from './Config/features';

export const GameContext = React.createContext({
  gamestate: Gamestate.INIT,
  room: '',
  host: { _id: '', uid: 0, name: '', socket: '' },
});

export const BallContext = React.createContext({
  key: 0,
  number: 0,
  column: '',
  remainder: 75,
} as Ball);

function App() {
  let history = useHistory();
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );

  /**
   * Manage game state
   * @param gamestate
   */
  const play = (gamestate: Gamestate) => {
    switch (gamestate) {
      case Gamestate.INIT:
        dispatch({ type: INIT_GAME, payload: Gamestate.INIT });
        break;
      case Gamestate.READY:
        dispatch({ type: READY_CHECK, payload: Gamestate.READY });
        break;
      case Gamestate.STANDBY:
        dispatch({ type: STANDBY, payload: Gamestate.STANDBY });
        break;
      case Gamestate.START:
        dispatch({ type: START_GAME, payload: Gamestate.START });
        checkPoolSize(); // TODO Does this even do anything?
        break;
      case Gamestate.VALIDATE:
        dispatch({ type: VALIDATE, payload: Gamestate.VALIDATE });
        break;
      case Gamestate.PAUSE:
        dispatch({ type: PAUSE, payload: Gamestate.PAUSE });
        break;
      case Gamestate.FAILURE:
        dispatch({ type: FAILURE, payload: Gamestate.FAILURE });
        break;
      case Gamestate.WIN:
        dispatch({ type: WIN_GAME, payload: Gamestate.WIN });
        break;
      case Gamestate.END:
        dispatch({ type: END_GAME, payload: Gamestate.END });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  };

  /**
   * Player: Initialize Game
   */
  const init = () => {
    play(Gamestate.INIT);
  };

  /**
   * Player: Set standby
   */
  const standby = () => {
    play(Gamestate.STANDBY);

    // TODO This info should be set when player loads app
    let player = {
      uid: 2222,
      name: 'Jane Doe',
      socket: socket.id,
    };
    socket.emit('ready-up', state.host.socket, player);
  };

  /**
   * Host: Three way toggle for main button
   * @param gamestate Gamestate
   * @param room Room
   */
  const gameToggle = (gamestate: Gamestate, room: Room) => {
    switch (gamestate) {
      case Gamestate.READY:
        play(Gamestate.STANDBY);
        socket.emit('standby', room);
        break;
      case Gamestate.END:
        play(Gamestate.READY);
        socket.emit('ready', room);
        break;
      default:
        dispatch({ type: PLAYER_UNREADY });
        play(Gamestate.END);
        socket.emit('end', room);
        break;
    }
  };

  useEffect(() => {
    // Socket.io events

    /**
     * To Host: Player joined
     * @param player Player
     */
    socket.on('player-joined', (player: Player) => {
      console.log(`${player.name} joined`);
      dispatch({ type: PLAYER_JOINED, payload: player });
    });

    /**
     * To Host: Player left
     * @param player Player
     */
    socket.on('player-left', (player: Player) => {
      console.log(`${player.name} left`);
      dispatch({ type: PLAYER_LEFT, payload: player });
    });

    /**
     * To Player: Host left
     */
    // TODO Dialog when host leaves

    /**
     * To Player: Removed from game
     */
    socket.on('player-remove', () => {
      console.log(`You have been removed from the room`);
      dispatch({ type: PLAYER_KICKED, payload: true });
    });

    /**
     * To Host: Player is ready
     * @param player Player
     */
    socket.on('player-ready', (player: Player) => {
      console.log(`${player.name} ready`);
      dispatch({ type: PLAYER_READY, payload: player });
    });

    /**
     * To Room: Ready check
     */
    socket.on('game-ready', () => {
      console.log('Pick a card');
      play(Gamestate.READY);
    });

    /**
     * To Room: Standby for first ball
     */
    socket.on('game-standby', () => {
      console.log('Game starting shortly...');
      play(Gamestate.STANDBY);
    });

    /**
     * To Room: Game start
     */
    socket.on('game-start', () => {
      console.log('Game started');
      play(Gamestate.START);
    });

    /**
     * To Room: Ball Dispensed
     * @param ball Ball
     */
    socket.on('game-ball', (ball: Ball) => {
      console.log(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
      dispatch({ type: SET_BALL, payload: ball });
    });

    /**
     * To Host: Receive Card
     * @param room Room
     * @param player Player
     * @param card Card
     */
    socket.on('receive-card', (room: Room, player: Player, card: Card) => {
      console.log(`${player.name} sent a card to you.`);
      play(Gamestate.VALIDATE);
      socket.emit('checking-card', room, player);
      dispatch({ type: GET_CARD, payload: { card: card, owner: player } });
    });

    /**
     * To Room: Notify a card is being checked
     */
    socket.on('game-validation', () => {
      console.log(
        `A card has been sent to the host. Checking if it's a winner!`
      );
      play(Gamestate.PAUSE);
    });

    /**
     * To Player: Winner
     * @param winner Winner
     */
    socket.on('winner', (room: Room, winner: Winner) => {
      play(Gamestate.END);
      console.log(`You won the game!`);

      socket.emit('win', room, winner.player.name);

      dispatch({
        type: CHECK_CARD_SUCCESS,
        payload: {
          gamestate: Gamestate.END,
          winner: winner,
        },
      });
    });

    /**
     * To Room: Broadcast Winner
     * @param username string
     */
    socket.on('game-win', (username) => {
      console.log(`${username} won the game!`);
      // TODO Show winner name on win
      play(Gamestate.END);
    });

    /**
     * To Room: Continue
     */
    socket.on('game-continue', () => {
      console.log('Not a winner...');
      play(Gamestate.START);
    });

    /**
     * To Room: Game End
     */
    socket.on('game-end', () => {
      console.log('Game over!');
      play(Gamestate.END);
    });
  }, []); //only re-run the effect if new data comes in

  /**
   * Host: Create a new game room
   */
  const createRoom = () => {
    let host = {
      uid: 1111,
      name: 'John Tester',
      socket: socket.id,
    };
    play(Gamestate.READY);

    apiCreateRoom(host, (res) => {
      dispatch({
        type: SET_ROOM,
        payload: { room: res.data.game.room, host: res.data.game.host },
      });

      socket.emit('create-room', res.data.game.room);

      history.push(`/host?r=${res.data.game.room}`);
    });
  };

  /**
   * Player: Join game by room code
   * @param room Room code
   */
  const joinRoom = (room: string) => {
    // TODO This info should be set when user loads app
    let player = {
      _id: 'adaskdjsahkd',
      uid: 2222,
      name: 'Jane Doe',
      socket: socket.id,
    };

    play(Gamestate.READY);

    apiUpdateRoom(room, player, (res) => {
      socket.emit('join-room', room, res.data.host.socket, player);

      dispatch({
        type: JOIN_ROOM,
        payload: { room: room, host: res.data.host },
      });
    });
  };

  /**
   * Player: Leave room by room code and tell host
   * @param room Room code
   * @param host Room host
   */
  const leaveRoom = (room: string, host?: RoomHost) => {
    play(Gamestate.INIT);

    if (host) {
      // Player

      // TODO This info should be set when user loads app
      let player = {
        uid: 2222,
        name: 'Jane Doe',
        socket: socket.id,
      };

      socket.emit('leave-room', room, host.socket, player);
    } else {
      // Host
      socket.emit('leave-room', room);

      apiDeleteRoom(room);
    }
  };

  /**
   * Remove player from room
   * @param player Player socket id
   */
  const removePlayer = (player: Player) => {
    socket.emit('remove-player', player);
    dispatch({ type: PLAYER_LEFT, payload: player });
  };

  /**
   * Get size of pool
   */
  // TODO Is this necessary?
  const checkPoolSize = () => {
    let pool: Pool = state.pool;
    let { remainder } = getPoolSize(pool);
    dispatch({ type: UPDATE_POOL, payload: remainder });
  };

  /**
   * Retrieves a new Bingo ball from the remaining pool of balls.
   * Returns undefined if pool is empty.
   */
  const newBall = () => {
    let gamestate: Gamestate = state.gamestate;
    let pool: Pool = [...state.pool];
    let draws: Pool = [...state.draws];
    let ball = getBall(pool);

    if (ball.number !== 0) {
      pool = removeBall(pool, ball);

      draws[ball.key].push(ball.number);
    }

    // These probably belong somewhere else outside of this funciton
    if (gamestate === Gamestate.STANDBY || gamestate === Gamestate.FAILURE) {
      play(Gamestate.START);
      socket.emit('start', state.room);
    }

    dispatch({
      type: NEW_BALL,
      payload: {
        ball: ball,
        draws: draws,
        pool: pool,
      },
    });
    socket.emit('ball', state.room, ball);

    if (ball.remainder === 0) {
      play(Gamestate.END);
      socket.emit('end', state.room);
    }
  };

  /**
   * Player: Send card to host
   * @param card
   * @param host
   */
  const sendCard = (room: Room, host: RoomHost, card: Card) => {
    // TODO This info should be set when user loads app
    let player = {
      uid: 2222,
      name: 'Jane Doe',
      socket: socket.id,
    };
    play(Gamestate.VALIDATE);
    socket.emit('send-card', room, host.socket, player, card);
  };

  /**
   * Checks if input card is a winner
   * @param playerCard Input card to be checked and owner of card
   * @param draws Pool of bingo balls that have already been drawn
   */
  const checkCard = (playerCard: PlayerCard, draws: Pool) => {
    // TODO Add rulesets
    let data: Results = validateCard(playerCard.card, draws);
    const methods = Object.keys(data).filter(function (items) {
      return data[items];
    });

    if (methods.length > 0) {
      let winner = {
        methods: methods,
        data: data,
        player: playerCard.owner,
        card: playerCard.card,
      };

      dispatch({
        type: CHECK_CARD_SUCCESS,
        payload: {
          gamestate: Gamestate.END,
          winner: winner,
        },
      });
      socket.emit('winning-card', state.room, winner);
      // TODO UPDATE SERVER

      apiSaveRoom(room, winner);
    } else {
      dispatch({
        type: CHECK_CARD_FAILURE,
        payload: Gamestate.FAILURE,
      });
      socket.emit('losing-card', state.room);
    }
  };

  let {
    gamestate,
    ball,
    draws,
    playerCard,
    winner,
    room,
    players,
    kicked,
    host,
  } = state;

  let game = { gamestate: gamestate, room: room, host: host };

  return (
    <GameContext.Provider value={game}>
      <BallContext.Provider value={ball}>
        <div className="App">
          <Switch>
            <Route path="/create">
              <Create></Create>
            </Route>
            <Route path="/host">
              <Host
                checkCard={() => checkCard(playerCard, draws)}
                newBall={newBall}
                draws={draws}
                leaveRoom={leaveRoom}
                players={players}
                gameToggle={gameToggle}
                removePlayer={removePlayer}
              ></Host>
            </Route>
            <Route path="/join">
              <Join joinRoom={joinRoom} />
            </Route>
            <Route path="/play">
              <Play
                gamestate={gamestate}
                init={init}
                standby={standby}
                leaveRoom={leaveRoom}
                kicked={kicked}
                sendCard={sendCard}
                winner={winner}
              ></Play>
            </Route>
            <Route exact path="/">
              <Home joinRoom={joinRoom} createRoom={createRoom} />
            </Route>
          </Switch>
        </div>
      </BallContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
