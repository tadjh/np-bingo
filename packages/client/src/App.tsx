import { useContext } from 'react';
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
  PlayContext,
  RoomContext,
  SoundContext,
  ThemeContext,
  UserContext,
} from './context';
import Background from './components/Surfaces/Background';
import Container from './components/Layout/Container';
import { useAppState, usePlayState } from './hooks';
import './App.css';
import features from './config/features';
export default function App() {
  const [{ user, isSocketLoading }, userDispatch] = useUser();
  const { socket, connect } = useSocket(userDispatch);
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
    dispatch,
  } = useAppState();
  const [theme, toggleTheme] = useTheme(config.theme);
  const [sounds, toggleSounds] = useToggle(config.sounds);
  const { defaultVolume } = useContext(FeaturesContext);
  const { newBall, checkCard } = useApp(playerCard, pool, draws);
  const {
    playState: { card, serial, crossmarks, kicked, isWinner, isNewGame },
    playDispatch,
  } = usePlayState();

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
                  dispatch,
                  checkCard,
                }}
              >
                <BallContext.Provider value={{ ball, newBall }}>
                  <div
                    id="App"
                    className={clsx(
                      'relative flex justify-center items-center min-h-screen',
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
                        <PlayContext.Provider
                          value={{
                            card,
                            serial,
                            crossmarks,
                            kicked,
                            isWinner,
                            isNewGame,
                            playDispatch,
                          }}
                        >
                          <Route path="/play/solo">
                            <Solo />
                          </Route>
                          <Route exact path="/play">
                            <Play />
                          </Route>
                        </PlayContext.Provider>
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
