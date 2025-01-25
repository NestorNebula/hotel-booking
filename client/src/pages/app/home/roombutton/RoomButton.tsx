import type { Room } from '#types/db';
import * as S from './RoomButton.styles';

function RoomButton({ room, onClick }: { room: Room; onClick: () => void }) {
  return (
    <S.RoomButton
      aria-label={`access to room "${room.name}" details`}
      onClick={onClick}
    >
      <img src={`images/${room.images[0]}.jpg`} alt="room image" />
      <div>{room.name}</div>
      <div>${room.pricePerDay} per night</div>
    </S.RoomButton>
  );
}

export default RoomButton;
