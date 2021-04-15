import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import './style.css';
import { Ball as BallType } from '@np-bingo/types';

type Props = {
  ball: BallType;
  loop: boolean;
  progress: number;
  newBall?: () => void;
  host?: boolean;
  disabled?: boolean;
};

function Ball(props: Props) {
  let { ball, loop, progress, newBall, host, disabled } = props;

  return (
    <div className="ball-container-wrapper">
      {host && newBall && (
        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          className={`${disabled && 'disabled'}`}
          onClick={newBall}
        >
          New Ball
        </Button>
      )}
      <div className="ball-container">
        <div className={`ball shadow ${ball.column} ${disabled && 'disabled'}`}>
          <div className="column">{ball.column}</div>
          <div className="number">{ball.number !== 0 && ball.number}</div>
        </div>
        <p
          className={`remainder ${disabled && 'hidden'}`}
        >{`Balls Remaining: ${ball.remainder}`}</p>
        {loop && <LinearProgress variant="determinate" value={progress} />}
      </div>
    </div>
  );
}

export default Ball;
