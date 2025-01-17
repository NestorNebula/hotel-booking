import { prisma } from './setup';
import { Reservation, Room, User } from '@prisma/client';
import Sperror from 'sperror';

const getRoom: (roomId: number) => Promise<Room> = async (roomId) => {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });
  if (!room) throw new Sperror('No Room', "The room doesn't exist.", 400);
  return room;
};

async function getAllRooms(): Promise<Room[]>;
async function getAllRooms(
  reservations: true
): Promise<(Room & { reservations: (Reservation & { user: User })[] })[]>;
async function getAllRooms(
  reservations?: true
): Promise<
  Room[] | (Room & { reservations: (Reservation & { user: User })[] })[]
> {
  const rooms = await prisma.room.findMany({
    include: {
      ...(reservations ? { reservations: { include: { user: true } } } : {}),
    },
  });
  return rooms;
}

export { getRoom, getAllRooms };
