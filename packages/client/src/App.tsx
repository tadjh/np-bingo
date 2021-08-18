import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Host from './features/host';
import Play, { Solo } from './features/play';
import Home from './features/home';
import Join from './features/join';
import Create from './features/create';
import { useUser, useTheme, useToggle, useApp, useAppSocket } from './hooks';
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
import features from './config/features';
export default function App() {
  const { user, setUserSocket } = useUser();
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
      kicked,
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
    playerDispatchers,
  } = useAppState();
  const [theme, toggleTheme] = useTheme(config.theme);
  const [sounds, toggleSounds] = useToggle(config.sounds);
  const { defaultVolume } = useContext(FeautresContext);
  const [newBall, checkCard] = useApp(
    playerCard,
    pool,
    draws,
    dispatchCheckCardSuccess,
    dispatchCheckCardFailure,
    dispatchNewBall
  );
  const {
    socket,
    socketConnect,
    socketOnConnect,
    socketDisconnect,
    socketOnDisconnect,
  } = useAppSocket(setUserSocket);

  return (
    <FeautresContext.Provider value={features}>
      <UserContext.Provider value={{ user, setUserSocket }}>
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
                        <Create />
                      </Route>
                      <Route path="/join">
                        <Join dispatchJoinRoom={dispatchJoinRoom} />
                      </Route>
                      <Route path="/host">
                        <Host
                          dispatchers={hostDispatchers}
                          draws={draws}
                          players={players}
                        />
                      </Route>
                      <Route path="/play/solo">
                        <Solo kicked={kicked} dispatchers={playerDispatchers} />
                      </Route>
                      <Route path="/play">
                        <Play kicked={kicked} dispatchers={playerDispatchers} />
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
