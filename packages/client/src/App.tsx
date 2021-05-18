import React, { useCallback, useEffect } from 'react';
import socket from './Config/socket.io';
import {
  CHECK_CARD_SUCCESS,
  NEW_BALL,
  GET_CARD,
  SET_ROOM,
  JOIN_ROOM,
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_READY,
  SET_BALL,
  PLAYER_KICKED,
  CHECK_CARD_FAILURE,
} from './Constants';
import { getBall, removeBall, validateCard } from './Utils/bingo';
import {
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
import { Switch, Route } from 'react-router-dom';
import Host from './Views/Host';
import Play from './Views/Play';
import Home from './Views/Home';
import Join from './Views/Join';
import Create from './Views/Create';
import {
  apiCreateRoom,
  apiDeleteRoom,
  apiSaveRoom,
  apiUpdateRoom,
} from './Api';
import { useQuery, useTheme, useUser } from './Utils/custom-hooks';
import config from './Config/features';
import { GameContext, BallContext, ThemeContext } from './Utils/contexts';
// import Background from './Components/Background';
import Container from './Components/Container';
import { useAppState } from './Utils/useAppState';

export default function App() {
  // TODO Remove any config.
  let query = useQuery();
  const [user, setUser] = useUser();
  const { state, dispatch, play, mode, gameToggle } = useAppState();
  const [theme, toggleTheme] = useTheme(config.theme);

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
  } = state;

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
      console.log('Click to ready up');
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
  }, [dispatch, play, setUser]);

  /**
   * Create a new game room
   */
  const createRoom = useCallback(() => {
    apiCreateRoom(user, (res) => {
      dispatch({
        type: SET_ROOM,
        payload: { room: res.data.game.room, host: res.data.game.host },
      });
    });
  }, [dispatch, user]);

  /**
   * Player: Join game by room code
   * @param room Room code
   */
  const joinRoom = useCallback(
    (room: string) => {
      apiUpdateRoom(room, user, (res) => {
        dispatch({
          type: JOIN_ROOM,
          payload: { room: room, host: res.data.host },
        });
      });
    },
    [dispatch, user]
  );

  /**
   * Remove player from room
   * @param player Player socket id
   */
  const removePlayer = useCallback(
    (player: Player) => {
      socket.emit('remove-player', player);
      dispatch({ type: PLAYER_LEFT, payload: player });
    },
    [dispatch]
  );

  /**
   * Retrieve a new Bingo ball from the remaining pool of balls.
   * Returns undefined if pool is empty.
   * @param mode
   * @param pool
   * @param draws
   * @param room (Optional)
   */
  const newBall = useCallback(
    (mode: Gamemode, pool: Pool, draws: Pool, room?: Room) => {
      const poolArray = [...pool];
      const drawsArray = [...draws];
      const ball = getBall(poolArray);

      if (ball.number === 0) {
        play('end');
        mode !== 'solo' && room && socket.emit('end', room);
        return ball;
      }

      const filteredPool = removeBall(poolArray, ball);
      drawsArray[ball.key].push(ball.number);

      dispatch({
        type: NEW_BALL,
        payload: {
          ball: ball,
          draws: drawsArray,
          pool: filteredPool,
        },
      });
      mode !== 'solo' && room && socket.emit('ball', room, ball);

      // ??
      return ball;
    },
    [dispatch, play]
  );

  /**
   * Checks if input card is a winner
   * @param mode Game mdoe
   * @param playerCard Input card to be checked and owner of card
   * @param draws Pool of bingo balls that have already been drawn
   * @param room Room code
   */
  const checkCard = useCallback(
    (mode: Gamemode, playerCard: PlayerCard, draws: Pool, room?: Room) => {
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
    },
    [dispatch]
  );

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
          break;
        case 'validate':
          play('validate');
          // disableProgress();
          break;
        case 'pause':
          play('pause');
          // TODO Pulling directly from state feels wrong
          checkCard(rules.mode, playerCard, draws);
          // TODO checkCard probably shouldn't happen here
          break;
        default:
          throw new Error('Invalid game state in solo.');
      }
    },
    [play, mode, checkCard, draws, playerCard, rules.mode]
  );

  /**
   * Player: Set standby
   */
  const standby = useCallback(
    (mode: Gamemode) => {
      play('standby');

      mode !== 'solo'
        ? socket.emit('ready-up', state.host.socket, user)
        : solo('standby');
    },
    [play, solo, state.host.socket, user]
  );

  /**
   * Player: Send card to host
   * @param mode
   * @param card
   * @param room
   * @param host
   */
  const sendCard = useCallback(
    (mode: Gamemode, card: Card, room?: Room, host?: RoomHost) => {
      // default
      if (mode !== 'solo') {
        play('validate');
        room && host && socket.emit('send-card', room, host.socket, user, card);
        return;
      }

      // solo
      dispatch({ type: GET_CARD, payload: { card: card, owner: user } });
      solo('validate');
    },
    [dispatch, play, solo, user]
  );

  /**
   * Pause solo mode inProgress on validate
   */
  // TODO add back
  // useEffect(() => {
  //   if (
  //     inProgress ||
  //     state.rules.mode !== 'solo' ||
  //     state.gamestate !== 'validate'
  //   )
  //     return;

  //   const pauseTime = setTimeout(() => {
  //     solo('pause');
  //     setCompletion(0);
  //   }, 1000);
  //   return () => clearTimeout(pauseTime);
  // }, [solo, setCompletion, inProgress, state.gamestate, state.rules.mode]);

  return (
    <div id="App" className={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <GameContext.Provider
          value={{
            gamestate,
            gamemode: rules.mode,
            room,
            host,
            user,
            play,
          }}
        >
          <BallContext.Provider value={ball}>
            <Container>
              {/* <Background /> */}
              <Switch>
                <Route path="/create">
                  <Create></Create>
                </Route>
                <Route path="/host">
                  <Host
                    gameToggle={() => gameToggle(gamestate)}
                    checkCard={() =>
                      checkCard(rules.mode, playerCard, draws, room)
                    }
                    newBall={() => newBall(rules.mode, pool, draws, room)}
                    draws={draws}
                    players={players}
                    removePlayer={removePlayer}
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
                    standby={standby}
                    newBall={() => newBall(rules.mode, pool, draws, room)}
                    kicked={kicked}
                    sendCard={sendCard}
                    winner={winner}
                  ></Play>
                </Route>
                <Route exact path="/">
                  <Home createRoom={createRoom} />
                </Route>
              </Switch>
            </Container>
          </BallContext.Provider>
        </GameContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
