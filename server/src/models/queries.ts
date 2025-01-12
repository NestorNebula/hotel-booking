import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import type { PrismaError, QueryResponse } from '@utils/types';

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

export { query };
