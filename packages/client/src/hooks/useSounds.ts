import useToggle from './useToggle';

export default function useSounds(initialValue = false): [boolean, () => void] {
  return useToggle(initialValue);
}
