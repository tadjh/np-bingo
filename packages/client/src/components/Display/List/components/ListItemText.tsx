import React from 'react';
import Tooltip from '../../Tooltip';

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  primary?: string;
  primaryInfo?: string;
  secondary?: string;
  secondaryInfo?: string;
}

export function ListItemText({
  primary = '',
  primaryInfo = '',
  secondary = '',
  secondaryInfo = '',
}: ListItemTextProps): JSX.Element {
  return (
    <div>
      <span className="relative group font-bold font-mono text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90 dark:group-hover:text-opacity-90">
        <Tooltip direction="right">{primaryInfo}</Tooltip>
        {primary}
      </span>
      <p className="relative group text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90 dark:group-hover:text-opacity-90">
        <Tooltip direction="right">{secondaryInfo}</Tooltip>
        {secondary}
      </p>
    </div>
  );
}
