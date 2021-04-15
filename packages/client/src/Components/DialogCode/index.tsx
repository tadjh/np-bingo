import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../../Components/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useForm } from '../../Utils/custom-hooks';
import { Room } from '@np-bingo/types';
import { roomPattern } from '@np-bingo/common';
import DialogContentText from '@material-ui/core/DialogContentText';
import './style.css';

type Props = {
  open: boolean;
  handleClose: () => void;
  join: (room: Room) => void;
};

const initialState = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
};

function DialogCode(props: Props) {
  let { open, handleClose, join } = props;
  const [inputs, errors, handleChange, handleSubmit, handlePaste] = useForm(
    initialState,
    joinCallback
  );

  useEffect(() => {
    if (
      inputs.code1 !== '' &&
      inputs.code2 !== '' &&
      inputs.code3 !== '' &&
      inputs.code4 !== ''
    ) {
      handleSubmit();
    }
  }, [inputs, handleSubmit]);

  function joinCallback(formInputs: typeof inputs) {
    let room = Object.values(formInputs).join('').toUpperCase();
    join(room);
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO event.persist()?
    handleChange(event);

    if (event.target.value.length < event.target.maxLength) {
      if (event.target.previousSibling) {
        let target = event.target.previousSibling as HTMLInputElement;
        target.focus();
      }
    }

    if (event.target.value.length === event.target.maxLength) {
      if (event.target.nextSibling) {
        let target = event.target.nextSibling as HTMLInputElement;
        target.focus();
      }
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="join-dialog-title"
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle id="join-dialog-title" onClose={handleClose}>
        Enter Room Code
      </DialogTitle>
      <form onSubmit={handleSubmit} autoComplete="off">
        <DialogContent>
          <DialogContentText>{errors && errors}</DialogContentText>
          <fieldset className="code-input">
            {/* <label htmlFor="code-input">Room Code</label> */}
            <input
              name="code1"
              type="text"
              pattern={roomPattern}
              maxLength={1}
              className="partitioned"
              autoCapitalize="on"
              autoFocus
              value={inputs.code1}
              onPaste={(event) => handlePaste(event, 'code', 4)}
              onChange={handleChangeText}
              required
            />
            <input
              name="code2"
              type="text"
              pattern={roomPattern}
              maxLength={1}
              className="partitioned"
              autoCapitalize="on"
              value={inputs.code2}
              onChange={handleChangeText}
              required
            />
            <input
              name="code3"
              type="text"
              pattern={roomPattern}
              maxLength={1}
              className="partitioned"
              autoCapitalize="on"
              value={inputs.code3}
              onChange={handleChangeText}
              required
            />
            <input
              name="code4"
              type="text"
              pattern={roomPattern}
              maxLength={1}
              className="partitioned"
              autoCapitalize="on"
              value={inputs.code4}
              onChange={handleChangeText}
              required
            />
          </fieldset>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Join
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DialogCode;
