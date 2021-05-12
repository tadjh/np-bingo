import React from 'react';

export interface ModalFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function ModalFooter({
  children,
}: ModalFooterProps): JSX.Element {
  return <div className="flex justify-end p-3">{children}</div>;
}
