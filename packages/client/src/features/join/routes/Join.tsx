import React, { useContext } from 'react';
import { useToggle } from '../../../hooks';
import RoomList from '../components/RoomList';
import CodeModal from '../components/CodeModal';
import { FeautresContext } from '../../../context';
import Button from '../../../components/Inputs/Button';
import Link from '../../../components/Navigation/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useJoin } from '../hooks';
import { Host } from '@np-bingo/types';

export interface JoinProps {
  dispatchJoinRoom: (room: string, host: Host) => void;
  publicRooms?: any[];
}

export default function Join({
  dispatchJoinRoom,
  publicRooms = [],
}: JoinProps) {
  const { allowPublic, allowSolo } = useContext(FeautresContext);
  const [isOpen, , open, close] = useToggle();
  const [joinRoom] = useJoin(dispatchJoinRoom);
  return (
    <React.Fragment>
      <header className="flex-1 items-center">
        <h1 className="text-center text-3xl text-black dark:text-white text-opacity-60 dark:text-opacity-60">
          Join
        </h1>
      </header>
      <main className="justify-around">
        {allowPublic && <RoomList rooms={publicRooms} onClick={joinRoom} />}
        <div className="flex flex-col items-center gap-y-3">
          <Button variant="primary" className="join-button" onClick={open}>
            Private Room
          </Button>
          <CodeModal open={isOpen} onClose={close} onSumbit={joinRoom} />
          {allowSolo && (
            <Button
              component={RouterLink}
              className="solo-button"
              to="/play/solo"
            >
              Solo
            </Button>
          )}
        </div>
      </main>
      <footer className="flex-1 justify-center">
        <Link className="nav-button hover:underline" to="/">
          &larr; Back
        </Link>
      </footer>
    </React.Fragment>
  );
}
