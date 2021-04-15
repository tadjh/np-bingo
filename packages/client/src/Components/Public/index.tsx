import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { Room } from '@np-bingo/types';
import './style.css';

type Props = {
  rooms: {
    _id: string;
    room: Room;
    host: { id: number; name: string };
    players: number[];
  }[];
  joinRoom: (room: string) => void;
};

function Public(props: Props) {
  let { rooms, joinRoom } = props;
  return (
    <div className="room-list">
      <Typography variant="h5">Public Rooms</Typography>
      <List>
        {rooms.map((value) => {
          return (
            <ListItem key={value.room}>
              <ListItemAvatar>
                <Avatar>{value.players.length}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={value.room} secondary={value.host.name} />
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
  );
}

export default Public;
