import { useState, ChangeEvent, FormEvent, ClipboardEvent } from 'react';

export function useForm<S>(
  initialFormState: S,
  callback?: (inputs: S) => void
) {
  const [inputs, setInputs] = useState(initialFormState);
  const [errors, setErrors] = useState('');

  /**
   * Handles input change
   * @param event Change event
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  /**
   * Handles form submit and returns useForm callback function
   * @param event Submit Event
   */
  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }
    callback && callback(inputs);
  }

  /**
   * Format inputs
   * @param array
   * @param key
   * @returns
   */
  const formatInputs = (array: string[], key: string): S => {
    const formattedInputs = array.map((item, index) => {
      return { [`${key}${index + 1}`]: item };
    });
    return Object.assign({}, ...formattedInputs);
  };

  /**
   * Handles clipboard paste
   * @param event Paste event
   * @param key Object key name
   * @param maxStringLength Clipboard max string length
   */
  const handlePaste = (
    event: ClipboardEvent<HTMLInputElement>,
    key: string,
    maxStringLength?: number
  ) => {
    const paste = event.clipboardData.getData('text');

    try {
      if (maxStringLength && paste.length > maxStringLength) {
        throw new Error('Clipboard paste is too long');
      }

      const formattedInputs = formatInputs(paste.split(''), key);

      setInputs((prevInputs) => ({
        ...prevInputs,
        ...formattedInputs,
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
  };

  /**
   * Reset form state
   */
  const clearForm = () => {
    setInputs(initialFormState);
  };

  return { inputs, errors, handleChange, handleSubmit, handlePaste, clearForm };
}
