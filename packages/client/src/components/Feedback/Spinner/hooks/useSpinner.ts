import { useCallback, useEffect, useRef, useState } from 'react';
import { useToggle } from '../../../../hooks';

export function useSpinner(initLoading: boolean) {
  // const requestRef = useRef<number | null>(null);
  // const startTime = useRef<number | null>(null);
  const [isLoading] = useToggle(initLoading);
  // const [rotation, setRotation] = useState(0);
  // const max = useRef(360);

  // const incrementLoading = useCallback(
  //   (elapsed: number) => setRotation(elapsed % max.current),
  //   []
  // );

  // const resetLoading = () => {
  //   setRotation(0);
  // };
  /**
   * Animate progress bar
   */
  // const animate = useCallback(
  //   (timestamp: number) => {
  //     if (startTime.current === null) startTime.current = timestamp;
  //     const elapsed = timestamp - startTime.current;
  //     incrementLoading(elapsed);
  //     if (elapsed >= 5000) {
  //       return resetLoading();
  //     }
  //     requestRef.current = requestAnimationFrame(animate);
  //   },
  //   [incrementLoading]
  // );

  /**
   * Starts animation when isLoading is true
   */
  // useEffect(() => {
  //   if (!isLoading) return;
  //   requestRef.current = requestAnimationFrame(animate);
  //   return () => cancelAnimationFrame(requestRef.current as number);
  // }, [animate, isLoading]);

  return [isLoading];
}
