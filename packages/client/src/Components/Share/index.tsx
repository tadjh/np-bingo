import React, { useRef, useState } from 'react';
import ShareIcon from '../../Assets/Share';
import IconButton from '../IconButton';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import ModalContent from '../ModalContent';
import ModalFooter from '../ModalFooter';
import Button from '../Button';
import { useDialog } from '../../Utils/custom-hooks';
import { Room } from '@np-bingo/types';
import TextInput from '../TextInput';

export interface ShareProps {
  room?: Room;
}

export default function Share({ room = '' }: ShareProps): JSX.Element {
  const [open, handleOpen, handleClose] = useDialog(false, handleCopyText);
  const [copyText, setCopyText] = useState('Click to copy link to clipboard');
  const ref = useRef<HTMLInputElement>(null);

  const copyToClipboard = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (ref.current === null) return;
    ref.current.select();
    try {
      document.execCommand('copy');
      const text = 'Link copied to clipboard!';
      if (copyText === text) return;
      setCopyText(text);
    } catch (err) {
      throw new Error('Error in copy code to clipboard');
    }
  };

  /**
   * Callback function on Dialog close
   */
  function handleCopyText() {
    setCopyText('Click to copy link to clipboard');
  }

  // TODO Hide full URL when config set to Streamer Mode

  return (
    <React.Fragment>
      <IconButton
        className="share-button group"
        onClick={handleOpen}
        aria-label="share"
        description="Share link"
        direction="top"
      >
        <ShareIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      </IconButton>
      <Modal
        id="share-modal"
        open={open}
        aria-labelledby="share-dialog-title"
        onClose={handleClose}
      >
        <ModalHeader id="share-dialog-title" onClose={handleClose}>
          Share Game
        </ModalHeader>
        <ModalContent>
          <p className="text-black dark:text-white text-opacity-60 dark:text-opacity-60">
            {copyText}
          </p>
          <TextInput
            id="room-link"
            ref={ref}
            value={`${window.location.protocol}//${window.location.host}/join?r=${room}`}
            readOnly
          />
        </ModalContent>
        <ModalFooter>
          <Button className="copy-button" onClick={copyToClipboard} autoFocus>
            Copy
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
