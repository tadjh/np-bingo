import { useCallback, useEffect } from 'react';
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
  Winner,
  Player,
  PlayerCard,
  Room,
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
import { useQuery, useSounds, useTheme, useUser } from './Utils/custom-hooks';
import config from './Config/features';
import { GameContext, BallContext, ThemeContext } from './Utils/contexts';
import Background from './Components/Background';
import Container from './Components/Container';
import { useAppState } from './Utils/useAppState';
import './App.css';
import { logger } from './Utils';

export default function App() {
  let query = useQuery();
  const [user, setUser] = useUser();
  const { state, dispatch, play, mode } = useAppState();
  const [theme, toggleTheme] = useTheme(config.theme);
  const [sounds, toggleSounds] = useSounds(config.sounds);

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
      logger('User connected');
      setUser((prevUser) => ({ ...prevUser, socket: socket.id }));
    });

    socket.on('disconnect', () => {
      logger('User disconnected');
    });

    /**
     * To Host: Player joined
     * @param player Player
     */
    socket.on('player-joined', (player: Player) => {
      logger(`${player.name} joined`);
      dispatch({ type: PLAYER_JOINED, payload: player });
    });

    /**
     * To Host: Player left
     * @param player Player
     */
    socket.on('player-left', (player: Player) => {
      logger(`${player.name} left`);
      dispatch({ type: PLAYER_LEFT, payload: player });
    });

    /**
     * To Player: Host left
     */
    // TODO Dialog when host leaves
    socket.on('host-left', () => {
      logger(`Host left, and you have been removed from the room`);
      dispatch({ type: PLAYER_KICKED, payload: 'abandoned' });
    });

    /**
     * To Player: Removed from game
     */
    socket.on('player-remove', () => {
      logger(`You have been removed from the room`);
      dispatch({ type: PLAYER_KICKED, payload: 'banned' });
    });

    /**
     * To Host: Player is ready
     * @param player Player
     */
    socket.on('player-ready', (player: Player) => {
      logger(`${player.name} ready`);
      dispatch({ type: PLAYER_READY, payload: player });
    });

    /**
     * To Room: Ready check
     */
    socket.on('game-ready', () => {
      logger('Click to ready up');
      play('ready');
    });

    /**
     * To Room: Standby for first ball
     */
    socket.on('game-standby', () => {
      logger('Game starting shortly...');
      play('standby');
    });

    /**
     * To Room: Game start
     */
    socket.on('game-start', () => {
      logger('Game started');
      play('start');
    });

    /**
     * To Room: Ball Dispensed
     * @param ball Ball
     */
    socket.on('game-ball', (ball: Ball) => {
      logger(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
      dispatch({ type: SET_BALL, payload: ball });
    });

    /**
     * To Host: Receive Card
     * @param room Room
     * @param player Player
     * @param card Card
     */
    socket.on('receive-card', (room: Room, player: Player, card: Card) => {
      logger(`${player.name} sent a card to you.`);
      play('validate');
      socket.emit('checking-card', room);
      dispatch({ type: GET_CARD, payload: { card: card, owner: player } });
    });

    /**
     * To Room: Notify a card is being checked
     */
    socket.on('game-validation', () => {
      logger(`A card has been sent to the host. Checking if it's a winner!`);
      play('pause');
    });

    /**
     * To Player: Winner
     * @param winner Winner
     */
    socket.on('winner', (room: Room, winner: Winner) => {
      logger(`You won the game!`);

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
      logger(`${username} won the game!`);
      // TODO Show winner name on win ?
      // play('win');
    });

    /**
     * To Room: Continue
     */
    socket.on('game-continue', () => {
      logger('Not a winner...');
      play('start');
    });

    /**
     * To Room: Game End
     */
    socket.on('game-end', () => {
      logger('Game over!');
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
    (room: Room) => {
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
      dispatch({ type: PLAYER_LEFT, payload: player });
    },
    [dispatch]
  );

  /**
   * Leave room by room code
   * @param room Room code
   */
  const leaveRoom = useCallback((room: Room) => {
    apiDeleteRoom(room);
  }, []);

  /**
   * Save room after a win
   * @param room
   * @param winner
   */
  const saveRoom = useCallback((room: Room, winner: Winner) => {
    apiSaveRoom(room, winner);
  }, []);

  /**
   * Retrieve a new Bingo ball from the remaining pool of balls.
   * @param pool
   * @param draws
   * @returns Ball
   */
  const newBall = useCallback(
    (pool: Pool, draws: Pool) => {
      const poolArray = [...pool];
      // safely clone multidimenional array
      const drawsArray = draws.map((array) => array.slice());
      const ball = getBall(poolArray);

      if (ball.number === 0) return ball;

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

      return ball;
    },
    [dispatch]
  );

  /**
   * Checks if input card is a winner
   * @param mode Game mdoe
   * @param playerCard Input card to be checked and owner of card
   * @param draws Pool of bingo balls that have already been drawn
   * @return Winner | null
   */
  const checkCard = useCallback(
    (playerCard: PlayerCard, draws: Pool) => {
      const [results, methods] = validateCard(playerCard.card, draws);

      // No winning methods
      if (methods.length <= 0) {
        dispatch({ type: CHECK_CARD_FAILURE });
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
    },
    [dispatch]
  );

  /**
   * Solo: Impersonate sending card to host
   * @param card
   * @param user
   */
  const sendCard = useCallback(
    (card: Card, user?: Player) => {
      dispatch({ type: GET_CARD, payload: { card: card, owner: user } });
    },
    [dispatch]
  );

  return (
    <div id="App" className={theme}>
      <ThemeContext.Provider
        value={{ theme, toggleTheme, sounds, toggleSounds }}
      >
        <GameContext.Provider
          value={{
            gamestate,
            gamemode: rules.mode,
            room,
            host,
            user,
            winner,
            play,
          }}
        >
          <BallContext.Provider value={ball}>
            <Container>
              <Background />
              <Switch>
                <Route path="/create">
                  <Create></Create>
                </Route>
                <Route path="/host">
                  <Host
                    checkCard={() => checkCard(playerCard, draws)}
                    newBall={() => newBall(pool, draws)}
                    removePlayer={removePlayer}
                    leaveRoom={leaveRoom}
                    saveRoom={saveRoom}
                    draws={draws}
                    players={players}
                  ></Host>
                </Route>
                <Route path="/join">
                  <Join
                    joinRoom={joinRoom}
                    queryRoom={query.get('r')}
                    solo={() => mode('solo')}
                  />
                </Route>
                <Route path="/play">
                  <Play
                    checkCard={() => checkCard(playerCard, draws)}
                    newBall={() => newBall(pool, draws)}
                    sendCard={sendCard}
                    kicked={kicked}
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
