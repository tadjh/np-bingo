import { Kicked } from '@np-bingo/types';
import { useHistory } from 'react-router-dom';
import Link from '../../../../components/Navigation/Link';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '../../../../components/Feedback/Modal';

export interface KickedModalProps {
  open: Kicked['status'];
  reason: Kicked['reason'];
}
export default function KickedModal({
  open,
  reason,
  ...props
}: KickedModalProps): JSX.Element {
  let history = useHistory();

  /**
   * Displays leaving room message based on reason
   * @returns String
   */
  const kickedMessage = () => {
    switch (reason) {
      case 'none':
        return;
      case 'banned':
        return 'You have been kicked from the room.';
      case 'abandoned':
        return 'The host has left the room.';
      default:
        throw new Error('Error in kick Message');
    }
  };

  /**
   * Force route to home on kicked modal click events
   */
  const exit = () => {
    history.push('/');
  };

  return (
    <Modal
      id="leave-modal"
      open={open}
      onClose={exit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <ModalHeader id="alert-dialog-title">Leaving Room</ModalHeader>
      <ModalContent>
        <p id="alert-dialog-description">{kickedMessage()}</p>
      </ModalContent>
      <ModalFooter>
        <Link className="hover:underline" onClick={exit} to="/">
          Leave Room
        </Link>
      </ModalFooter>
    </Modal>
  );
}
