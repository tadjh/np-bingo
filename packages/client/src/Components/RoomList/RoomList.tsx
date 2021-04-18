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
import './style.css';

export interface ListProps {
  data?: any[];
  action?: (param?: any) => void;
}

export interface RoomListProps extends ListProps {
  action?: (room: string) => void;
}

export default function RoomList({ data = [], action: onJoin }: RoomListProps) {
  return (
    <div className="room-list">
      <Typography variant="h5">Public Rooms</Typography>
      {data.length !== 0 ? (
        <List>
          {data.map((value) => {
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
                    onClick={onJoin && (() => onJoin(value.room))}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography>No rooms found</Typography>
      )}
    </div>
  );
}
