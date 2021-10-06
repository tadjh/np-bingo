import React from 'react';
import ModalPortal, { ModalPortalProps } from '../ModalPortal';

export interface ModalProps extends ModalPortalProps {
  open: boolean;
}

export default function Modal({
  open,
  ...props
}: ModalProps): JSX.Element | null {
  if (!open) return null;
  return <ModalPortal {...props} />;
}
