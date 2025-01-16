import { query } from './query';
import testingQueries from './testingQueries';
import {
  createUser,
  getUserById,
  getFullUserByEmail,
  getUserByEmail,
  updateUserStatus,
} from './userQueries';
import {
  createReservation,
  getReservation,
  getAllRoomReservations,
} from './reservationQueries';

export {
  query,
  testingQueries,
  createUser,
  getUserById,
  getFullUserByEmail,
  getUserByEmail,
  updateUserStatus,
  createReservation,
  getReservation,
  getAllRoomReservations,
};
