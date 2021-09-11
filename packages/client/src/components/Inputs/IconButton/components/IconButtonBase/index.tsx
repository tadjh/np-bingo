import {
  HTMLAttributes,
  MouseEventHandler,
  MouseEvent,
  ReactNode,
  useRef,
} from 'react';
import { useRipple } from '../../../../../hooks/useRipple';
import Ripple from '../../../../Feedback/Ripple';

export interface IconButtonbaseProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButtonBase({
  children,
  disabled,
  onMouseDown,
  ...props
}: IconButtonbaseProps): JSX.Element {
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const { isRippling, coordinates, handleSetCoordinates } = useRipple(
    iconButtonRef.current
  );

  /**
   * Mouse Down handler
   * @param event
   */
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    handleSetCoordinates(event);
    onMouseDown && onMouseDown(event);
  };

  return (
    <button
      {...props}
      disabled={disabled}
      ref={iconButtonRef}
      onMouseDown={handleMouseDown}
    >
      {isRippling && (
        <Ripple
          style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px` }}
        />
      )}
      {children}
    </button>
  );
}
