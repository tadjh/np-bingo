import React from 'react';
import './style.css';
import Share from '../Share';
import features from '../../Config/features';

type Props = {
  room: string;
};

function Code(props: Props) {
  let { room } = props;

  const code = (room: string) => {
    let array = Object.assign([], room);
    return array.map((value, index) => {
      return (
        <span key={index} className={`code-item ${room === '' && 'empty'}`}>
          {value}
        </span>
      );
    });
  };

  const Empty = () => {
    return (
      <React.Fragment>
        <span className="code-item empty">_</span>
        <span className="code-item empty">_</span>
        <span className="code-item empty">_</span>
        <span className="code-item empty">_</span>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="code-label">Room Code:</div>
      <div className="code-row">
        <div className="code-left"></div>
        <div className="code">
          <code>{room !== '' ? code(room) : <Empty />}</code>
        </div>
        <div className="code-right align-left">
          {features['share-room'] && <Share />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Code;
