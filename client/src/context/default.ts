import { User, Room } from '#types/db';

export interface Context {
  user: LoggedUser | GuestUser;
  rooms: Room[];
}

export interface LoggedUser extends User {
  isGuest: false;
}

export interface GuestUser extends Pick<User, 'lastName'> {
  id: 0;
  firstName: null;
  lastName: 'Guest';
  email: null;
  isAdmin: false;
  isGuest: true;
}

const guestUser: GuestUser = {
  id: 0,
  firstName: null,
  lastName: 'Guest',
  email: null,
  isAdmin: false,
  isGuest: true,
};

const defaultContext: Context = {
  user: guestUser,
  rooms: [],
};

export { guestUser, defaultContext };
