import { useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Gamestate, Room } from '@np-bingo/types';
import { useDialog } from '../../Utils/custom-hooks';
import Public from '../../Components/Public';
import DialogCode from '../../Components/DialogCode';
import './style.css';
import { FeautresContext } from '../../Utils/contexts';

type Props = {
  joinRoom: (room: string) => void;
  queryRoom: string | null;
  solo: (gamestate: Gamestate) => void;
};

function Join(props: Props) {
  let { joinRoom, queryRoom, solo } = props;
  let history = useHistory();
  const [open, handleOpen, handleClose] = useDialog(false);

  const join = useCallback(
    (room: Room) => {
      joinRoom(room);
      history.push(`/play?r=${room}`);
    },
    [history, joinRoom]
  );

  useEffect(() => {
    if (queryRoom !== null) {
      // TODO Check if room is active
      join(queryRoom);
    }
  }, [queryRoom, join]);

  const handleSolo = () => {
    solo('init');
    history.push(`/play?m=solo`);
  };

  // const handleBlur = (event: KeyboardEvent<HTMLInputElement>) => {
  //   return inputs.code.length === 4 && event.target.blur();
  // };
  // TODO replace with Public Room Implementation
  const dummyArray = [
    {
      _id: 'dadkjashdjshadka',
      room: 'NYPD',
      host: { id: 1100, name: 'Siz Fulker' },
      players: [1111, 1122, 1133, 1144, 1155, 1121, 1112, 1114],
    },
    {
      _id: 'dadkjashdjshadka',
      room: 'TEST',
      host: { id: 1100, name: 'Dean Watson' },
      players: [1111, 1122, 1133, 1144, 1155],
    },
    {
      _id: 'dadkjashdjshadka',
      room: 'ABCD',
      host: { id: 1100, name: 'Manny McDaniels' },
      players: [1111],
    },
  ];

  return (
    <div className="Join">
      <header>
        <Typography variant="h4">Join</Typography>
      </header>
      <FeautresContext.Consumer>
        {(features) => (
          <div className="main" role="main">
            {features['public-rooms'] && (
              <Public rooms={dummyArray} joinRoom={joinRoom} />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              size="large"
            >
              Join Room
            </Button>
            {features['single-player'] && (
              <Button color="primary" onClick={handleSolo} size="large">
                Play Solo
              </Button>
            )}
          </div>
        )}
      </FeautresContext.Consumer>
      <footer>
        <Link component={RouterLink} to="/">
          &larr; Back
        </Link>
      </footer>
      <DialogCode open={open} handleClose={handleClose} onSumbit={join} />
    </div>
  );
}

export default Join;
