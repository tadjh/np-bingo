import React from 'react';

export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalContent({ children }: ModalContentProps): JSX.Element {
  return <div className="flex flex-col gap-3 px-5">{children}</div>;
}
