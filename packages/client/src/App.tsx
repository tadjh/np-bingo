import React, { useCallback, useEffect, useReducer, useState } from 'react';
import socket from './Config/socket.io';
import './App.css';
import {
  INIT_GAME,
  READY_CHECK,
  START_GAME,
  END_GAME,
  CHECK_CARD_SUCCESS,
  NEW_BALL,
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
  UPDATE_GAMEMODE,
  LOOP_START,
  LOOP_STOP,
} from './Constants';
import { getBall, removeBall, validateCard } from './Utils/bingo';
import {
  Action,
  AppState as State,
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
  Gamemode,
} from '@np-bingo/types';
import { Switch, Route, useHistory } from 'react-router-dom';
import Host from './Views/Host';
import Play from './Views/Play';
import Home from './Views/Home';
import Join from './Views/Join';
import Create from './Views/Create';
import { initialState, reducer } from './Reducers/app.reducer';
import {
  apiCreateRoom,
  apiDeleteRoom,
  apiSaveRoom,
  apiUpdateRoom,
} from './Api';
import { useQuery } from './Utils/custom-hooks';
import config from './Config/features';

export const GameContext = React.createContext({
  gamestate: initialState.gamestate,
  room: initialState.room,
  host: { ...initialState.host },
  mode: initialState.rules.mode,
});

export const BallContext = React.createContext({
  ball: { ...initialState.ball },
  loop: initialState.loop,
  progress: 0,
});

function App() {
  let history = useHistory();
  let query = useQuery();
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );
  const [progress, setProgress] = useState(0);

  /**
   * Manage game state
   * @param gamestate
   */
  const play = useCallback((gamestate: Gamestate) => {
    switch (gamestate) {
      case 'init':
        dispatch({ type: INIT_GAME });
        break;
      case 'ready':
        dispatch({ type: READY_CHECK });
        break;
      case 'standby':
        dispatch({ type: STANDBY });
        break;
      case 'start':
        dispatch({ type: START_GAME });
        break;
      case 'validate':
        dispatch({ type: VALIDATE });
        break;
      case 'pause':
        dispatch({ type: PAUSE });
        break;
      case 'failure':
        dispatch({ type: FAILURE });
        break;
      case 'win':
        dispatch({ type: WIN_GAME });
        break;
      case 'end':
        dispatch({ type: END_GAME });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  }, []);

  /**
   * Player: Initialize Game
   */
  const init = () => {
    play('init');
  };

  /**
   * Player: Set standby
   */
  const standby = (mode: Gamemode) => {
    play('standby');

    // TODO This info should be set when player loads app
    let player = {
      uid: 2222,
      name: 'Jane Doe',
      socket: socket.id,
    };
    mode !== 'solo'
      ? socket.emit('ready-up', state.host.socket, player)
      : solo('standby');
  };

  /**
   * Host: Start game
   * @param room
   * @param mode
   */
  const start = (room: Room) => {
    play('start');
    socket.emit('start', room);
  };

  /**
   * Host: Three way toggle for main button
   * @param gamestate Gamestate
   * @param room Room
   */
  const gameToggle = (gamestate: Gamestate, room: Room) => {
    switch (gamestate) {
      case 'ready':
        play('standby');
        socket.emit('standby', room);
        break;
      case 'end':
        play('ready');
        socket.emit('ready', room);
        break;
      default:
        dispatch({ type: PLAYER_UNREADY });
        play('end');
        socket.emit('end', room);
        break;
    }
  };

  /**
   * Update game mode
   * @param gamemode
   */
  const mode = (gamemode: Gamemode) => {
    switch (gamemode) {
      case 'default':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'default' });
        break;
      case 'solo':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'solo' });
        break;
      case 'death':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'death' });
        break;
      case 'blackout':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'blackout' });
        break;
      default:
        throw new Error('Invalid game mode.');
    }
  };

  /**
   * Socket.io Side-effects
   */
  useEffect(() => {
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
      play('ready');
    });

    /**
     * To Room: Standby for first ball
     */
    socket.on('game-standby', () => {
      console.log('Game starting shortly...');
      play('standby');
    });

    /**
     * To Room: Game start
     */
    socket.on('game-start', () => {
      console.log('Game started');
      play('start');
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
      play('validate');
      socket.emit('checking-card', room);
      dispatch({ type: GET_CARD, payload: { card: card, owner: player } });
    });

    /**
     * To Room: Notify a card is being checked
     */
    socket.on('game-validation', () => {
      console.log(
        `A card has been sent to the host. Checking if it's a winner!`
      );
      play('pause');
    });

    /**
     * To Player: Winner
     * @param winner Winner
     */
    socket.on('winner', (room: Room, winner: Winner) => {
      console.log(`You won the game!`);

      socket.emit('win', room, winner.player.name);

      dispatch({
        type: CHECK_CARD_SUCCESS,
        payload: winner,
      });
    });

    /**
     * To Room: Broadcast Winner
     * @param username string
     */
    socket.on('game-win', (username) => {
      console.log(`${username} won the game!`);
      // TODO Show winner name on win ?
      // play('win');
    });

    /**
     * To Room: Continue
     */
    socket.on('game-continue', () => {
      console.log('Not a winner...');
      play('start');
    });

    /**
     * To Room: Game End
     */
    socket.on('game-end', () => {
      console.log('Game over!');
      play('end');
    });
  }, [play]);

  /**
   * Host: Create a new game room
   */
  const createRoom = () => {
    let host = {
      uid: 1111,
      name: 'John Tester',
      socket: socket.id,
    };
    play('ready');

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
    };

    play('ready');

    apiUpdateRoom(room, player, (res) => {
      socket.emit('join-room', room, res.data.host.socket, {
        ...player,
        socket: socket.id,
      });

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
    play('init');

    if (host) {
      // Player

      // TODO This info should be set when user loads app
      let player = {
        _id: 'adaskdjsahkd',
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
  // const checkPoolSize = () => {
  //   let pool: Pool = state.pool;
  //   let { remainder } = getPoolSize(pool);
  //   dispatch({ type: UPDATE_POOL, payload: remainder });
  // };

  /**
   * Retrieves a new Bingo ball from the remaining pool of balls.
   * Returns undefined if pool is empty.
   * @param mode
   * @param pool
   * @param draws
   * @param room (Optional)
   */
  const newBall = useCallback(
    (
      mode: Gamemode,
      pool: Pool,
      draws: Pool,
      room?: Room,
      callback?: (...args: any[]) => void
    ) => {
      let poolArray = [...pool];
      let drawsArray = [...draws];
      let ball = getBall(pool);

      if (ball.number !== 0) {
        poolArray = removeBall(pool, ball);
        drawsArray[ball.key].push(ball.number);
      }

      dispatch({
        type: NEW_BALL,
        payload: {
          ball: ball,
          draws: drawsArray,
          pool: poolArray,
        },
      });
      mode !== 'solo' && room && socket.emit('ball', room, ball);

      if (ball.remainder === 0) {
        play('end');
        mode !== 'solo' && room && socket.emit('end', room);
      }

      callback && callback(ball);
    },
    [play]
  );

  /**
   * Single Player Loop
   */
  useEffect(() => {
    if (state.loop && state.ball.remainder !== 0) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 9.17
        );
      }, config['ball-delay'] / 12);

      const timeout = setTimeout(() => {
        clearInterval(timer);

        newBall('solo', state.pool, state.draws, undefined, (ball: Ball) => {
          setProgress(0);

          console.log(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
          if (ball.remainder === 0) {
            dispatch({ type: LOOP_STOP });
            console.log('Game over');
          }
        });
      }, config['ball-delay']);
      return () => clearTimeout(timeout);
    }
  }, [newBall, state.ball.remainder, state.draws, state.loop, state.pool]);

  /**
   * Player: Send card to host
   * @param card
   * @param host
   */
  const sendCard = (room: Room, host: RoomHost, card: Card) => {
    // TODO This info should be set when user loads app
    let player = {
      _id: 'adaskdjsahkd',
      uid: 2222,
      name: 'Jane Doe',
      socket: socket.id,
    };
    play('validate');
    socket.emit('send-card', room, host.socket, player, card);
  };

  /**
   * Checks if input card is a winner
   * @param playerCard Input card to be checked and owner of card
   * @param draws Pool of bingo balls that have already been drawn
   * @param room Room code
   */
  const checkCard = (playerCard: PlayerCard, draws: Pool, room: Room) => {
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
        payload: winner,
      });
      socket.emit('winning-card', room, winner);
      apiSaveRoom(room, winner);
    } else {
      dispatch({ type: CHECK_CARD_FAILURE });
      socket.emit('losing-card', room);
    }
  };

  const solo = (gamestate: Gamestate) => {
    switch (gamestate) {
      case 'init':
        mode('solo');
        play('ready');
        break;
      case 'standby':
        play('start');
        dispatch({ type: LOOP_START });
        break;
      default:
        throw new Error('Invalid game state in solo.');
    }
  };

  let {
    gamestate,
    ball,
    draws,
    pool,
    playerCard,
    winner,
    room,
    players,
    kicked,
    host,
    rules,
    loop,
  } = state;

  let gameContext = {
    gamestate: gamestate,
    room: room,
    host: host,
    mode: rules.mode,
  };
  let ballContext = { ball: ball, loop: loop, progress: progress };

  return (
    <GameContext.Provider value={gameContext}>
      <BallContext.Provider value={ballContext}>
        <div className="App">
          <Switch>
            <Route path="/create">
              <Create></Create>
            </Route>
            <Route path="/host">
              <Host
                checkCard={() => checkCard(playerCard, draws, room)}
                newBall={() => newBall(rules.mode, pool, draws, room)}
                draws={draws}
                leaveRoom={leaveRoom}
                players={players}
                gameToggle={gameToggle}
                removePlayer={removePlayer}
                start={start}
              ></Host>
            </Route>
            <Route path="/join">
              <Join
                joinRoom={joinRoom}
                queryRoom={query.get('r')}
                solo={solo}
              />
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
