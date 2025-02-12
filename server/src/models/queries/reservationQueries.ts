import { prisma } from './setup';
import { Reservation, User } from '@prisma/client';

const createReservation: (
  reservation: Reservation
) => Promise<Reservation> = async (reservation) => {
  const newReservation = await prisma.reservation.create({
    data: {
      user: {
        connect: { id: reservation.userId },
      },
      room: {
        connect: { id: reservation.roomId },
      },
      date: reservation.date,
      stay: reservation.stayId
        ? {
            connect: { id: reservation.stayId },
          }
        : undefined,
    },
  });
  return newReservation;
};

const getReservation: (
  userId: number,
  roomId: number,
  date: Date
) => Promise<Reservation | null> = async (userId, roomId, date) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      userId_roomId_date: {
        userId,
        roomId,
        date,
      },
    },
  });
  return reservation;
};

async function getAllRoomReservations(roomId: number): Promise<Reservation[]>;
async function getAllRoomReservations(
  roomId: number,
  date: Date
): Promise<Reservation[]>;
async function getAllRoomReservations(
  roomId: number,
  users: true
): Promise<(Reservation & { user: User })[]>;
async function getAllRoomReservations(
  roomId: number,
  dateOrUsers?: Date | true
): Promise<Reservation[]> {
  const reservations = await prisma.reservation.findMany({
    where: {
      ...(typeof dateOrUsers === 'object'
        ? { roomId, date: dateOrUsers }
        : { roomId }),
    },
    include: {
      user: dateOrUsers === true,
    },
  });
  return reservations;
}

const deleteReservation: (
  userId: number,
  roomId: number,
  date: Date
) => Promise<Reservation> = async (userId, roomId, date) => {
  const reservation = await prisma.reservation.delete({
    where: {
      userId_roomId_date: {
        userId,
        roomId,
        date,
      },
    },
  });
  return reservation;
};

export {
  createReservation,
  getReservation,
  getAllRoomReservations,
  deleteReservation,
};
