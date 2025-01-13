import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

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

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  reservations?: Reservation[];
}

interface Room {
  id?: number;
  name: string;
  description: string;
  images: string[];
  pricePerDay: number;
  numberPerDay: number;
  reservations?: Reservation[];
  stays?: Stay[];
}

interface Reservation {
  user?: User;
  userId: number;
  room?: Room;
  roomId: number;
  date: Date;
  stay?: Stay;
  stayId?: number | null;
}

interface Stay {
  id?: number;
  firstDay: Date;
  lastDay: Date;
  user?: User;
  userId: number;
  room?: Room;
  roomId: number;
  reservations?: Reservation[];
}

export type { PrismaError, QueryResponse, User, Room, Reservation, Stay };
