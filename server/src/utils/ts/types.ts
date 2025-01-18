import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Reservation, Room, Stay, User } from '@prisma/client';
import express from 'express';
import * as core from 'express-serve-static-core';

namespace CustomRequest {
  export interface Body {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roomId: string;
    date: string;
  }

  export interface Query extends core.Query {
    reservations: string;
  }

  export interface Params extends core.ParamsDictionary {
    roomId: string;
    stayId: string;
    userId: string;
  }
}

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

interface Request<
  Params = CustomRequest.Params,
  ResBody = any,
  ReqBody = CustomRequest.Body,
  ReqQuery = CustomRequest.Query
> extends express.Request<Params, ResBody, ReqBody, ReqQuery> {}

type RequestUser = Omit<User, 'password'>;

export type { Model, PrismaError, QueryResponse, Request, RequestUser };
