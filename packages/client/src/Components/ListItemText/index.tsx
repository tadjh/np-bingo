import React from 'react';
import Tooltip from '../Tooltip';

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  primary?: string;
  primaryInfo?: string;
  secondary?: string;
  secondaryInfo?: string;
}

export default function ListItemText({
  primary = '',
  primaryInfo = '',
  secondary = '',
  secondaryInfo = '',
}: ListItemTextProps): JSX.Element {
  return (
    <div>
      <span className="relative tooltip font-bold font-mono text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90 dark:group-hover:text-opacity-90">
        {primaryInfo !== '' && (
          <Tooltip direction="right">{primaryInfo}</Tooltip>
        )}
        {primary}
      </span>
      <p className="relative tooltip text-black dark:text-white text-opacity-60 dark:text-opacity-60 group-hover:text-opacity-90 dark:group-hover:text-opacity-90">
        {secondaryInfo !== '' && (
          <Tooltip direction="right">{secondaryInfo}</Tooltip>
        )}
        {secondary}
      </p>
    </div>
  );
}
