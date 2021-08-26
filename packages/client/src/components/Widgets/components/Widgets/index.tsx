import { useContext } from 'react';
import Share from '../Share';
import { Room } from '@np-bingo/types';
import Code from '../Code';
import { FeaturesContext } from '../../../../context';
import IconMenu from '../../../Inputs/IconMenu';

export interface WidgetProps {
  room?: Room;
}

export default function Widgets({ room = '' }: WidgetProps): JSX.Element {
  const { allowShare } = useContext(FeaturesContext);
  return (
    <div className="flex gap-2">
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
