import { prisma } from './setup';
import { Reservation } from '@prisma/client';

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

export { createReservation };
