import React, { useContext, useEffect } from 'react';
import Button from '../../components/Button';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Logo from '../../components/Logo';
import { GameContext } from '../../Utils/contexts';
import Footer from '../../components/Footer';
import Credit from '../../components/Credit';
import Main from '../../components/Main';
import Header from '../../components/Header';
import IconMenu from '../../components/IconMenu';

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
          text="github.com/TadjhBrooks/np-bingo"
        />
        <div className="flex">
          <IconMenu direction="up" />
        </div>
      </Footer>
    </React.Fragment>
  );
}
