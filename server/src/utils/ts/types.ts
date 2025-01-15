import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Reservation, Room, Stay, User } from '@prisma/client';

type Model = Reservation | Room | Stay | User;

type PrismaError =
  | PrismaClientInitializationError
  | PrismaClientKnownRequestError
  | PrismaClientRustPanicError
  | PrismaClientUnknownRequestError
  | PrismaClientValidationError;

interface QueryError {
  type: 'Prisma' | 'Sperror' | 'Unexpected';
  message: string;
  code?: number;
}

interface SuccessfulQueryResponse<Type> {
  result: Type;
  error: null;
}

interface FailedQueryResponse {
  result: null;
  error: QueryError;
}

type QueryResponse<Type> = SuccessfulQueryResponse<Type> | FailedQueryResponse;

type RequestUser = Omit<User, 'password'>;

export type { Model, PrismaError, QueryResponse, RequestUser };
