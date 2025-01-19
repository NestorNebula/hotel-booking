import { query } from './query';
import testingQueries from './testingQueries';
import {
  createUser,
  getUserById,
  getFullUserByEmail,
  getUserByEmail,
  updateUserStatus,
  updateUser,
  updateUserPassword,
} from './userQueries';
import { getRoom, getAllRooms } from './roomQueries';
import {
  createReservation,
  getReservation,
  getAllRoomReservations,
  deleteReservation,
} from './reservationQueries';
import { createStay, getStay, updateStay, deleteStay } from './stayQueries';

export {
  query,
  testingQueries,
  createUser,
  getUserById,
  getFullUserByEmail,
  getUserByEmail,
  updateUserStatus,
  updateUser,
  updateUserPassword,
  getRoom,
  getAllRooms,
  createReservation,
  getReservation,
  getAllRoomReservations,
  deleteReservation,
  createStay,
  getStay,
  updateStay,
  deleteStay,
};
