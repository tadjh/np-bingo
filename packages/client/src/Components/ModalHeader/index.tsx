import React from 'react';
import CloseIcon from '../../Assets/Close';
import IconButton from '../IconButton';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export default function ModalHeader({
  onClose,
  children,
  ...props
}: ModalHeaderProps): JSX.Element {
  return (
    <div
      className="flex items-center justify-between bg-blue-300 dark:bg-gray-700 p-5 border-b-2 border-blue-400 dark:border-gray-900"
      {...props}
    >
      <span className="text-lg text-black dark:text-white text-opacity-90 dark:text-opacity-90">
        {children}
      </span>
      <IconButton className="close-button" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
