import type { Stay } from '@prisma/client';
import { prisma } from './setup';
import Sperror from 'sperror';

const getStay: (stayId: number) => Promise<Stay> = async (stayId) => {
  const stay = await prisma.stay.findUnique({
    where: { id: stayId },
  });
  if (!stay) throw new Sperror('No stay', "The stay doesn't exist.", 404);
  return stay;
};

export { getStay };
