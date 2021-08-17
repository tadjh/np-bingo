import { useCallback, useState } from 'react';

export function useDialog(
  initialState = false
): [boolean, () => void, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(initialState);

  /**
   * Open
   */
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * Close
   */
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Toggle isOpen
   */
  const toggle = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  return [isOpen, open, close, toggle];
}
