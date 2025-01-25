import { Room, User } from '#types/db';
import * as S from './Sidebar.styles';

function Sidebar({ rooms, user }: { rooms: Room[]; user: User }) {
  return (
    <S.Sidebar>
      <ul>
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
