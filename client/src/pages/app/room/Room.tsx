import { useContext } from 'react';
import { Navigate, redirect, useParams } from 'react-router';
import { Context } from '@context';
import Button from '@components/button/Button';
import * as S from './Room.styles';

function Room() {
  const { roomId } = useParams();
  const { rooms } = useContext(Context);
  const room = rooms.find((r) => r.id === Number(roomId));

  const onReserveClick = () => {
    redirect(`/reserve/${room!.id}`);
  };

  return (
    <>
      {room ? (
        <S.Room>
          <img src={`/images/${room.images[0]}.jpg`} alt="room image" />
          <S.Details>
            <div>{room.name}</div>
            <div>${room.pricePerDay} per night</div>
            <Button onClick={onReserveClick}>Reserve</Button>
          </S.Details>
          <S.Description>{room.description}</S.Description>
        </S.Room>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  );
}

export default Room;
