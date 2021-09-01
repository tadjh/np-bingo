import React, { Fragment, useContext } from 'react';
import { useClickSoft, useToggle } from '../../../hooks';
import RoomList from '../components/RoomList';
import CodeModal from '../components/CodeModal';
import { FeaturesContext, UserContext } from '../../../context';
import Button from '../../../components/Inputs/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useJoin } from '../hooks';
import PlayerName from '../../../components/Display/PlayerName';
import IconMenu from '../../../components/Inputs/IconMenu';
import IconButton from '../../../components/Inputs/IconButton';
import ChevronLeftIcon from '../../../assets/icons/ChevronLeft';
import Back from '../../../components/Navigation/Back';

interface JoinStoriesContext {
  allowPublic?: boolean;
}

export interface JoinProps extends JoinStoriesContext {
  publicRooms?: any[];
}

export default function Join({ publicRooms = [] }: JoinProps) {
  const {
    user: { name },
    socket,
    isSocketLoading,
  } = useContext(UserContext);
  const { allowPublic, allowSolo } = useContext(FeaturesContext);
  const { joinRoom, handleSolo } = useJoin();
  const [isOpen, , open, close] = useToggle();
  return (
    <Fragment>
      <header className="flex-1 justify-between">
        <Back to="/" />
        <h1 className="text-center text-3xl text-black dark:text-white text-opacity-60 dark:text-opacity-60 self-center">
          Join
        </h1>
        <div className="w-[40px]"></div>
      </header>
      <main className="justify-evenly">
        {allowPublic && <RoomList rooms={publicRooms} onClick={joinRoom} />}
        <div className="flex flex-col items-center gap-3">
          <Button variant="primary" className="join-button" onClick={open}>
            Private Room
          </Button>
          <CodeModal open={isOpen} onClose={close} onSumbit={joinRoom} />
          {allowSolo && (
            <Button
              component={RouterLink}
              className="solo-button"
              to="/play/solo"
              onClick={handleSolo}
            >
              Solo
            </Button>
          )}
        </div>
      </main>
      <footer className="flex-1 justify-end gap-1">
        {/* <Link className="nav-button hover:underline" to="/">
          &larr; Back
        </Link> */}
        <div>{'\xa0'}</div>
        <IconMenu direction="up" />
        <PlayerName
          status={socket.connected}
          name={name}
          isLoading={isSocketLoading}
        />
      </footer>
    </Fragment>
  );
}
