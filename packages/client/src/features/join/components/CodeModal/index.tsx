import React, { MutableRefObject, useRef } from 'react';
import Modal, {
  ModalHeader,
  ModalContent,
  ModalFooter,
} from '../../../../components/Feedback/Modal';
import Button from '../../../../components/Inputs/Button';
import { useForm } from '../../../../hooks';
import { roomChar } from '@np-bingo/common';
import { useEffect } from 'react';

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
}: CodeModalProps) {
  const [inputs, errors, handleChange, handleSubmit, handlePaste] = useForm(
    initialState,
    onSubmitCallback
  );
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const input4 = useRef<HTMLInputElement>(null);

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

    // Value blank
    // if (event.target.value.length < event.target.maxLength) {
    //   if (!event.target.previousSibling) return;
    //   let target = event.target.previousSibling as HTMLInputElement;
    //   target.focus();
    // }

    if (event.target.value.length === event.target.maxLength) {
      if (!event.target.nextSibling) return;
      let target = event.target.nextSibling as HTMLInputElement;
      target.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    self: MutableRefObject<HTMLInputElement | null>['current'],
    next: MutableRefObject<HTMLInputElement | null>['current']
  ) => {
    if (event.repeat) return;
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (self && self.value.length === 0) {
        if (!next) return;
        next.focus();
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    if (input1.current === null) return;
    input1.current.focus();
  }, [open]);

  if (!open) return null;
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
              ref={input1}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              autoFocus
              value={inputs.code1}
              onPaste={(event) => handlePaste(event, 'code', 4)}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input1.current, input1.current)
              }
              required
            />
            <input
              name="code2"
              type="text"
              ref={input2}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code2}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input2.current, input1.current)
              }
              required
            />
            <input
              name="code3"
              type="text"
              ref={input3}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code3}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input3.current, input2.current)
              }
              required
            />
            <input
              name="code4"
              type="text"
              ref={input4}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code4}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input4.current, input3.current)
              }
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
