import React, { useContext, useRef, useState } from 'react';
import ShareIcon from '../../assets/icons/Share';
import IconButton from '../Elements/IconButton';
import Modal from '../Elements/Modal';
import ModalHeader from '../Elements/ModalHeader';
import ModalContent from '../Elements/ModalContent';
import ModalFooter from '../Elements/ModalFooter';
import Button from '../Elements/Button';
import useDialog from '../../hooks/useDialog';
import { Room } from '@np-bingo/types';
import TextInput from '../Form/TextInput';
import useSound from 'use-sound';
import buttonSfx from '../../Assets/Sounds/Click_1.mp3';
import { FeautresContext, SoundContext } from '../../context';

export interface ShareProps {
  room?: Room;
}

export default function Share({ room = '' }: ShareProps): JSX.Element {
  const [isOpen, open, close] = useDialog();
  const [isCopied, setIsCopied] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);
  const { defaultVolume } = useContext(FeautresContext);
  const { sounds } = useContext(SoundContext);

  const [playSfx] = useSound(buttonSfx, {
    volume: defaultVolume,
    sprite: {
      buttonPress: [1000, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  const buttonPressSfx = () => {
    playSfx({ id: 'buttonPress' });
  };

  /**
   * Focus link and copy value to keyboard
   * @returns
   */
  const copyToClipboard = () => {
    if (linkRef.current === null) return;
    linkRef.current.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
    } catch (err) {
      throw new Error('Error in copy code to clipboard');
    }
  };

  /**
   * Closes modal and resets copy
   */
  const handleClose = () => {
    close();
    setIsCopied(false);
  };

  // TODO Hide full URL when config set to Streamer Mode

  return (
    <React.Fragment>
      <IconButton
        className="share-button group"
        onClick={open}
        aria-label="share"
        description="Share link"
        direction="top"
        onMouseDown={buttonPressSfx}
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
            {isCopied
              ? 'Link copied to clipboard!'
              : 'Click to copy link to clipboard'}
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
