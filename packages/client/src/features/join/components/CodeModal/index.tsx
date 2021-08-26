import React from 'react';
import Modal, {
  ModalHeader,
  ModalContent,
  ModalFooter,
} from '../../../../components/Feedback/Modal';
import Button from '../../../../components/Inputs/Button';
import { useForm } from '../../../../hooks';
import { roomChar } from '@np-bingo/common';

export interface CodeModalProps {
  open: boolean;
  onClose: () => void;
  onSumbit?: (room: string) => void;
}

const initialState = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
};

export default function CodeModal({
  open = false,
  onClose,
  onSumbit,
}: CodeModalProps): JSX.Element {
  const [inputs, errors, handleChange, handleSubmit, handlePaste] = useForm(
    initialState,
    onSubmitCallback
  );

  /**
   * Action on form submit
   * @param formInputs
   */
  function onSubmitCallback(formInputs: typeof inputs) {
    let room = Object.values(formInputs).join('').toUpperCase();
    onSumbit && onSumbit(room);
  }

  // TODO Improve logic
  // TODO Handle Backspace
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.toUpperCase();
    handleChange(event);

    if (event.target.value.length < event.target.maxLength) {
      if (!event.target.previousSibling) return;
      let target = event.target.previousSibling as HTMLInputElement;
      target.focus();
    }

    if (event.target.value.length === event.target.maxLength) {
      if (!event.target.nextSibling) return;
      let target = event.target.nextSibling as HTMLInputElement;
      target.focus();
    }
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.keyCode === 8 || event.keyCode === 46) {
  //     if (!event.currentTarget.previousSibling) return;
  //     let target = event.currentTarget.previousSibling as HTMLInputElement;
  //     target.focus();
  //   }
  // };
  // onKeyDown={handleKeyDown}

  return (
    <Modal
      id="code-modal"
      open={open}
      onClose={onClose}
      aria-labelledby="join-dialog-title"
    >
      <ModalHeader id="join-dialog-title" onClose={onClose}>
        Input Room Code
      </ModalHeader>
      <form onSubmit={handleSubmit} autoComplete="off">
        <ModalContent>
          <p className="text-black dark:text-white text-opacity-60 dark:text-opacity-60">
            {errors && errors}
          </p>
          <fieldset className="flex justify-center font-mono text-3xl space-x-2 text-gray-900 dark:text-white dark:text-opacity-90">
            {/* <label htmlFor="code-input">Room Code</label> */}
            <input
              name="code1"
              type="text"
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              autoFocus
              value={inputs.code1}
              onPaste={(event) => handlePaste(event, 'code', 4)}
              onChange={handleChangeText}
              required
            />
            <input
              name="code2"
              type="text"
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code2}
              onChange={handleChangeText}
              required
            />
            <input
              name="code3"
              type="text"
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code3}
              onChange={handleChangeText}
              required
            />
            <input
              name="code4"
              type="text"
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code4}
              onChange={handleChangeText}
              required
            />
          </fieldset>
        </ModalContent>
        <ModalFooter>
          <Button type="submit">Join</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
