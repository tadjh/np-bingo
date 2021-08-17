import React from 'react';
import Button from '../../../components/Inputs/Button';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../../components/Logo';
import Credit from '../components/Credit';
import IconMenu from '../../../components/Inputs/IconMenu';
import { Host } from '@np-bingo/types';
import { useHome } from '../hooks';

export interface HomeProps {
  dispatchCreateRoom: (room: string, host: Host) => void;
}
export default function Home({ dispatchCreateRoom }: HomeProps): JSX.Element {
  const [createRoom] = useHome(dispatchCreateRoom);
  return (
    <React.Fragment>
      <header className="flex-1 items-center">
        <Logo home={true} />
      </header>
      <main className="justify-center space-y-3">
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
