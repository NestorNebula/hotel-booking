import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '@context';
import RoomButton from './roombutton/RoomButton';
import * as S from './Home.styles';

function Home() {
  const { rooms } = useContext(Context);

  const navigate = useNavigate();

  const onRoomClick = (roomId: number) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <S.Home>
      <S.Header>
        <div>Welcome to our Hotel!</div>
        <div>
          We propose multiple rooms with different styles for you to find the
          perfect place for your next stay!
        </div>
      </S.Header>
      <S.RoomList>
        {rooms.map((r) => (
          <RoomButton
            key={`roomButton${r.id}`}
            room={r}
            onClick={() => onRoomClick(r.id)}
          />
        ))}
      </S.RoomList>
    </S.Home>
  );
}

export default Home;
