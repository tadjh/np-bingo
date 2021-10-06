import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '../../../../components/Inputs/IconButton/components/IconButton';
import ChevronRightIcon from '../../../../assets/icons/ChevronRight';
import Tooltip from '../../../../components/Display/Tooltip';
import List, {
  ListItem,
  ListItemText,
} from '../../../../components/Display/List';
import { useClickHard } from '../../../../hooks/useClickHard';

export interface ListProps {
  rooms?: any[];
  onClick?: (param?: any) => void;
}

export interface RoomListProps extends ListProps {
  onClick?: (room: string) => void;
}

export default function RoomList({
  rooms = [],
  onClick,
}: RoomListProps): JSX.Element {
  const clickHardSfx = useClickHard();
  if (rooms.length > 0)
    return (
      <List title="Public Rooms">
        {rooms.map((item) => {
          const roomDescription = onClick && (() => onClick(item.room));
          return (
            <ListItem key={item.room}>
              <div className="relative group flex justify-center items-center w-10 h-10 rounded-full text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90 dark:group-hover:text-opacity-90 bg-gray-200 group-hover:bg-gray-300 dark:bg-gray-800 dark:group-hover:bg-gray-700 shadow-md">
                <Tooltip direction="right">{`${item.players.length} players in room`}</Tooltip>
                {item.players.length}
              </div>
              <ListItemText
                primary={item.room}
                secondary={item.host.name}
                primaryInfo="Room Code"
                secondaryInfo="Room Host"
              />
              <div className="ml-auto">
                <IconButton
                  aria-label="play"
                  component={RouterLink}
                  to={`/play/${item.room}`}
                  onClick={roomDescription}
                  onMouseDown={clickHardSfx}
                  description="Join Room"
                  direction="left"
                >
                  <ChevronRightIcon />
                </IconButton>
              </div>
            </ListItem>
          );
        })}
      </List>
    );
  return (
    <p className="flex justify-center items-center text-black dark:text-white text-opacity-60 dark:text-opacity-60">
      No public rooms found
    </p>
  );
}
