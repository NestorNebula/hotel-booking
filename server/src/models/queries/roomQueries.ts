import { prisma } from './setup';
import { Room } from '@prisma/client';
import Sperror from 'sperror';

const getRoom: (roomId: number) => Promise<Room> = async (roomId) => {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });
  if (!room) throw new Sperror('No Room', "The room doesn't exist.", 400);
  return room;
};

export { getRoom };
