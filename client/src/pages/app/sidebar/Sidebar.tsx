import { useEffect } from 'react';
import type { Room } from '#types/db';
import type { GuestUser, LoggedUser } from '@context/default';
import { close as closeIcon } from '@assets/icons';
import { github } from '@assets/icons';
import * as S from './Sidebar.styles';

function Sidebar({
  close,
  rooms,
  user,
}: {
  close: () => void;
  rooms: Room[];
  user: LoggedUser | GuestUser;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          <S.Link href={`/account/${user.id}`}>Your Account</S.Link>
        </li>
        {user.isGuest === false && (
          <li>
            <S.Link href="/admin">
              {user.isAdmin ? 'Admin Dashboard' : 'Become an Admin'}
            </S.Link>
          </li>
        )}
      </ul>
      <footer>
        <div>
          ©{' '}
          <a
            href="https://noahoussier.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Noa Houssier
          </a>
          <a
            href="https://github.com/NestorNebula"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="GitHub" />
          </a>{' '}
          2025
        </div>
        <a href="https://www.flaticon.com/free-icons/room" title="room icons">
          Room icons created by Freepik - Flaticon
        </a>
      </footer>
    </S.Sidebar>
  );
}

export default Sidebar;
