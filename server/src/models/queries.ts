import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import type { PrismaError, QueryResponse, RequestUser } from '@utils/ts/types';
import type { Reservation, Room, Stay, User } from '@prisma/client';
import Sperror from 'sperror';
import bcrypt from 'bcrypt';

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

async function query<Type>(
  cb: () => Promise<Type>
): Promise<QueryResponse<Type>> {
  try {
    const result = await cb();
    return { result, error: null };
  } catch (e) {
    return {
      result: null,
      error: isPrismaError(e)
        ? { type: 'Prisma', message: e.message }
        : e instanceof Sperror
        ? { type: 'Sperror', message: e.msg ?? e.title, code: e.statusCode }
        : e instanceof Error
        ? { type: 'Unexpected', message: e.message }
        : { type: 'Unexpected', message: 'Unexpected error during query.' },
    };
  }
}

// User queries

const getUserById: (id: number) => Promise<RequestUser> = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: {
      password: true,
    },
  });
  if (!user) throw new Error('User not found.');
  return user;
};

// Room queries

// Reservation queries

// Stay queries

// Test queries
const testingQueries = {
  __createTestUser: async (user: User) => {
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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

export { query, getUserById, testingQueries };
