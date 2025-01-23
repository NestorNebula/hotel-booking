import { User, Room } from '#types/db';

export interface Context {
  user: LoggedUser | GuestUser;
  rooms: Room[];
}

interface LoggedUser extends User {
  isGuest: false;
}

interface GuestUser extends Pick<User, 'lastName'> {
  id: 0;
  firstName: null;
  lastName: 'Guest';
  email: null;
  isAdmin: false;
  isGuest: true;
}

const defaultContext: Context = {
  user: {
    id: 0,
    firstName: null,
    lastName: 'Guest',
    email: null,
    isAdmin: false,
    isGuest: true,
  },
  rooms: [],
};

export default defaultContext;
