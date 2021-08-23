import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Host from './features/host';
import Play, { Solo } from './features/play';
import Home from './features/home';
import Join from './features/join';
import Create from './features/create';
import { useUser, useTheme, useToggle, useApp, useSocket } from './hooks';
import config from './config/features';
import {
  GameContext,
  BallContext,
  ThemeContext,
  SoundContext,
  FeaturesContext,
  UserContext,
  RoomContext,
} from './context';
import Background from './components/Surfaces/Background';
import Container from './components/Layout/Container';
import { useAppState } from './hooks/useAppState';
import './App.css';
import features from './config/features';
export default function App() {
  const { user, isUpdatingUser, setUser, setIsUpdatingUser } = useUser();
  const {
    state: {
      gamestate,
      ball,
      draws,
      pool,
      playerCard,
      winner,
      room,
      players,
      host,
      rules: { mode: gamemode },
    },
    play,
    mode,
    dispatchCreateRoom,
    dispatchJoinRoom,
    dispatchNewBall,
    dispatchCheckCardSuccess,
    dispatchCheckCardFailure,
    hostDispatchers,
    playDispatchers,
  } = useAppState();
  const [theme, toggleTheme] = useTheme(config.theme);
  const [sounds, toggleSounds] = useToggle(config.sounds);
  const { defaultVolume } = useContext(FeaturesContext);
  const [newBall, checkCard] = useApp(
    playerCard,
    pool,
    draws,
    dispatchCheckCardSuccess,
    dispatchCheckCardFailure,
    dispatchNewBall
  );
  const { socket, connect } = useSocket(setUser, setIsUpdatingUser);

  return (
    <FeaturesContext.Provider value={features}>
      <UserContext.Provider
        value={{
          user,
          isUpdatingUser,
          socket,
          setUser,
          setIsUpdatingUser,
          connect,
        }}
      >
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <SoundContext.Provider
            value={{ volume: defaultVolume, sounds, toggleSounds }}
          >
            <RoomContext.Provider
              value={{
                room,
                host,
                winner,
                players,
              }}
            >
              <GameContext.Provider
                value={{
                  gamestate,
                  gamemode,
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
                          <Create />
                        </Route>
                        <Route path="/join">
                          <Join dispatchJoinRoom={dispatchJoinRoom} />
                        </Route>
                        <Route path="/host">
                          <Host dispatchers={hostDispatchers} draws={draws} />
                        </Route>
                        <Route path="/play/solo">
                          <Solo dispatchers={playDispatchers} />
                        </Route>
                        <Route path="/play">
                          <Play dispatchers={playDispatchers} />
                        </Route>
                        <Route path="/">
                          <Home dispatchCreateRoom={dispatchCreateRoom} />
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
