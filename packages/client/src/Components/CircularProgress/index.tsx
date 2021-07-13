import React from 'react';
import CircularProgressSVG from './CircularProgress';

export interface CircularProgressProps
  extends React.SVGProps<SVGCircleElement> {
  progress?: number;
}

export default function CircularProgress({
  progress = 0,
  className = '',
}: CircularProgressProps): JSX.Element {
  const svgDashArray = 126.92;

  const dashOffset = svgDashArray - (svgDashArray * progress) / 100;

  return (
    <div
      className={`transform top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 -rotate-90 text-gray-300 dark:text-gray-600 ${className}`}
    >
      <CircularProgressSVG strokeDashoffset={`${dashOffset}px`} />
    </div>
  );
}
