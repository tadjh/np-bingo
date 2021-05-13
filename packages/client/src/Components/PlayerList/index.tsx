import React from 'react';
import List from '../List';
import ListItem from '../ListItem';
import ListItemText from '../ListItemText';
import IconButton from '../IconButton';
import MinusIcon from '../../Assets/Minus';
import CheckIcon from '../../Assets/Check';
import CloseCircleIcon from '../../Assets/CloseCircle';
import Tooltip from '../Tooltip';
import { Player } from '@np-bingo/types';

export interface ListProps {
  data?: any[];
  action?: (param?: any) => void;
}

export interface PlayerListProps extends ListProps {
  data?: Player[];
  action?: (player: Player) => void;
}

export default function PlayerList({
  data = [],
  action: onRemove,
}: PlayerListProps): JSX.Element {
  if (data.length !== 0)
    return (
      <List>
        {data.map((player, index) => {
          return (
            <ListItem key={`player${index + 1}`}>
              <div
                className={`relative tooltip flex justify-center items-center w-10 h-10 rounded-full text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90 dark:group-hover:text-opacity-90 ${
                  player.ready
                    ? 'bg-green-200 group-hover:bg-green-300 dark:bg-green-800 dark:group-hover:bg-green-700 '
                    : 'bg-gray-200 group-hover:bg-gray-300 dark:bg-gray-800 dark:group-hover:bg-gray-700 '
                } shadow-sm`}
              >
                <Tooltip direction="right">
                  {player.ready ? 'Ready' : 'Not Ready'}
                </Tooltip>
                {player.ready ? <CheckIcon /> : <MinusIcon />}
              </div>
              <ListItemText
                primary={player.name}
                secondary={player.ready ? 'Ready' : 'Not ready...'}
              />
              <div className="ml-auto">
                <IconButton
                  className="delete-button"
                  onClick={onRemove && (() => onRemove(player))}
                  aria-label="status"
                >
                  <CloseCircleIcon className="text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90" />
                </IconButton>
              </div>
            </ListItem>
          );
        })}
      </List>
    );
  return (
    <p className="flex justify-center items-center text-black dark:text-white text-opacity-60 dark:text-opacity-60">
      No players found
    </p>
  );
}
