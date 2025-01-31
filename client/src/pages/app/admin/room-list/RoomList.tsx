import Button from '@components/button/Button';
import * as S from './RoomList.styles';
import type { Room } from '#types/db';

function RoomList({
  rooms,
  buttonTitle,
  onRoomClick,
}: {
  rooms: Room[];
  buttonTitle: string;
  onRoomClick: (arg: number) => void;
}) {
  return (
    <S.RoomList>
      {rooms.map((r) => (
        <S.Room key={`room${r.id}`}>
          <img src={`/images/${r.images[0]}.jpg`} alt="" />
          <div>{r.name}</div>
          <Button onClick={() => onRoomClick(r.id)}>{buttonTitle}</Button>
        </S.Room>
      ))}
    </S.RoomList>
  );
}

export default RoomList;
