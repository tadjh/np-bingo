import React from 'react';

export interface ModalFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalFooter({ children }: ModalFooterProps): JSX.Element {
  return (
    <div className="flex justify-end p-3 gap-x-3 items-center">{children}</div>
  );
}
