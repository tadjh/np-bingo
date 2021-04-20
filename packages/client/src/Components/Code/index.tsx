import React from 'react';
import './style.css';
import Share from '../Share';
import { Room } from '@np-bingo/types';
import { FeautresContext } from '../../Utils/contexts';

export interface CodeProps {
  room: Room;
}

export default function Code({ room = '    ' }: CodeProps) {
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
    <div id="Code">
      <div className="code-label">Room Code:</div>
      <div className="code-row">
        <div className="code-left"></div>
        <div className="code">
          <code>{room !== '' ? code(room) : <Empty />}</code>
        </div>
        <FeautresContext.Consumer>
          {(features) => (
            <div className="code-right align-left">
              {features['share-room'] && room !== '' && <Share room={room} />}
            </div>
          )}
        </FeautresContext.Consumer>
      </div>
    </div>
  );
}
