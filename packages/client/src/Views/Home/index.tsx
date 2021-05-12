import React from 'react';
import Button from '../../Components/Button';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Logo from '../../Components/Logo';
import { Room } from '@np-bingo/types';
import { useDialog } from '../../Utils/custom-hooks';
import CodeModal from '../../Components/CodeModal';
import { FeautresContext, ThemeContext } from '../../Utils/contexts';
import Footer from '../../Components/Footer';
import Credit from '../../Components/Credit';
import ThemeToggle from '../../Components/ThemeToggle';
import Main from '../../Components/Main';
import Header from '../../Components/Header';

export interface HomeProps {
  createRoom?: () => void;
  joinRoom?: (room: Room) => void;
}

export default function Home({ createRoom, joinRoom }: HomeProps): JSX.Element {
  let history = useHistory();
  const [open, handleOpen, handleClose] = useDialog(false);

  function join(room: Room) {
    joinRoom && joinRoom(room);
    history.push(`/play?r=${room}`);
  }

  return (
    <React.Fragment>
      <Header className="flex-1 items-center">
        <Logo home={true} />
      </Header>
      <Main className="flex-1 justify-center space-y-3">
        <FeautresContext.Consumer>
          {(features) => (
            <React.Fragment>
              <Button
                className="play-button"
                variant="contained"
                component={
                  !features['solo-mode'] && !features['public-rooms']
                    ? undefined
                    : RouterLink
                }
                to={
                  !features['solo-mode'] && !features['public-rooms']
                    ? undefined
                    : '/join'
                }
                onClick={
                  !features['solo-mode'] && !features['public-rooms']
                    ? handleOpen
                    : undefined
                }
              >
                Play
              </Button>
              {!features['solo-mode'] && !features['public-rooms'] && (
                <CodeModal open={open} onClose={handleClose} onSumbit={join} />
              )}
            </React.Fragment>
          )}
        </FeautresContext.Consumer>
        <Button className="host-button" onClick={createRoom}>
          Host
        </Button>
      </Main>
      <Footer className="flex-1 justify-end">
        <Credit
          author="Tadjh Brooks"
          link="https://github.com/TadjhBrooks/np-bingo/"
        />
        <ThemeContext.Consumer>
          {(themeContext) => (
            <ThemeToggle
              onClick={themeContext.toggleTheme}
              theme={themeContext.theme}
            />
          )}
        </ThemeContext.Consumer>
      </Footer>
    </React.Fragment>
  );
}
