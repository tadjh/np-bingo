import { useToggle } from './useToggle';

export function useSounds(initialValue = false): [boolean, () => void] {
  return useToggle(initialValue);
}
