import React from 'react';
import './style.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  crossmark: boolean;
}

const Cell = (props: Props) => {
  let { id, crossmark, className, onClick, children } = props;
  return (
    <div
      id={id}
      className={`grid-item ${className}${crossmark ? ' crossmark' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Cell;
