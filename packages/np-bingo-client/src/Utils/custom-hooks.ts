import { useState, useCallback, useEffect } from 'react';

/**
 * Use Toggle Hook
 * @param initialValue
 * @returns value, toggle
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  return { value, toggle };
}

/**
 * Use Form Hook
 * @param initialState
 * @param callback
 * @returns inputs, handleChange, handleSubmit
 */
export function useForm(
  initialState: { [key: string]: string },
  callback: () => void
) {
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInputs((inputs: any) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }
    callback();
  }

  return { inputs, handleChange, handleSubmit };
}

/**
 * Use Dialog Hook
 * @param initialState
 * @param callback
 * @returns open, handleOpen, handleClose
 */
export function useDialog(initialState: boolean, callback?: () => void) {
  const [open, setOpen] = useState(initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    callback && callback();
  };

  return { open, handleOpen, handleClose };
}

/**
 * Use Title Hook
 * @param title
 */
export const useTitle = (title: string) => {
  useEffect(() => {
    title && (document.title = `${title} Bingo | np-bingo`);
  });
};
