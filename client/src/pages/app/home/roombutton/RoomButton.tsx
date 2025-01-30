import { useState } from 'react';
import type { Room } from '#types/db';
import * as S from './RoomButton.styles';

function RoomButton({ room, onClick }: { room: Room; onClick: () => void }) {
  const [src, setSrc] = useState(`images/${room.images[0]}.jpg`);

  return (
    <S.RoomButton
      aria-label={`access to room "${room.name}" details`}
      onClick={onClick}
    >
      <img
        onMouseOver={() => setSrc(`images/${room.images[1]}.jpg`)}
        onMouseOut={() => setSrc(`images/${room.images[0]}.jpg`)}
        src={src}
        alt="room image"
      />
      <div>{room.name}</div>
      <div>${room.pricePerDay} per night</div>
    </S.RoomButton>
  );
}

export default RoomButton;
