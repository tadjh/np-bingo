import { letters } from '../../Constants';
import { Pool } from '@np-bingo/types';
import './style.css';

type Props = {
  draws: Pool;
  disabled: boolean;
};

function Draws(props: Props) {
  let { draws, disabled } = props;
  let table = [];
  let itemsInit = [
    <li key={1}></li>,
    <li key={2}></li>,
    <li key={3}></li>,
    <li key={4}></li>,
    <li key={5}></li>,
    <li key={6}></li>,
    <li key={7}></li>,
    <li key={8}></li>,
    <li key={9}></li>,
    <li key={10}></li>,
    <li key={11}></li>,
    <li key={12}></li>,
    <li key={13}></li>,
    <li key={14}></li>,
    <li key={15}></li>,
  ];
  let letter;
  let i;
  for (i = 0; i < draws.length; i++) {
    letter = letters[i];
    let items = [...itemsInit];
    let j;
    for (j = 0; j < draws[i].length; j++) {
      items[j] = <li key={j + 1}>{`${letter}${draws[i][j]}`}</li>;
    }

    table[i] = (
      <ul key={i + 1} className={`draws-column draws-column-${i + 1}`}>
        {items}
      </ul>
    );
  }
  return (
    <div className={`draws shadow ${disabled && 'disabled'}`}>{table}</div>
  );
}

export default Draws;
