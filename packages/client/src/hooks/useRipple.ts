import { MouseEvent, useEffect, useReducer } from 'react';
import { INIT } from '../config/constants';

const DO_RIPPLE = 'DO RIPPLE';

type Coordinates = { x: number; y: number };

export interface RippleState {
  isRippling: boolean;
  coordinates: Coordinates;
}

export const rippleInitialState: RippleState = {
  isRippling: false,
  coordinates: { x: -1, y: -1 },
};

export type RippleActions =
  | { type: typeof INIT }
  | { type: typeof DO_RIPPLE; payload: Coordinates };

export function useRipple(button: Element | null) {
  function rippleReducer(
    state: RippleState,
    action: RippleActions
  ): RippleState {
    switch (action.type) {
      case INIT:
        return rippleInitialState;
      case DO_RIPPLE:
        return { ...state, isRippling: true, coordinates: action.payload };
      default:
        throw new Error('Invalid Ripple Action');
    }
  }

  const [{ isRippling, coordinates }, rippleDispatch] = useReducer<
    (state: RippleState, action: RippleActions) => RippleState
  >(rippleReducer, rippleInitialState);

  /**
   * Change coordinates if they have changed
   * @param coordinateX
   * @param coordinateY
   */
  const setCoordinates = (coordinateX: number, coordinateY: number) => {
    rippleDispatch({
      type: DO_RIPPLE,
      payload: { x: coordinateX, y: coordinateY },
    });
  };

  /**
   * Handle set coordinates
   * @param event
   * @returns
   */
  const handleSetCoordinates = (event: MouseEvent<Element>) => {
    if (button === null) return;
    const { top, left } = button.getBoundingClientRect();
    const coordinateX = Math.round(event.clientX - left - 10);
    const coordinateY = Math.round(event.clientY - top - 10);
    setCoordinates(coordinateX, coordinateY);
  };

  /**
   * Reset isRipple and coordinates
   */
  const clearRipple = () => {
    rippleDispatch({ type: INIT });
  };

  /**
   * Remove ripple after animation completes
   */
  useEffect(() => {
    if (!isRippling) return;
    const timer = setTimeout(clearRipple, 750);
    return () => clearTimeout(timer);
  }, [isRippling]);

  return { isRippling, coordinates, handleSetCoordinates };
}
