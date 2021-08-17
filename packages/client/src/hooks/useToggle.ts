import { useState, useCallback } from 'react';

export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);
  return [value, toggle];
}
