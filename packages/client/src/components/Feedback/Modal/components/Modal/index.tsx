import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { usePortal } from '../../../../../hooks';
import ModalBase from '../ModalBase';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  open?: boolean;
  onClose?: () => void;
}

export default function Modal({
  id,
  open = false,
  onClose,
  children,
}: ModalProps): JSX.Element | null {
  const appRoot = useRef(document.getElementById('root'));
  const app = useRef(document.getElementById('container'));
  const target = app.current || appRoot.current;
  const classes =
    'absolute w-full h-full flex justify-center items-center top-0 left-0'; // top-0 left-0 right-0 bottom-0
  const modal = usePortal(target, id, classes);
  // if (!open) return null;
  modal.setAttribute('class', '');
  modal.setAttribute('class', classes);
  // TODO add event for Escape key or react-aria
  // TODO focus?
  return ReactDOM.createPortal(
    <ModalBase onClose={onClose}>{children}</ModalBase>,
    modal
  );
}
