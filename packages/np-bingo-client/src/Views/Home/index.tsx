import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import Logo from '../../Components/Logo';
import './style.css';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../../Components/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Room } from '../../types';
import { useDialog, useForm } from '../../Utils/custom-hooks';

type Props = {
  createRoom: () => void;
  joinRoom: (room: Room) => void;
};

function Home(props: Props) {
  let { createRoom } = props;

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      code: '',
    },
    join
  );
  let { joinRoom } = props;
  let history = useHistory();

  function join() {
    let room = inputs.code.toUpperCase();
    joinRoom(room);
    history.push(`/play?r=${room}`);
  }

  const { open, handleOpen, handleClose } = useDialog(false);

  return (
    <div className="Home">
      <div className="background"></div>
      <header>
        <Logo home={true} />
      </header>
      <div className="main" role="main">
        <Button
          // component={RouterLink}
          variant="outlined"
          color="primary"
          // to="/host"
          onClick={createRoom}
          size="large"
        >
          Host
        </Button>
        <Button
          variant="contained"
          color="primary"
          // component={RouterLink}
          // to="/join"
          onClick={handleOpen}
          size="large"
        >
          Play
        </Button>
      </div>
      <footer>
        <Typography>Made by Tadjh Brooks</Typography>
        <Link href="https://github.com/TadjhBrooks/np-bingo/" color="primary">
          https://github.com/TadjhBrooks/np-bingo
        </Link>
      </footer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="join-dialog-title"
      >
        <DialogTitle id="join-dialog-title" onClose={handleClose}>
          Enter Room Code
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <fieldset className="code-input">
              <label htmlFor="code-input">Room Code</label>
              <input
                autoComplete="off"
                className="partitioned"
                id="code-input"
                name="code"
                type="text"
                value={inputs.code}
                minLength={4}
                maxLength={4}
                size={4}
                onChange={handleChange}
                autoCapitalize="on"
                autoFocus
                // onKeyPress={handleBlur}
              />
            </fieldset>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" type="submit">
              Join
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Home;
