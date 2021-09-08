import React from 'react';
import CloseIcon from '../../../../../assets/icons/Close';
import IconButton from '../../../../Inputs/IconButton/components/IconButton';
import { useClickSoft } from '../../../../../hooks/useClickSoft';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export function ModalHeader({
  onClose,
  children,
  ...props
}: ModalHeaderProps): JSX.Element {
  const clickSoftSfx = useClickSoft();
  return (
    <div
      className="flex items-center justify-between bg-blue-300 dark:bg-gray-700 px-4 py-2 border-b-2 border-blue-400 dark:border-gray-900"
      {...props}
    >
      <span className="text-lg text-black dark:text-white text-opacity-90 dark:text-opacity-90">
        {children}
      </span>
      <IconButton
        className="close-button"
        onClick={onClose}
        onMouseDown={clickSoftSfx}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}
