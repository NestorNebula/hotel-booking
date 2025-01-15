import { prisma } from './setup';
import type { RequestUser } from '@utils/ts/types';
import type { User } from '@prisma/client';
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

const getUserById: (id: number) => Promise<RequestUser> = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: {
      password: true,
    },
  });
  if (!user) throw new Sperror('No User', "The user doesn't exist.", 400);
  return user;
};

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

export { createUser, getUserById, getFullUserByEmail, getUserByEmail };
