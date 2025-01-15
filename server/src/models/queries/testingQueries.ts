import { prisma, isTesting } from './setup';
import type { Reservation, Room, Stay, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const testingQueries = {
  __createTestUser: async (user: User) => {
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email.toLowerCase(),
        password: bcrypt.hashSync(user.password, 10),
        isAdmin: user.isAdmin,
      },
    });
  },

  __createTestRoom: async (room: Room) => {
    await prisma.room.create({
      data: {
        id: room.id,
        name: room.name,
        description: room.description,
        images: room.images,
        pricePerDay: room.pricePerDay,
        numberPerDay: room.numberPerDay,
      },
    });
  },

  __createTestReservation: async (reservation: Reservation) => {
    await prisma.reservation.create({
      data: {
        user: {
          connect: {
            id: reservation.userId,
          },
        },
        room: {
          connect: {
            id: reservation.roomId,
          },
        },
        date: reservation.date,
      },
    });
  },

  __createTestStay: async (stay: Stay & { reservations: Reservation[] }) => {
    await prisma.stay.create({
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
          connect: stay.reservations.map((r) => ({
            userId_roomId_date: {
              userId: r.userId,
              roomId: r.roomId,
              date: r.date,
            },
          })),
        },
      },
    });
  },

  __emptyTestDb: async () => {
    if (!isTesting) throw new Error('Cannot use this query outside testing.');
    await prisma.reservation.deleteMany({});
    await prisma.stay.deleteMany({});
    await prisma.room.deleteMany({});
    await prisma.user.deleteMany({});
  },
};

export default testingQueries;
