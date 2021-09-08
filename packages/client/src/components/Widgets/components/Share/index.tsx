import { useRef, Fragment } from 'react';
import ShareIcon from '../../../../assets/icons/Share';
import IconButton from '../../../Inputs/IconButton/components/IconButton';
import Modal, {
  ModalHeader,
  ModalContent,
  ModalFooter,
} from '../../../Feedback/Modal';
import Button from '../../../Inputs/Button';
import { useToggle } from '../../../../hooks';
import { Room } from '@np-bingo/types';
import TextInput from '../../../Inputs/TextInput';
import { useShare } from './hooks';
import { useClickSoft } from '../../../../hooks/useClickSoft';

export interface ShareProps {
  room?: Room;
  isOpenDefault?: boolean;
}

export default function Share({
  room = '',
  isOpenDefault = false,
}: ShareProps): JSX.Element {
  const linkRef = useRef<HTMLInputElement>(null);
  const [isOpen, , open, close] = useToggle(isOpenDefault);
  const [copyText, handleClose, copyToClipboard] = useShare(linkRef, close);
  const clickSoftSfx = useClickSoft();
  // TODO Hide full URL when config set to Streamer Mode
  // TODO Share test
  return (
    <Fragment>
      <IconButton
        className="share-button group"
        onClick={open}
        aria-label="share"
        description="Share link"
        direction="top"
        onMouseDown={clickSoftSfx}
      >
        <ShareIcon />
      </IconButton>
      {isOpen && (
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
              onClick={copyToClipboard}
              readOnly
            />
          </ModalContent>
          <ModalFooter>
            <Button className="copy-button" onClick={copyToClipboard} autoFocus>
              Copy
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </Fragment>
  );
}
