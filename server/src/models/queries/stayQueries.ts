import type { Reservation, Stay } from '@prisma/client';
import { prisma } from './setup';
import Sperror from 'sperror';

const createStay: (
  stay: Omit<Stay, 'id'> & { reservations: Omit<Reservation, 'stayId'>[] }
) => Promise<Stay> = async (stay) => {
  const newStay = await prisma.stay.create({
    data: {
      firstDay: stay.firstDay,
      lastDay: stay.lastDay,
      user: {
        connect: {
          id: stay.userId,
        },
      },
      room: {
        connect: {
          id: stay.roomId,
        },
      },
      reservations: {
        createMany: {
          data: stay.reservations.map((r) => ({
            userId: r.userId,
            roomId: r.roomId,
            date: r.date,
          })),
        },
      },
    },
  });
  return newStay;
};

const getStay: (stayId: number) => Promise<Stay> = async (stayId) => {
  const stay = await prisma.stay.findUnique({
    where: { id: stayId },
  });
  if (!stay) throw new Sperror('No stay', "The stay doesn't exist.", 404);
  return stay;
};

const updateStay: (
  stay: Stay & { reservations: Reservation[] }
) => Promise<Stay> = async (stay) => {
  const updatedStay = await prisma.stay.update({
    where: { id: stay.id },
    data: {
      firstDay: stay.firstDay,
      lastDay: stay.lastDay,
      reservations: {
        connectOrCreate: stay.reservations.map((r) => ({
          where: {
            userId_roomId_date: {
              userId: stay.userId,
              roomId: stay.roomId,
              date: r.date,
            },
          },
          create: {
            userId: stay.userId,
            roomId: stay.roomId,
            date: r.date,
            stayId: stay.id,
          },
        })),
      },
    },
  });
  return updatedStay;
};

export { createStay, getStay, updateStay };
