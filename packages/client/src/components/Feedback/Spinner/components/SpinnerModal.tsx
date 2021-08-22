import { useRef } from 'react';
import ReactDOM from 'react-dom';
import Spinner, { SpinnerProps } from '..';
import { usePortal } from '../../../../hooks';

export function SpinnerModal({
  id = 'spinner',
  isLoading = false,
  ...props
}: SpinnerProps): JSX.Element | null {
  const appRoot = useRef(document.getElementById('root'));
  const app = useRef(document.getElementById('App'));
  const target = app.current || appRoot.current;
  const classes =
    'absolute w-screen h-screen top-0 left-0 flex justify-center items-center';
  const portal = usePortal(target, id, classes);
  portal.setAttribute('class', '');
  if (!isLoading) return null;
  portal.setAttribute('class', classes);
  return ReactDOM.createPortal(<Spinner isLoading={isLoading} />, portal);
}
