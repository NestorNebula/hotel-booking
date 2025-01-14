import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import type { PrismaError, QueryResponse } from '@utils/types';
import type { Reservation, Room, Stay, User } from '@prisma/client';

const isTesting = process.env.NODE_ENV === 'test';
const dbUrl = isTesting
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

const isPrismaError = (err: any): err is PrismaError => {
  return (err as PrismaError).clientVersion !== undefined;
};

async function query<Type>(cb: () => Type): Promise<QueryResponse<Type>> {
  try {
    const result = await cb();
    return { result, error: null };
  } catch (e) {
    return {
      result: null,
      error: isPrismaError(e) ? e.message : 'Unknown Error',
    };
  }
}

// User queries

// Room queries

// Reservation queries

// Stay queries

// Test queries
const testingQueries = {
  __createTestUser: async (user: User) => {
    if (!user.id) throw new Error('Test user needs an id.');
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
    });
  },

  __createTestRoom: async (room: Room) => {
    if (!room.id) throw new Error('Test room needs an id.');
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
};

export { query, testingQueries };
