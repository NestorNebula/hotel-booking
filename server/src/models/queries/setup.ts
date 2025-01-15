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

export { prisma, isTesting };
