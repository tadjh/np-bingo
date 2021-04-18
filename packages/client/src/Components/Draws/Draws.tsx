import { letters } from '../../Constants';
import { Pool } from '@np-bingo/types';
import './style.css';

export interface DrawsProps {
  draws?: Pool;
  disabled?: boolean;
}

export default function Draws({
  draws = [[], [], [], [], []],
  disabled,
}: DrawsProps) {
  let table = [];
  let itemsInit = [
    <li key="ball1"></li>,
    <li key="ball2"></li>,
    <li key="ball3"></li>,
    <li key="ball4"></li>,
    <li key="ball5"></li>,
    <li key="ball6"></li>,
    <li key="ball7"></li>,
    <li key="ball8"></li>,
    <li key="ball9"></li>,
    <li key="ball10"></li>,
    <li key="ball11"></li>,
    <li key="ball12"></li>,
    <li key="ball13"></li>,
    <li key="ball14"></li>,
    <li key="ball15"></li>,
  ];
  let letter;
  let i;
  for (i = 0; i < draws.length; i++) {
    letter = letters[i];
    let items = [...itemsInit];
    let j;
    for (j = 0; j < draws[i].length; j++) {
      items[j] = <li key={`ball${j + 1}`}>{`${letter}${draws[i][j]}`}</li>;
    }

    table[i] = (
      <ul
        key={`column${i + 1}`}
        className={['draws-column', `draws-column-${i + 1}`].join(' ')}
      >
        {items}
      </ul>
    );
  }
  return (
    <div className={['draws', 'shadow', disabled && 'disabled'].join(' ')}>
      {table}
    </div>
  );
}
