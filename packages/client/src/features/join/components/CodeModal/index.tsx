import {
  MutableRefObject,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { roomChar } from '@np-bingo/common';
import Modal, {
  ModalHeader,
  ModalContent,
  ModalFooter,
} from '../../../../components/Feedback/Modal';
import Button from '../../../../components/Inputs/Button';
import { useForm } from '../../../../hooks';
import { ApiError } from '@np-bingo/types';

export interface CodeModalProps {
  open: boolean;
  noPortal?: boolean;
  errors?: ApiError;
  onClose: () => void;
  onSumbit?: (room: string) => void;
}

interface codeModalState {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
}

const initialState: codeModalState = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
};

export default function CodeModal({
  open = false,
  noPortal,
  errors: serverErrors,
  onClose,
  onSumbit,
}: CodeModalProps) {
  const submitRef = useRef<HTMLButtonElement>(null);
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);

  /**
   * Action on form submit
   * @param inputs
   */
  const onSubmitCallback = (inputs: codeModalState) => {
    let room = Object.values(inputs).join('').toUpperCase();
    onSumbit && onSumbit(room);
  };

  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
    handlePaste,
    clearForm,
  } = useForm<codeModalState>(initialState, onSubmitCallback);

  /**
   * Force all inputs to be capital letters
   * @param value
   * @returns
   */
  const forceCaps = (value: string) => value.toUpperCase();

  /**
   * Focuses next html element
   * @param next
   * @returns void
   */
  const focusNext = (next: HTMLElement | null) => {
    if (!next) return;
    next.focus();
  };

  /**
   * Change event handler
   * @param event
   */
  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name, nextSibling } = event.target;

    const formattedValue = forceCaps(value);

    handleChange({
      ...event,
      target: { ...event.target, name, value: formattedValue },
    });

    if (formattedValue.length === maxLength)
      focusNext(nextSibling as HTMLElement);
  };

  /**
   * Key Down event handler
   * @param event
   * @param self
   * @param next
   * @returns void
   */
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    self: MutableRefObject<HTMLInputElement | null>['current'],
    next: MutableRefObject<HTMLInputElement | null>['current']
  ) => {
    const { key, repeat } = event;
    if (repeat) return;
    if (key === 'Backspace' || key === 'Delete') {
      if (self && self.value.length === 0) {
        if (!next) return;
        next.focus();
      }
    }
  };

  /**
   * Turn off sumbit button when code is empty
   * @returns boolean
   */
  const disableSubmit =
    inputs.code1 !== '' &&
    inputs.code2 !== '' &&
    inputs.code3 !== '' &&
    inputs.code4 !== ''
      ? false
      : true;

  /**
   * On Close event handler
   */
  const handleOnClose = () => {
    clearForm();
    onClose();
  };

  /**
   * Defualts to input1 focus on page load
   */
  useEffect(() => {
    if (!open) return;
    input1Ref.current?.focus();
  }, [open]);

  /**
   * Focus sumbit when form full
   */
  useEffect(() => {
    if (
      inputs.code1 !== '' &&
      inputs.code2 !== '' &&
      inputs.code3 !== '' &&
      inputs.code4 !== ''
    ) {
      submitRef.current?.focus();
    }
  }, [inputs]);

  return (
    <Modal
      id="code-modal"
      open={open}
      onClose={handleOnClose}
      aria-labelledby="join-dialog-title"
      noPortal={noPortal}
    >
      <ModalHeader id="join-dialog-title" onClose={handleOnClose}>
        Input Room Code
      </ModalHeader>
      <form onSubmit={handleSubmit} autoComplete="off">
        <ModalContent>
          <p className="text-black dark:text-white text-opacity-60 dark:text-opacity-60">
            {errors && errors}
            {serverErrors ? serverErrors.error : '\xa0'}
          </p>
          <fieldset className="flex justify-center font-mono text-3xl space-x-2 text-gray-900 dark:text-white dark:text-opacity-90">
            <input
              name="code1"
              aria-label="code1"
              type="text"
              ref={input1Ref}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              autoFocus
              value={inputs.code1}
              onPaste={(event) => handlePaste(event, 'code', 4)}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input1Ref.current, input1Ref.current)
              }
              required
            />
            <input
              name="code2"
              aria-label="code2"
              type="text"
              ref={input2Ref}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code2}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input2Ref.current, input1Ref.current)
              }
              required
            />
            <input
              name="code3"
              aria-label="code3"
              type="text"
              ref={input3Ref}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code3}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input3Ref.current, input2Ref.current)
              }
              required
            />
            <input
              name="code4"
              aria-label="code4"
              type="text"
              ref={input4Ref}
              pattern={roomChar}
              maxLength={1}
              className="text-center font-bold bg-gradient-to-b from-gray-200 dark:from-gray-500 to-gray-300 dark:to-gray-700 rounded-md w-9 h-12 shadow-inner"
              autoCapitalize="characters"
              value={inputs.code4}
              onChange={handleChangeText}
              onKeyDown={(event) =>
                handleKeyDown(event, input4Ref.current, input3Ref.current)
              }
              required
            />
          </fieldset>
        </ModalContent>
        <ModalFooter>
          <Button ref={submitRef} type="submit" disabled={disableSubmit}>
            Join
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
