import React from 'react';
import Button from '../../../components/Inputs/Button';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Logo from '../../../components/Logo';
import Credit from '../components/Credit';
import IconMenu from '../../../components/Inputs/IconMenu';
import { Host } from '@np-bingo/types';
import { useHome } from '../hooks';
import Spinner from '../../../components/Feedback/Spinner';
import { useContext } from 'react';
import { RoomContext, UserContext } from '../../../context';

export interface HomeProps {
  dispatchCreateRoom: (room: string, host: Host) => void;
}
export default function Home({ dispatchCreateRoom }: HomeProps): JSX.Element {
  const { isUpdatingUser } = useContext(UserContext);
  const { redirect, createRoom } = useHome(dispatchCreateRoom);
  const { room } = useContext(RoomContext);
  if (redirect) return <Redirect to={`/host?r=${room}`} />;
  return (
    <React.Fragment>
      <header className="flex-1 items-center">
        <Logo home={true} />
      </header>
      <main className="justify-center">
        <Button
          id="play-button"
          variant="primary"
          component={RouterLink}
          to="/join"
        >
          Play
        </Button>
        <Button className="host-button" onClick={createRoom}>
          {!isUpdatingUser ? 'Host' : <Spinner className="h-6 w-6" />}
        </Button>
      </main>
      <footer className="flex-1 justify-end">
        <Credit
          author="Tadjh Brooks"
          link="https://github.com/TadjhBrooks/np-bingo/"
          text="github.com/TadjhBrooks/np-bingo"
        />
        <div className="flex">
          <IconMenu direction="up" />
        </div>
      </footer>
    </React.Fragment>
  );
}
