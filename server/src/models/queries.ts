import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

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

export {};
