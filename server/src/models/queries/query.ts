import { PrismaError, QueryResponse } from '@utils/ts/types';
import Sperror from 'sperror';

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

export { query };
