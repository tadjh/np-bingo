import React from 'react';
import Ball from '../../Components/Ball';
import { GameContext } from '../../App';
import { Gamestate, Pool } from '../../Constants/types';
import StatusMessage from '../../Components/Status';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import './style.css';
import { letters } from '../../Constants';

type Props = {
  play: (action: Gamestate) => void;
  checkCard: () => void;
  newBall: () => void;
  draws: Pool;
};

function Host(props: Props) {
  let { play, checkCard, newBall, draws } = props;
  let { INIT, READY, STANDBY, START, VALIDATE, FAILURE } = Gamestate;

  const Table = () => {
    let table = [];
    let items = [];
    let letter;
    let i;
    for (i = 0; i < draws.length; i++) {
      letter = letters[i];

      let j;
      for (j = 0; j < draws[i].length; j++) {
        items.push(<li key={j}>{`${letter} ${draws[i][j]}`}</li>);
      }
      table[i] = (
        <ul key={i} className={`draws-column-${i + 1}`}>
          {items}
        </ul>
      );
      items = [];
    }
    return <div className="draws">{table}</div>;
  };

  return (
    <div className="Host">
      <GameContext.Consumer>
        {(value) => (
          <React.Fragment>
            <div className="App-buttons">
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button onClick={() => play(value === INIT ? READY : INIT)}>
                  {value === INIT ? 'New Game' : 'End Game'}
                </Button>
                <Button
                  className={`${value !== VALIDATE && 'disabled'}`}
                  disabled={value !== VALIDATE && true}
                  onClick={checkCard}
                >
                  Check Card
                </Button>
              </ButtonGroup>
              .
            </div>
            <StatusMessage host={true} gamestate={value} />
            <Ball
              disabled={
                value !== START &&
                value !== STANDBY &&
                value !== FAILURE &&
                true
              }
              host={true}
              newBall={newBall}
            />
            <Table />
          </React.Fragment>
        )}
      </GameContext.Consumer>
    </div>
  );
}

export default Host;
