import { useCallback, useState } from 'react';
import { Theme } from '@np-bingo/types';

export function useTheme(initialTheme: Theme): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme !== 'dark' ? 'dark' : 'light'));
  }, []);
  return [theme, toggleTheme];
}
