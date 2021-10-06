import { useState, useCallback } from 'react';

export function useToggle(
  initialValue = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  const set = useCallback(() => {
    setValue(true);
  }, []);

  const unset = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, set, unset];
}
