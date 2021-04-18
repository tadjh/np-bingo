import React, { useRef, useState } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useDialog } from '../../Utils/custom-hooks';
import { Room } from '@np-bingo/types';

export interface ShareProps {
  room: Room;
}

function Share({ room = '' }: ShareProps) {
  const [open, handleOpen, handleClose] = useDialog(false, handleCopyText);
  const [copyText, setCopyText] = useState('Click to copy link to clipboard');
  const ref = useRef<HTMLInputElement>(null);

  const copyToClipboard = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (ref.current) {
      ref.current.select();

      try {
        document.execCommand('copy');
        setCopyText('Link copied to clipboard!');
      } catch (err) {
        throw new Error('Error in copy code to clipboard');
      }
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
      <IconButton onClick={handleOpen} aria-label="share">
        <ShareIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="share-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="share-dialog-title" onClose={handleClose}>
          Share Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{copyText}</DialogContentText>
          <TextField
            inputRef={ref}
            value={`${window.location.protocol}//${window.location.host}/join?r=${room}`}
            id="code"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={copyToClipboard} color="primary" autoFocus>
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Share;
