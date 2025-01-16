import { prisma } from './setup';
import { Prisma, Reservation, Room } from '@prisma/client';

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

async function getAllRoomReservations(
  roomId: number
): Promise<(Reservation & { room: Room })[]>;
async function getAllRoomReservations(
  roomId: number,
  date: Date
): Promise<(Reservation & { room: Room })[]>;
async function getAllRoomReservations(
  roomId: number,
  date?: Date
): Promise<(Reservation & { room: Room })[]> {
  const reservations = await prisma.reservation.findMany({
    where: { ...(date ? { roomId, date } : { roomId }) },
    include: {
      room: true,
    },
  });
  return reservations;
}

export { createReservation, getReservation, getAllRoomReservations };
