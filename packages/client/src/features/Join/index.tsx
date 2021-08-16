import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useDialog from '../../hooks/useDialog';
import RoomList from './components/RoomList/RoomsList';
import CodeModal from '../../components/CodeModal';
import Footer from '../../components/Layout/Footer';
import { FeautresContext, GameContext } from '../../context';
import Main from '../../components/Layout/Main';
import Header from '../../components/Layout/Header';
import Button from '../../components/Elements/Button';
import Link from '../../components/Elements/Link';
import socket from '../../lib/socket.io';
import { Link as RouterLink } from 'react-router-dom';

export interface JoinProps {
  joinRoom?: (room: string) => void;
  solo?: () => void;
  queryRoom: string | null;
  rooms?: any[];
}

export default function Join({
  joinRoom,
  solo,
  queryRoom = null,
  rooms = [],
}: JoinProps) {
  let history = useHistory();
  const { allowPublic, allowSolo } = useContext(FeautresContext);
  const { room, user, host } = useContext(GameContext);
  const [isOpen, open, close] = useDialog();

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
        {allowPublic && <RoomList rooms={rooms} onClick={joinRoom} />}
        <div className="flex flex-col items-center gap-y-3">
          <Button variant="contained" className="join-button" onClick={open}>
            Private Room
          </Button>
          <CodeModal open={isOpen} onClose={close} onSumbit={joinRoom} />
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
