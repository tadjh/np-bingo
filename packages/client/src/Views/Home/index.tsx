import React, { useContext } from 'react';
import Button from '../../Components/Button';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Logo from '../../Components/Logo';
import { Room } from '@np-bingo/types';
import { useDialog } from '../../Utils/custom-hooks';
import CodeModal from '../../Components/CodeModal';
import { FeautresContext } from '../../Utils/contexts';
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
  const { allowSolo: solo, publicRooms } = useContext(FeautresContext);
  const stayHome = !solo && !publicRooms && true;
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
        <Button
          className="play-button"
          variant="contained"
          component={stayHome ? undefined : RouterLink}
          to={stayHome ? undefined : '/join'}
          onClick={stayHome ? handleOpen : undefined}
        >
          Play
        </Button>
        {stayHome && (
          <CodeModal open={open} onClose={handleClose} onSumbit={join} />
        )}
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
