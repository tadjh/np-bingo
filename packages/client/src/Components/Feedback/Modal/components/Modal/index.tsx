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
  const app = useRef(document.getElementById('App'));
  const target = app.current || appRoot.current;

  const modal = usePortal(target);
  modal.setAttribute('id', id);
  modal.setAttribute(
    'class',
    'absolute w-screen h-screen top-0 left-0 flex justify-center items-center'
  );

  // TODO add event for Escape key
  // TODO focus?
  if (!open) return null;
  return ReactDOM.createPortal(
    <ModalBase onClose={onClose}>{children}</ModalBase>,
    modal
  );
}
