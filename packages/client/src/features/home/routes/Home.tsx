import { Fragment } from 'react';
import Button from '../../../components/Inputs/Button';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Logo from '../../../components/Logo';
import Credit from '../components/Credit';
import IconMenu from '../../../components/Inputs/IconMenu';
import { useHome } from '../hooks';
import Spinner from '../../../components/Feedback/Spinner';
import { useContext } from 'react';
import { RoomContext } from '../../../context';
import Typography from '../../../components/Display/Typography';

export interface HomeProps {}
export default function Home(): JSX.Element {
  const { room } = useContext(RoomContext);
  const { isLoading, isError, isRedirect, createRoom } = useHome();
  if (isRedirect) return <Redirect to={`/host?r=${room}`} />;
  return (
    <Fragment>
      <header className="flex-1 items-center">
        <Logo home={true} />
      </header>
      <main className="justify-center">
        <Typography>{'\xa0'}</Typography>
        <Button
          id="play-button"
          variant="primary"
          component={RouterLink}
          to="/join"
        >
          Play
        </Button>
        <Button className="host-button w-[83px]" onClick={createRoom}>
          {!isLoading ? 'Host' : <Spinner className="h-6 w-6" />}
        </Button>
        <Typography>{isError ? 'Something went wrong...' : '\xa0'}</Typography>
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
    </Fragment>
  );
}
