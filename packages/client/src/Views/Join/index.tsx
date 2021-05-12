import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Gamestate, Room } from '@np-bingo/types';
import { useDialog } from '../../Utils/custom-hooks';
import RoomList from '../../Components/RoomList';
import CodeModal from '../../Components/CodeModal';
import Footer from '../../Components/Footer';
import { FeautresContext } from '../../Utils/contexts';
import Main from '../../Components/Main';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import Link from '../../Components/Link';

export interface JoinProps {
  queryRoom: string | null;
  joinRoom?: (room: string) => void;
  rooms?: any[];
  solo?: (gamestate: Gamestate) => void;
}

export default function Join({
  queryRoom = null,
  joinRoom,
  rooms,
  solo,
}: JoinProps) {
  let history = useHistory();
  const [open, handleOpen, handleClose] = useDialog(false);

  const join = useCallback(
    (room: Room) => {
      joinRoom && joinRoom(room);
      history.push(`/play?r=${room}`);
    },
    [history, joinRoom]
  );

  useEffect(() => {
    if (queryRoom === null) return;

    // TODO Check if room is active
    join(queryRoom);
  }, [queryRoom, join]);

  // const handleSolo = () => {
  //   solo && solo('init');
  //   history.push(`/play?m=solo`);
  // };

  // TODO replace with Public Room Implementation
  // const dummyArray = [
  //   {
  //     _id: 'dadkjashdjshadka',
  //     room: 'NYPD',
  //     host: { id: 1100, name: 'Siz Fulker' },
  //     players: [1111, 1122, 1133, 1144, 1155, 1121, 1112, 1114],
  //   },
  //   {
  //     _id: 'dadkjashdjshadka',
  //     room: 'TEST',
  //     host: { id: 1100, name: 'Dean Watson' },
  //     players: [1111, 1122, 1133, 1144, 1155],
  //   },
  //   {
  //     _id: 'dadkjashdjshadka',
  //     room: 'ABCD',
  //     host: { id: 1100, name: 'Manny McDaniels' },
  //     players: [1111],
  //   },
  // ];

  return (
    <React.Fragment>
      <Header className="flex-1 items-center">
        <h1 className="text-center text-3xl uppercase">Join</h1>
      </Header>
      <Main className="flex-1 justify-around gap-y-3">
        <FeautresContext.Consumer>
          {(features) => (
            <React.Fragment>
              {features['public-rooms'] && (
                <RoomList rooms={rooms} onClick={joinRoom} />
              )}
              <div className="flex flex-col items-center gap-y-3">
                <Button
                  variant="contained"
                  className="join-button"
                  onClick={handleOpen}
                >
                  Private Room
                </Button>
                <CodeModal open={open} onClose={handleClose} onSumbit={join} />
                {features['solo-mode'] && (
                  <Button
                    component={Link}
                    className="solo-button"
                    onClick={() => solo && solo('init')}
                    to="/play?m=solo"
                  >
                    Solo
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </FeautresContext.Consumer>
      </Main>
      <Footer className="flex-1 justify-center">
        <Link className="nav-button hover:underline" to="/">
          &larr; Back
        </Link>
      </Footer>
    </React.Fragment>
  );
}
