import { useCallback, useEffect, useContext } from 'react';
import socket from './lib/socket.io';
import {
  CHECK_CARD_SUCCESS,
  GET_CARD,
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_READY,
  SET_BALL,
  PLAYER_KICKED,
  CHECK_CARD_FAILURE,
} from './config/constants';
import { Ball, Card, Winner, Player, Room } from '@np-bingo/types';
import { Switch, Route } from 'react-router-dom';
import Host from './features/host';
import Play, { Solo } from './features/play';
import Home from './features/home';
import Join from './features/join';
import Create from './features/create';
import { useUser, useTheme, useToggle, useApp } from './hooks';
import config from './config/features';
import {
  GameContext,
  BallContext,
  ThemeContext,
  SoundContext,
  FeautresContext,
  UserContext,
} from './context';
import Background from './components/Surfaces/Background';
import Container from './components/Layout/Container';
import { useAppState } from './hooks/useAppState';
import './App.css';
import { logger } from './utils';
import features from './config/features';

export default function App() {
  const [user, setUser] = useUser();
  const {
    state,
    dispatch,
    play,
    mode,
    dispatchCreateRoom,
    dispatchJoinRoom,
    dispatchNewBall,
    dispatchSendCard,
    dispatchCheckCardSuccess,
    dispatchCheckCardFailure,
    dispatchRemovePlayer,
  } = useAppState();
  const [theme, toggleTheme] = useTheme(config.theme);
  const [sounds, toggleSounds] = useToggle(config.sounds);
  const { defaultVolume } = useContext(FeautresContext);

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
    rules: { mode: gamemode },
  } = state;

  const [newBall, checkCard] = useApp(
    playerCard,
    pool,
    draws,
    dispatchCheckCardSuccess,
    dispatchCheckCardFailure,
    dispatchNewBall
  );
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
      logger(socket.id);
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
      // Card sender should be in validate state
      // TODO FIX play('pause');
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
     * To Player: Loser
     */
    socket.on('loser', () => {
      logger(`This card is not a winner...`);
      dispatch({
        type: CHECK_CARD_FAILURE,
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

      // TODO play('start');
    });

    /**
     * To Room: Game End
     */
    socket.on('game-end', () => {
      logger('Game over!');
      play('end');
    });
  }, [dispatch, play, setUser]);

  return (
    <FeautresContext.Provider value={features}>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <SoundContext.Provider
            value={{ volume: defaultVolume, sounds, toggleSounds }}
          >
            <GameContext.Provider
              value={{
                gamestate,
                gamemode,
                room,
                host,
                winner,
                play,
                mode,
                checkCard,
              }}
            >
              <BallContext.Provider value={{ ball, newBall }}>
                <div id="App" className={theme}>
                  <Container>
                    <Background />
                    <Switch>
                      <Route path="/create">
                        <Create></Create>
                      </Route>
                      <Route path="/join">
                        <Join dispatchJoinRoom={dispatchJoinRoom} />
                      </Route>
                      <Route path="/host">
                        <Host
                          dispatchRemovePlayer={dispatchRemovePlayer}
                          draws={draws}
                          players={players}
                        />
                      </Route>
                      <Route path="/play/solo">
                        <Solo
                          dispatchSendCard={dispatchSendCard}
                          kicked={kicked}
                        />
                      </Route>
                      <Route path="/play">
                        <Play kicked={kicked} />
                      </Route>
                      <Route path="/">
                        <Home dispatchCreateRoom={dispatchCreateRoom} />
                      </Route>
                    </Switch>
                  </Container>
                </div>
              </BallContext.Provider>
            </GameContext.Provider>
          </SoundContext.Provider>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </FeautresContext.Provider>
  );
}
