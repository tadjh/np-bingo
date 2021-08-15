import { useCallback, useState } from 'react';

export default function useDialog(
  initialState = false
): [boolean, () => void, () => void] {
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

  return [isOpen, open, close];
}
