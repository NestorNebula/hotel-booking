import { query } from './query';
import testingQueries from './testingQueries';
import {
  createUser,
  getUserById,
  getFullUserByEmail,
  getUserByEmail,
  updateUserStatus,
} from './userQueries';
import { getRoom, getAllRooms } from './roomQueries';
import {
  createReservation,
  getReservation,
  getAllRoomReservations,
  deleteReservation,
} from './reservationQueries';
import { getStay } from './stayQueries';

export {
  query,
  testingQueries,
  createUser,
  getUserById,
  getFullUserByEmail,
  getUserByEmail,
  updateUserStatus,
  getRoom,
  getAllRooms,
  createReservation,
  getReservation,
  getAllRoomReservations,
  deleteReservation,
  getStay,
};
