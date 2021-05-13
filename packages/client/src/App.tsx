import React, { useCallback, useEffect, useReducer, useState } from 'react';
import socket from './Config/socket.io';
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
import { useQuery, useTheme, useUser } from './Utils/custom-hooks';
import config from './Config/features';
import { GameContext, BallContext, ThemeContext } from './Utils/contexts';
import logger from 'use-reducer-logger';
// import Background from './Components/Background';
import Container from './Components/Container';

export default function App() {
  let history = useHistory();
  let query = useQuery();
  const [user, setUser] = useUser();
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    process.env.NODE_ENV === 'development' ? logger(reducer) : reducer,
    initialState
  );
  const [progress, setProgress] = useState(0);
  const [theme, toggleTheme] = useTheme();

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
   * Player: Set standby
   */
  const standby = (mode: Gamemode) => {
    play('standby');

    mode !== 'solo'
      ? socket.emit('ready-up', state.host.socket, user)
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
     * Add player socketId on connect
     */
    socket.on('connect', () => {
      console.log('User connected');
      setUser((prevUser) => ({ ...prevUser, socket: socket.id }));
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

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
  }, [play, setUser]);

  /**
   * Host: Create a new game room
   */
  const createRoom = () => {
    play('ready');

    apiCreateRoom(user, (res) => {
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
    play('ready');

    apiUpdateRoom(room, user, (res) => {
      socket.emit('join-room', room, res.data.host.socket, user);

      dispatch({
        type: JOIN_ROOM,
        payload: { room: room, host: res.data.host },
      });
    });
  };

  /**
   * Leave room by room code
   * @param room Room code
   * @param host Room host (required if player)
   */
  const leaveRoom = (room: string, host?: RoomHost) => {
    play('init');

    // Host leave Room
    if (!host) {
      // TODO Tell room host left and kick players
      socket.emit('leave-room', room);
      apiDeleteRoom(room);
      return;
    }

    // Player leave room
    socket.emit('leave-room', room, host.socket, user);
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
   * Retrieve a new Bingo ball from the remaining pool of balls.
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
   * Cooldown timer
   * @returns void
   */
  const cooldown = () => {
    dispatch({ type: LOOP_START });

    const lockout = setTimeout(() => {
      dispatch({ type: LOOP_STOP });
      setProgress(0);
    }, config['ball-delay']);
    return () => clearTimeout(lockout);
  };

  /**
   * Progress bar animation
   */
  useEffect(() => {
    if (!state.loop || state.gamestate !== 'start') return;
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, config['ball-delay'] / 120);
    return () => clearInterval(timer);
  }, [state.gamestate, state.loop, progress]);

  /**
   * Solo mode new ball delay and animation reset
   */
  useEffect(() => {
    if (!state.loop || state.ball.remainder <= 0) return;
    const timeout = setTimeout(() => {
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
  }, [newBall, state.ball.remainder, state.loop, state.draws, state.pool]);

  /**
   * Player: Send card to host
   * @param mode
   * @param card
   * @param room
   * @param host
   */
  const sendCard = (
    mode: Gamemode,
    card: Card,
    room?: Room,
    host?: RoomHost
  ) => {
    // default
    if (mode !== 'solo') {
      play('validate');
      room && host && socket.emit('send-card', room, host.socket, user, card);
      return;
    }

    // solo
    dispatch({ type: GET_CARD, payload: { card: card, owner: user } });
    solo('validate');
  };

  /**
   * Checks if input card is a winner
   * @param mode Game mdoe
   * @param playerCard Input card to be checked and owner of card
   * @param draws Pool of bingo balls that have already been drawn
   * @param room Room code
   */
  const checkCard = (
    mode: Gamemode,
    playerCard: PlayerCard,
    draws: Pool,
    room?: Room
  ) => {
    // TODO Add rulesets
    const [results, methods] = validateCard(playerCard.card, draws);

    // No winning methods
    if (methods.length <= 0) {
      dispatch({ type: CHECK_CARD_FAILURE });
      mode !== 'solo' && room && socket.emit('losing-card', room);
      return;
    }

    const winner = {
      methods,
      results,
      player: playerCard.owner,
      card: playerCard.card,
    } as Winner;

    dispatch({
      type: CHECK_CARD_SUCCESS,
      payload: winner,
    });

    if (mode !== 'solo' && room) {
      socket.emit('winning-card', room, winner);
      apiSaveRoom(room, winner);
    }
  };

  /**
   * Handles solo mode game states
   * @param gamestate Gamestate
   */
  const solo = useCallback(
    (gamestate: Gamestate) => {
      switch (gamestate) {
        case 'init':
          mode('solo');
          play('ready');
          break;
        case 'standby':
          play('start');
          dispatch({ type: LOOP_START });
          break;
        case 'validate':
          play('validate');
          dispatch({ type: LOOP_STOP });
          break;
        case 'pause':
          play('pause');
          // TODO Pulling directly from state feels wrong
          checkCard(state.rules.mode, state.playerCard, state.draws);
          // TODO checkCard probably shouldn't happen here
          break;
        default:
          throw new Error('Invalid game state in solo.');
      }
    },
    [play, state.draws, state.playerCard, state.rules.mode]
  );

  /**
   * Pause solo mode loop on validate
   */
  useEffect(() => {
    if (
      state.loop ||
      state.rules.mode !== 'solo' ||
      state.gamestate !== 'validate'
    )
      return;

    const pauseTime = setTimeout(() => {
      solo('pause');
      setProgress(0);
    }, 1000);
    return () => clearTimeout(pauseTime);
  }, [solo, state.loop, state.gamestate, state.rules.mode]);

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

  return (
    <div id="App" className={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <GameContext.Provider
          value={{
            gamestate,
            room,
            host,
            mode: rules.mode,
          }}
        >
          <BallContext.Provider value={{ ball, loop, progress }}>
            <Container>
              {/* <Background /> */}
              <Switch>
                <Route path="/create">
                  <Create></Create>
                </Route>
                <Route path="/host">
                  <Host
                    checkCard={() =>
                      checkCard(rules.mode, playerCard, draws, room)
                    }
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
                    init={() => play('init')}
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
            </Container>
          </BallContext.Provider>
        </GameContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
