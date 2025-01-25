import { Room, User } from '#types/db';
import { close as closeIcon } from '@assets/icons';
import * as S from './Sidebar.styles';

function Sidebar({
  close,
  rooms,
  user,
}: {
  close: () => void;
  rooms: Room[];
  user: User;
}) {
  return (
    <S.Sidebar>
      <ul>
        <li>
          <S.CloseButton aria-label="close sidebar" onClick={close}>
            <img src={closeIcon} alt="" />
          </S.CloseButton>
        </li>
        <li>
          <S.Link href="/">Home</S.Link>
        </li>
        <li>Rooms</li>
        <S.RoomList>
          {rooms.map((room) => (
            <S.Link key={`linkto${room.id}`} href={`/rooms/${room.id}`}>
              {room.name}
            </S.Link>
          ))}
        </S.RoomList>
        <li>
          <S.Link href="/account">Your Account</S.Link>
        </li>
        <li>
          <S.Link href="/admin">
            {user.isAdmin ? 'Admin Dashboard' : 'Become an Admin'}
          </S.Link>
        </li>
      </ul>
    </S.Sidebar>
  );
}

export default Sidebar;
