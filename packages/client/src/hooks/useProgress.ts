import { useRef, useState, useCallback, useEffect } from 'react';

export function useProgress(
  duration = 5000,
  callback?: (param?: any) => void
): {
  progress: number;
  inProgress: boolean;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  enableProgress: () => void;
  disableProgress: () => void;
  pauseProgress: () => void;
} {
  const requestRef = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const max = useRef(100);
  const multiplier = useRef(max.current / duration);

  /**
   * Set inProgress true
   */
  const enableProgress = useCallback(() => {
    setInProgress(true);
  }, []);

  /**
   * Set inProgress false
   */
  const disableProgress = useCallback(() => {
    setInProgress(false);
  }, []);

  /**
   * Reset to initial state
   */
  const resetProgress = useCallback(() => {
    disableProgress();
    setProgress(0);
    startTime.current = null;
  }, [disableProgress]);

  /**
   * Pause animation progress and reset animation
   */
  const pauseProgress = useCallback(() => {
    cancelAnimationFrame(requestRef.current as number);
    // Reset progress due to startTime still triggering callback once animation re-enabled
    resetProgress();
  }, [resetProgress]);

  /**
   * Update progress with new value
   * @param elapsed time
   * @returns
   */
  const incrementProgress = (elapsed: number) =>
    setProgress(Math.min(multiplier.current * elapsed, max.current));

  /**
   * Animate progress bar
   */
  const animate = useCallback(
    (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      incrementProgress(elapsed);
      if (elapsed >= (duration || 5000)) {
        resetProgress();
        callback && callback();
        return;
      }
      requestRef.current = requestAnimationFrame(animate);
    },
    [duration, callback, resetProgress]
  );

  /**
   * Starts animation when inProgress is true
   */
  useEffect(() => {
    if (!inProgress) return;
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, [animate, inProgress]);

  return {
    progress,
    inProgress,
    setProgress,
    enableProgress,
    disableProgress,
    pauseProgress,
  };
}
