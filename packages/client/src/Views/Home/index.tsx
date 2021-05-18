import React, { useContext, useEffect } from 'react';
import Button from '../../Components/Button';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Logo from '../../Components/Logo';
import { GameContext } from '../../Utils/contexts';
import Footer from '../../Components/Footer';
import Credit from '../../Components/Credit';
import ThemeToggle from '../../Components/ThemeToggle';
import Main from '../../Components/Main';
import Header from '../../Components/Header';

export interface HomeProps {
  createRoom?: () => void;
}

export default function Home({ createRoom }: HomeProps): JSX.Element {
  const { gamestate, room, play } = useContext(GameContext);
  let history = useHistory();

  /**
   * Reset gamestate on visit to home
   */
  useEffect(() => {
    if (gamestate === 'init') return;
    play('init');
  }, [gamestate, play]);

  /**
   * Route after create room
   */
  useEffect(() => {
    if (gamestate !== 'init' || room === '') return;
    history.push(`/host?r=${room}`);
  }, [gamestate, room, history]);

  return (
    <React.Fragment>
      <Header className="flex-1 items-center">
        <Logo home={true} />
      </Header>
      <Main className="flex-1 justify-center space-y-3">
        <Button
          id="play-button"
          variant="contained"
          component={RouterLink}
          to="/join"
        >
          Play
        </Button>
        <Button className="host-button" onClick={createRoom}>
          Host
        </Button>
      </Main>
      <Footer className="flex-1 justify-end">
        <Credit
          author="Tadjh Brooks"
          link="https://github.com/TadjhBrooks/np-bingo/"
        />
        <ThemeToggle />
      </Footer>
    </React.Fragment>
  );
}
