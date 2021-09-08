import { useState } from 'react';

export function useForm(
  initialState: { [key: string]: string },
  callback?: (inputs: any) => void
) {
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
  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    key: string,
    maxStringLength?: number
  ) => {
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
  };

  /**
   * Updates error
   * @param error
   */
  const handleError = (error: any) => {
    setErrors(error.message);
    // TODO removed return, test this
    // return
  };

  return { inputs, errors, handleChange, handleSubmit, handlePaste };
}
