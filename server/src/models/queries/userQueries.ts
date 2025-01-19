import { prisma } from './setup';
import type { RequestUser } from '@utils/ts/types';
import type { Reservation, User } from '@prisma/client';
import Sperror from 'sperror';

const createUser: (
  user: Omit<User, 'id' | 'isAdmin'>
) => Promise<Omit<User, 'password'>> = async (user) => {
  const newUser = await prisma.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    },
  });
  return newUser;
};

async function getUserById(id: number): Promise<RequestUser>;
async function getUserById(
  id: number,
  reservations: true
): Promise<RequestUser & { reservations: Reservation[] }>;
async function getUserById(
  id: number,
  reservations?: true
): Promise<RequestUser | (RequestUser & { reservations: Reservation[] })> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      reservations: reservations ? true : false,
    },
    omit: {
      password: true,
    },
  });
  if (!user) throw new Sperror('No User', "The user doesn't exist.", 400);
  return user;
}

const getFullUserByEmail: (email: string) => Promise<User> = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new Sperror('No User', "The user doesn't exist.", 400);
  return user;
};

const getUserByEmail: (
  email: string
) => Promise<Pick<User, 'email'> | null> = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true },
  });
  return user;
};

const updateUserStatus: (
  userId: number,
  isAdmin: boolean
) => Promise<Pick<User, 'isAdmin'>> = async (userId, isAdmin = true) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isAdmin },
    select: { isAdmin },
  });
  return user;
};

const updateUser: (user: RequestUser) => Promise<RequestUser> = async (
  user
) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    omit: {
      password: true,
    },
  });
  return updatedUser;
};

const updateUserPassword: (
  user: Pick<User, 'id' | 'password'>
) => Promise<void> = async (user) => {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: user.password,
    },
  });
};

export {
  createUser,
  getUserById,
  getFullUserByEmail,
  getUserByEmail,
  updateUserStatus,
  updateUser,
  updateUserPassword,
};
