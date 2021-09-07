import { Fragment } from 'react';
export interface ModalBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}
export default function ModalBase({
  onClose,
  className = '',
  children,
}: ModalBaseProps): JSX.Element {
  return (
    <Fragment>
      <div
        className="absolute w-full h-full bg-gray-500 dark:bg-black bg-opacity-90 dark:bg-opacity-60 z-40" // w-screen h-screen top-0
        onClick={onClose}
      ></div>
      <div
        className={`absolute z-50 w-11/12 rounded-md flex flex-col gap-5 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white text-opacity-90 dark:text-opacity-90 overflow-hidden shadow-md ${className}`}
      >
        {children}
      </div>
    </Fragment>
  );
}
