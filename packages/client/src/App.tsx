import clsx from 'clsx';
import { Switch, Route } from 'react-router-dom';
import Host from './features/host';
import Play, { Solo } from './features/play';
import Home from './features/home';
import Join from './features/join';
import Create from './features/create';
import { useUser, useTheme, useToggle, useApp, useSocket } from './hooks';
import config from './config/features';
import {
  BallContext,
  FeaturesContext,
  GameContext,
  RoomContext,
  SoundContext,
  ThemeContext,
  UserContext,
} from './context';
import Background from './components/Surfaces/Background';
import Container from './components/Layout/Container';
import { useAppState } from './hooks';
import './App.css';
import features from './config/features';
import { useState } from 'react';
export default function App() {
  const [{ user, isSocketLoading }, userDispatch] = useUser();
  const { socket, connect } = useSocket(userDispatch);
  const {
    state: {
      gamestate,
      ball,
      draws,
      pool,
      playerCards,
      winners,
      room,
      players,
      host,
      rules: { mode: gamemode, split },
    },
    dispatch,
  } = useAppState();
  const [theme, toggleTheme] = useTheme(config.theme);
  const [sounds, toggleSounds] = useToggle(config.sounds);
  const [volume, setVolume] = useState(config.defaultVolume);
  const { newBall, checkCard } = useApp(pool, draws);
  return (
    <FeaturesContext.Provider value={features}>
      <UserContext.Provider
        value={{
          user,
          socket,
          isSocketLoading,
          userDispatch,
          connect,
        }}
      >
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <SoundContext.Provider
            value={{ volume, sounds, setVolume, toggleSounds }}
          >
            <RoomContext.Provider
              value={{
                room,
                host,
                winners,
                players,
              }}
            >
              <GameContext.Provider
                value={{
                  gamestate,
                  gamemode,
                  playerCards,
                  split,
                  dispatch,
                  checkCard,
                }}
              >
                <BallContext.Provider value={{ ball, newBall }}>
                  <div
                    id="App"
                    className={clsx(
                      'sm:relative sm:flex sm:justify-center sm:items-center sm:min-h-screen overflow-hidden',
                      theme
                    )}
                  >
                    <Background variant="phone" />
                    <Container>
                      <Background />
                      <Background variant="top" />
                      <Switch>
                        <Route exact path="/">
                          <Home />
                        </Route>
                        <Route path="/create">
                          <Create />
                        </Route>
                        <Route path="/join">
                          <Join />
                        </Route>
                        <Route path="/host">
                          <Host draws={draws} />
                        </Route>
                        <Route path="/play/solo">
                          <Solo />
                        </Route>
                        <Route exact path="/play">
                          <Play />
                        </Route>
                      </Switch>
                    </Container>
                  </div>
                </BallContext.Provider>
              </GameContext.Provider>
            </RoomContext.Provider>
          </SoundContext.Provider>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </FeaturesContext.Provider>
  );
}
