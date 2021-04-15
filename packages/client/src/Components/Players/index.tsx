import React from 'react';
import './style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { Player } from '@np-bingo/types';

type Props = {
  players: Player[];
  removePlayer: (player: Player) => void;
};

function Players(props: Props) {
  let { players, removePlayer } = props;
  return (
    <div className="player-list">
      <List>
        {players.map((value, index) => {
          return (
            <ListItem key={`player-${index + 1}`}>
              <ListItemAvatar>
                <Avatar>{value.ready ? <CheckIcon /> : <RemoveIcon />}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={value.name}
                secondary={value.ready ? 'Ready' : 'Selecting a card...'}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => removePlayer(value)}
                  edge="end"
                  aria-label="status"
                >
                  <CancelIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default Players;
