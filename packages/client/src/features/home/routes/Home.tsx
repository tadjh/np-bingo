import { Fragment } from 'react';
import Button from '../../../components/Inputs/Button';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Logo from '../../../components/Logo';
import Credit from '../components/Credit';
import IconMenu from '../../../components/Inputs/IconMenu';
import { useHome } from '../hooks';
import Spinner from '../../../components/Feedback/Spinner';
import { useContext } from 'react';
import { FeaturesContext, RoomContext, UserContext } from '../../../context';
import Typography from '../../../components/Display/Typography';
import PlayerName from '../../../components/Display/PlayerName';

export interface HomeProps {}
export default function Home(): JSX.Element {
  const { showCredit } = useContext(FeaturesContext);
  const { room } = useContext(RoomContext);
  const {
    user: { name },
    socket,
  } = useContext(UserContext);
  const { isLoading, isError, isRedirect, isSocketLoading, createRoom } =
    useHome();
  if (isRedirect) return <Redirect to={`/host?r=${room}`} />;
  return (
    <Fragment>
      <header className="flex-auto items-center justify-center">
        <Logo home={true} data-testid="home-logo" />
      </header>
      <main className="flex-auto justify-center">
        <Typography>{'\xa0'}</Typography>
        <Button
          id="play-button"
          className="w-[83px]"
          variant="primary"
          component={RouterLink}
          to="/join"
        >
          Play
        </Button>
        <Button
          className="host-button w-[83px] flex justify-center"
          onClick={createRoom}
        >
          {!isLoading ? 'Host' : <Spinner className="h-6 w-6" color="white" />}
        </Button>
        <Typography>{isError ? 'Something went wrong...' : '\xa0'}</Typography>
      </main>
      <footer className="flex-auto">
        {showCredit && (
          <Credit
            author="Tadjh Brooks"
            link="https://github.com/TadjhBrooks/np-bingo/"
            text="github.com/TadjhBrooks/np-bingo"
          />
        )}
        <IconMenu direction="up" />
        <PlayerName
          status={socket.connected}
          name={name}
          isLoading={isSocketLoading}
        />
      </footer>
    </Fragment>
  );
}
