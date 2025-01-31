import { useContext, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Context } from '@context';
import AdminForm from './admin-form/AdminForm';
import RoomList from './room-list/RoomList';
import ReservationList from '@components/reservation-list/ReservationList';
import type { ReservationWithIsUser } from '@loaders/adminLoader';
import { close } from '@assets/icons';
import * as S from './Admin.styles';

function Admin() {
  const { user, rooms } = useContext(Context);
  const { reservations }: { reservations: ReservationWithIsUser[] } =
    useLoaderData();

  const [activeRoom, setActiveRoom] = useState<number | null>(null);
  const activeReservations = activeRoom
    ? reservations.filter((r) => r.roomId === activeRoom)
    : reservations;

  return (
    <S.Admin>
      {!user.isAdmin ? (
        <AdminForm />
      ) : (
        <>
          {activeRoom ? (
            <button
              aria-label="return to all rooms reservations"
              onClick={() => setActiveRoom(null)}
            >
              <img src={close} />
            </button>
          ) : (
            <RoomList
              rooms={rooms}
              buttonTitle="Room Reservations"
              onRoomClick={(roomId: number) => setActiveRoom(roomId)}
            />
          )}
          <ReservationList
            key={
              activeRoom ? `room${activeRoom}reservations` : 'allreservations'
            }
            reservations={activeReservations}
          />
        </>
      )}
    </S.Admin>
  );
}

export default Admin;
