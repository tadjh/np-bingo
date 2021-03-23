import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm, useDialog } from '../../Utils/custom-hooks';
import './style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

type Props = {
  joinRoom: (room: string) => void;
};

function Join(props: Props) {
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

  // const handleBlur = (event: KeyboardEvent<HTMLInputElement>) => {
  //   return inputs.code.length === 4 && event.target.blur();
  // };

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
      <div className="main" role="main">
        <div className="room-list">
          <Typography variant="h5">Public Rooms</Typography>
          <List>
            {dummyArray.map((value) => {
              return (
                <ListItem key={value.room}>
                  <ListItemAvatar>
                    <Avatar>{value.players.length}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.room}
                    secondary={value.host.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="play"
                      component={RouterLink}
                      to={`/play/${value.room}`} // TODO Will go even if Room doesn't exist
                      onClick={() => joinRoom(value.room)}
                    >
                      <ExitToAppIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
      <footer>
        <div>
          <Button color="primary" onClick={handleOpen}>
            Join Private Room
          </Button>
        </div>
        <Link component={RouterLink} to="/">
          &larr; Back
        </Link>
      </footer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Room Code</DialogTitle>
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
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              type="submit"
            >
              Join
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Join;
