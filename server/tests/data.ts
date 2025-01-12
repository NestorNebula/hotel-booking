import { Reservation, Room, Stay, User } from '@prisma/client';
import {
  getFakeReservation,
  getFakeRoom,
  getFakeStay,
  getFakeUser,
} from './faker';

const getData: () => {
  reservations: Reservation[];
  rooms: Room[];
  stays: Stay[];
  users: User[];
} = () => {
  const rooms = [
    getFakeRoom({ multiple: false }),
    getFakeRoom({ multiple: true }),
    getFakeRoom({ multiple: false }),
  ];
  const users = [getFakeUser(), getFakeUser(), getFakeUser()];
  const stays = users.map((user, index) =>
    getFakeStay({ userId: user.id, roomId: rooms[index].id })
  );
  const reservations = users.map((user, index) =>
    getFakeReservation({ userId: user.id, roomId: rooms[index].id })
  );
  return { reservations, rooms, stays, users };
};

export { getData };
