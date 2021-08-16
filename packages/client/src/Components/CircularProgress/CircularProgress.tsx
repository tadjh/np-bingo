import React from 'react';

export default function CircularProgress(
  props: React.SVGProps<SVGCircleElement>
): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-23.5 w-23.5"
      viewBox="22 22 44 44"
      fill="currentColor"
    >
      <circle
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        strokeWidth="3.6"
        strokeDasharray="126.92"
        className="stroke-current"
        {...props}
      ></circle>
    </svg>
  );
}
