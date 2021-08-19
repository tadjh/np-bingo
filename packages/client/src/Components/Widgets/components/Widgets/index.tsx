import { useContext } from 'react';
import Share from '../Share';
import { Gamemode, Room } from '@np-bingo/types';
import Code from '../Code';
import { FeautresContext } from '../../../../context';
import IconMenu from '../../../Inputs/IconMenu';

export interface WidgetProps {
  variant?: Gamemode;
  room?: Room;
}

export default function Widgets({
  variant = 'default',
  room = '',
}: WidgetProps): JSX.Element {
  const { allowShare } = useContext(FeautresContext);
  if (variant === 'solo') return <IconMenu direction="up" />;
  return (
    <div className="flex gap-4">
      <div className="flex justify-center items-center w-14">
        {allowShare && <Share room={room} />}
      </div>
      <div className="flex justify-center items-center">
        <Code room={room} />
      </div>
      <div className="flex justify-center items-center w-14">
        <IconMenu direction="up" />
      </div>
    </div>
  );
}
