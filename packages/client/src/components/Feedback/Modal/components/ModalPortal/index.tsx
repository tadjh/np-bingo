import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { usePortal } from '../../../../../hooks';
import ModalBase, { ModalBaseProps } from '../ModalBase';

export interface ModalPortalProps extends ModalBaseProps {
  id: string;
  onClose?: () => void;
  noPortal?: boolean;
}

export default function ModalPortal({
  id,
  noPortal,
  onClose,
  children,
  ...props
}: ModalPortalProps) {
  const appRoot = useRef(document.getElementById('root'));
  const app = useRef(document.getElementById('container'));
  const target = app.current || appRoot.current;
  const classes =
    'absolute w-full h-full flex justify-center items-center top-0 left-0'; // top-0 left-0 right-0 bottom-0
  const modal = usePortal(target, id, classes);
  // TODO add event for Escape key or react-aria

  if (noPortal) return <ModalBase onClose={onClose}>{children}</ModalBase>;
  return ReactDOM.createPortal(
    <ModalBase onClose={onClose}>{children}</ModalBase>,
    modal
  );
}
