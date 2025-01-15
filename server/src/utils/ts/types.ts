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

interface QueryResponse<Type> {
  result: Type | null;
  error: string | null;
}

type RequestUser = Omit<User, 'password'>;

export type { Model, PrismaError, QueryResponse, RequestUser };
