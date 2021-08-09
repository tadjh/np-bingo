import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDialog } from '../../Utils/custom-hooks';
import RoomList from '../../Components/RoomList';
import CodeModal from '../../Components/CodeModal';
import Footer from '../../Components/Footer';
import { FeautresContext, GameContext } from '../../Utils/contexts';
import Main from '../../Components/Main';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import Link from '../../Components/Link';
import socket from '../../Config/socket.io';
import { Link as RouterLink } from 'react-router-dom';

export interface JoinProps {
  queryRoom: string | null;
  joinRoom?: (room: string) => void;
  rooms?: any[];
  solo?: () => void;
}

export default function Join({
  queryRoom = null,
  joinRoom,
  rooms = [],
  solo,
}: JoinProps) {
  const { publicRooms, allowSolo } = useContext(FeautresContext);
  const { room, user, host } = useContext(GameContext);
  let history = useHistory();
  const [open, handleOpen, handleClose] = useDialog(false);

  /**
   * Handles share link
   */
  useEffect(() => {
    if (queryRoom === null) return;
    // TODO Check if room is active
    joinRoom && joinRoom(room);
  }, [queryRoom, joinRoom, room]);

  /**
   * Routes when room is updated
   */
  useEffect(() => {
    if (room === '') return;
    socket.emit('join-room', room, host.socket, user);
    history.push(`/play?r=${room}`);
  }, [room, host.socket, user, history]);

  return (
    <React.Fragment>
      <Header className="flex-1 items-center">
        <h1 className="text-center text-3xl text-black dark:text-white text-opacity-60 dark:text-opacity-60">
          Join
        </h1>
      </Header>
      <Main className="flex-1 justify-around gap-y-3">
        {publicRooms && <RoomList rooms={rooms} onClick={joinRoom} />}
        <div className="flex flex-col items-center gap-y-3">
          <Button
            variant="contained"
            className="join-button"
            onClick={handleOpen}
          >
            Private Room
          </Button>
          <CodeModal open={open} onClose={handleClose} onSumbit={joinRoom} />
          {allowSolo && (
            <Button
              component={RouterLink}
              className="solo-button"
              onClick={solo}
              to="/play?m=solo"
            >
              Solo
            </Button>
          )}
        </div>
      </Main>
      <Footer className="flex-1 justify-center">
        <Link className="nav-button hover:underline" to="/">
          &larr; Back
        </Link>
      </Footer>
    </React.Fragment>
  );
}
