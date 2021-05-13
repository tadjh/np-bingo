import { Player, Theme } from '@np-bingo/types';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * User Hook
 * @param initialValue
 * @returns
 */
export function useUser(
  initialValue = {
    name: 'Player',
    socket: '',
  }
): [Player, React.Dispatch<React.SetStateAction<Player>>] {
  const [user, setUser] = useState<Player>(initialValue);
  return [user, setUser];
}

/**
 * Use Toggle Hook
 * @param initialValue
 * @returns value, toggle
 */
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}

/**
 * Use Form Hook
 * @param initialState
 * @param callback
 * @returns inputs, handleChange, handleSubmit
 */
export function useForm(
  initialState: { [key: string]: string },
  callback?: (inputs: any) => void
): [
  { [key: string]: string },
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  (
    event: React.ClipboardEvent<HTMLInputElement>,
    key: string,
    maxStringLength?: number | undefined
  ) => void
] {
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState('');

  /**
   * Handles input change
   * @param event Change event
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    setInputs((inputs: any) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  }

  /**
   * Handles form submit and returns useForm callback function
   * @param event Submit Event
   */
  function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }
    callback && callback(inputs);
  }

  /**
   * Handles clipboard paste
   * @param event Paste event
   * @param key Object key name
   * @param maxStringLength Clipboard max string length
   */
  function handlePaste(
    event: React.ClipboardEvent<HTMLInputElement>,
    key: string,
    maxStringLength?: number
  ) {
    let paste = event.clipboardData.getData('text');

    try {
      if (maxStringLength && paste.length > maxStringLength) {
        throw new Error('Clipboard paste is too long');
      }

      let pasteArray = paste.split('');
      let i: number;
      let data: { [key: string]: string };
      let pastedInput: { [key: string]: string } = {};

      for (i = 0; i < pasteArray.length; i++) {
        data = { [`${key}${i + 1}`]: pasteArray[i] };
        pastedInput = { ...pastedInput, ...data };
      }

      setInputs((inputs: any) => ({
        ...inputs,
        ...pastedInput,
      }));
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error: Error) {
    setErrors(error.message);
    // TODO removed return, test this
    // return
  }

  return [inputs, errors, handleChange, handleSubmit, handlePaste];
}

/**
 * // TODO Rename to useModal
 * Use Dialog Hook
 * @param initialState
 * @param callback
 * @returns open, handleOpen, handleClose
 */
export function useDialog(
  initialState: boolean,
  callback?: () => void
): [boolean, () => void, () => void] {
  const [open, setOpen] = useState(initialState);

  /**
   * Handles open
   */
  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * Handles close
   */
  const handleClose = () => {
    setOpen(false);
    callback && callback();
  };

  return [open, handleOpen, handleClose];
}

/**
 * Use Title Hook
 * @param title
 */
export const useTitle = (title?: string) => {
  useEffect(() => {
    title
      ? (document.title = `${title} Bingo - np-bingo`)
      : (document.title = `Bingo - np-bingo`);
  });
};

/**
 * Builds on useLocation to parse the query string
 * @returns
 */
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme !== 'dark' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

/**
 * Use Portal Hook
 * @param target DOM Element
 * @returns
 */
export function usePortal(target: HTMLElement | null): HTMLDivElement {
  // lazy load portal
  const portalRef = useRef<HTMLDivElement | null>(null);

  const portal = setPortal(portalRef);

  function setPortal(
    portalRef: React.MutableRefObject<HTMLDivElement | null>
  ): HTMLDivElement {
    if (portalRef.current !== null) return portalRef.current;
    portalRef.current = document.createElement('div');
    return portalRef.current;
  }

  useEffect(() => {
    if (target === null) return;
    target.appendChild(portal);
    return function cleanup() {
      if (!target.contains(portal)) return;
      target.removeChild(portal);
    };
  }, [portal, target]);

  return portal;
}

export function useProgress(
  duration: number,
  callback: (param: any) => void
): {
  progress: number;
  inProgress: boolean;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  enableProgress: () => void;
  disableProgress: () => void;
  triggerProgress: (callback?: (() => void) | undefined) => () => void;
  resetProgress: () => void;
} {
  const requestRef = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * Set inProgress true
   */
  const enableProgress = () => {
    setInProgress(true);
  };

  /**
   * Set inProgress false
   */
  const disableProgress = () => {
    console.log('disabled');
    setInProgress(false);
  };

  /**
   * Reset to initial state
   */
  const resetProgress = useCallback(() => {
    console.log('resetting');
    disableProgress();
    setProgress(0);
    startTime.current = null;
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      callback(elapsed);
      if (elapsed >= (duration || 5000)) return resetProgress();
      requestRef.current = requestAnimationFrame(animate);
    },
    [duration, callback, resetProgress]
  );

  useEffect(() => {
    if (!inProgress) return;
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, [animate, inProgress]);

  /**
   * Triggers progress for a set duration
   * @param Override useProgress duration
   * @param callback function
   * @returns void
   */
  const triggerProgress = (callback?: () => void) => {
    enableProgress();
    const lockout = setTimeout(callback || resetProgress, duration || 5000);
    return () => clearTimeout(lockout);
  };

  /**
   * Increment progress bar until it reaches 100%
   */
  // useEffect(() => {
  //   return
  // if (!inProgress) return;

  // const incrementProgress = () =>
  //   setProgress((prevProgress) =>
  //     prevProgress >= 100 ? 100 : prevProgress + 1
  //   );
  // const timer = setInterval(incrementProgress, (duration || 5000) / 115);
  // return () => clearInterval(timer);
  // });

  return {
    progress,
    inProgress,
    setProgress,
    enableProgress,
    disableProgress,
    triggerProgress,
    resetProgress,
  };
}
