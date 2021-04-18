import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Logo from '../../Components/Logo';
import './style.css';
import { Room } from '@np-bingo/types';
import { useDialog } from '../../Utils/custom-hooks';
import DialogCode from '../../Components/DialogCode';
import { FeautresContext } from '../../Utils/contexts';
import Footer from '../../Components/Footer';

type Props = {
  createRoom: () => void;
  joinRoom: (room: Room) => void;
};

function Home(props: Props) {
  let { createRoom, joinRoom } = props;
  let history = useHistory();
  const [open, handleOpen, handleClose] = useDialog(false);

  function join(room: Room) {
    joinRoom(room);
    history.push(`/play?r=${room}`);
  }

  return (
    <React.Fragment>
      <div className="background"></div>
      <div className="Home">
        <header>
          <Logo home={true} />
        </header>
        <div className="main" role="main">
          <FeautresContext.Consumer>
            {(features) => (
              <Button
                variant="contained"
                color="primary"
                component={
                  !features['single-player'] && !features['public-rooms']
                    ? 'button'
                    : RouterLink
                }
                to={
                  !features['single-player'] && !features['public-rooms']
                    ? undefined
                    : '/join'
                }
                onClick={
                  !features['single-player'] && !features['public-rooms']
                    ? handleOpen
                    : undefined
                }
                size="large"
              >
                Play
              </Button>
            )}
          </FeautresContext.Consumer>
          <Button color="primary" onClick={createRoom} size="large">
            Host
          </Button>
        </div>
        <Footer home={true} />
        <DialogCode open={open} handleClose={handleClose} onSumbit={join} />
      </div>
    </React.Fragment>
  );
}

export default Home;
