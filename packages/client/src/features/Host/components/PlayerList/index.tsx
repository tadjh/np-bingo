import React from 'react';
import List, {
  ListItem,
  ListItemText,
} from '../../../../components/Display/List';
import IconButton from '../../../../components/Inputs/IconButton/components/IconButton';
import MinusIcon from '../../../../assets/icons/Minus';
import CheckIcon from '../../../../assets/icons/Check';
import CloseCircleIcon from '../../../../assets/icons/CloseCircle';
import Tooltip from '../../../../components/Display/Tooltip';
import { Player } from '@np-bingo/types';

export interface ListProps {
  data?: any[];
  action?: (param?: any) => void;
}

export interface PlayerListProps extends ListProps {
  data?: Player[];
  action?: (player: Player) => void;
}

export function PlayerList({
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
                className={[
                  'relative tooltip flex justify-center items-center w-10 h-10 rounded-full text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90 dark:group-hover:text-opacity-90 shadow-sm',
                  player.ready
                    ? 'bg-green-200 group-hover:bg-green-300 dark:bg-green-800 dark:group-hover:bg-green-700 '
                    : 'bg-gray-200 group-hover:bg-gray-300 dark:bg-gray-800 dark:group-hover:bg-gray-700 ',
                ].join(' ')}
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
                  <CloseCircleIcon />
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
