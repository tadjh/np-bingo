import React, { useRef } from 'react';
import ShareIcon from '../../../../assets/icons/Share';
import IconButton from '../../../Inputs/IconButton/components/IconButton';
import Modal, {
  ModalHeader,
  ModalContent,
  ModalFooter,
} from '../../../Feedback/Modal';
import Button from '../../../Inputs/Button';
import { useDialog } from '../../../../hooks';
import { Room } from '@np-bingo/types';
import TextInput from '../../../Form/TextInput';
import { useShare } from './hooks';

export interface ShareProps {
  room?: Room;
}

export default function Share({ room = '' }: ShareProps): JSX.Element {
  const linkRef = useRef<HTMLInputElement>(null);
  const [isOpen, open, close] = useDialog();
  const [copyText, clickSfx, handleClose, copyToClipboard] = useShare(
    linkRef.current,
    close
  );

  // TODO Hide full URL when config set to Streamer Mode

  return (
    <React.Fragment>
      <IconButton
        className="share-button group"
        onClick={open}
        aria-label="share"
        description="Share link"
        direction="top"
        onMouseDown={clickSfx}
      >
        <ShareIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 group-hover:text-opacity-60" />
      </IconButton>
      <Modal
        id="share-modal"
        open={isOpen}
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
            ref={linkRef}
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
