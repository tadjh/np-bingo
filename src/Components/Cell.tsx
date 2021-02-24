import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  crossmark: boolean;
}

const Cell = (props: Props) => {
  return (
    <div
      id={props.id}
      className={`grid-item ${props.crossmark && 'crossmark'} ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Cell;
