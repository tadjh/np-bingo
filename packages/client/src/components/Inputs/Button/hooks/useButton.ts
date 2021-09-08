import { MouseEvent, useEffect, useRef, useState } from 'react';
import { ButtonVariants } from '..';
import { useClickHard } from '../../../../hooks';

export interface ButtonState {
  isRippling: boolean;
  coordinates: { x: number; y: number };
}

export const initialButtonState = {
  isRippling: false,
  coordinates: { x: -1, y: -1 },
};

export function useButton(variant: ButtonVariants, disabled?: boolean) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [{ isRippling, coordinates }, setButtonState] =
    useState<ButtonState>(initialButtonState);
  const clickHardSfx = useClickHard();

  const style = (disabled && 'disabled') || variant;

  /**
   * Button style based on variant or disabled
   * @param variant
   * @returns string
   */
  const buttonStyle = (): string => {
    switch (style) {
      case 'disabled':
        return 'disabled:opacity-50 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:text-gray-800 dark:disabled:text-gray-400 disabled:shadow-none disabled:cursor-default disabled:translate-y-0 pointer-events-none';
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-300 dark:hover:bg-blue-400 text-white dark:text-black text-opacity-90 dark:text-opacity-90 hover:shadow-xl';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 dark:bg-green-300 dark:hover:bg-green-400 text-white dark:text-black text-opacity-90 dark:text-opacity-90 hover:shadow-xl';
      default:
        return 'text-blue-600 dark:text-blue-300 hover:text-white dark:hover:text-black hover:text-opacity-90 dark:hover:text-opacity-90 hover:bg-blue-700 dark:hover:bg-blue-400 hover:shadow-xl';
    }
  };

  /**
   * Change coordinates if they have changed
   * @param coordinateX
   * @param coordinateY
   */
  const setCoordinates = (coordinateX: number, coordinateY: number) => {
    setButtonState((prevButtonState) => {
      if (
        prevButtonState.coordinates.x === coordinateX ||
        prevButtonState.coordinates.y === coordinateY
      )
        return prevButtonState;
      return {
        isRippling: true,
        coordinates: {
          x: coordinateX,
          y: coordinateY,
        },
      };
    });
  };

  /**
   * Handle set coordinates
   * @param event
   * @returns
   */
  const handleSetCoordinates = (event: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current === null) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const coordinateX = Math.round(event.clientX - rect.left - 10);
    const coordinateY = Math.round(event.clientY - rect.top - 10);
    setCoordinates(coordinateX, coordinateY);
  };

  /**
   * Mouse Down handler
   * @param event
   */
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    clickHardSfx();
    handleSetCoordinates(event);
  };

  /**
   * Remove ripple after animation completes
   */
  useEffect(() => {
    if (!isRippling) return;
    const timer = setTimeout(() => setButtonState(initialButtonState), 750);
    return () => clearTimeout(timer);
  }, [isRippling, coordinates]);

  return {
    isRippling,
    coordinates,
    buttonRef,
    buttonStyle,
    handleMouseDown,
  };
}
