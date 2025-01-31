import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Context } from '@context';
import Button from '@components/button/Button';
import * as S from './Room.styles';

function Room() {
  const { roomId } = useParams();
  const { rooms } = useContext(Context);
  const room = rooms.find((r) => r.id === Number(roomId));

  const navigate = useNavigate();
  const onReserveClick = () => {
    navigate(`/reserve/${room!.id}`);
  };

  const [activePhoto, setActivePhoto] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActivePhoto(
        room && activePhoto < room.images.length - 1 ? activePhoto + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      {room ? (
        <S.Room>
          <S.Carousel $photoNumber={activePhoto}>
            <div>
              {room.images.map((i) => (
                <img
                  key={`${i}image`}
                  src={`/images/${i}.jpg`}
                  alt="room image"
                />
              ))}
            </div>
            <S.Points>
              {room.images.map((i, index) => (
                <S.Point
                  key={`${i}button`}
                  aria-label={`display photo ${index + 1}`}
                  onClick={() => setActivePhoto(index)}
                  $isActive={index === activePhoto}
                ></S.Point>
              ))}
            </S.Points>
          </S.Carousel>
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
