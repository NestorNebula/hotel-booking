import type { Request } from '@utils/ts/types';
import type { Response, NextFunction } from 'express';
import {
  query,
  getAllRoomReservations,
  getRoom,
  getAllRooms,
} from '@models/queries';
import Sperror from 'sperror';
import { Reservation, Room, User } from '@prisma/client';

function reservationsWithUser(
  reservations: Reservation[]
): reservations is (Reservation & { user: User })[] {
  return (
    (reservations as (Reservation & { user: User })[])[0]?.user !== undefined
  );
}

function roomsWithReservations(
  rooms: Room[]
): rooms is (Room & { reservations: Reservation[] })[] {
  return (
    (rooms as (Room & { reservations: Reservation[] })[])[0].reservations !==
    undefined
  );
}

const get = async (req: Request, res: Response, next: NextFunction) => {
  const { result: room, error } = await query(() =>
    getRoom(Number(req.params.roomId))
  );
  if (error) {
    next(
      error.type === 'Sperror'
        ? new Sperror('Room not found', error.message, 404)
        : new Sperror('Server error', error.message, 500)
    );
    return;
  }
  const queriedReservations = req.query.reservations !== undefined;
  if (!queriedReservations) {
    res.json({ room });
    return;
  }
  const isAdmin = req.user!.isAdmin;
  const { result: reservations, error: reservationsError } = isAdmin
    ? await query(() => getAllRoomReservations(room.id, true))
    : await query(() => getAllRoomReservations(room.id));
  if (reservationsError) {
    next(new Sperror('Server error', 'Unexpected error.', 500));
    return;
  }
  if (reservationsWithUser(reservations)) {
    const extendedReservations = reservations.map((r) => ({
      ...r,
      isUser: req.user!.id === r.userId,
    }));
    res.json({ room: { ...room, reservations: extendedReservations } });
  } else {
    const filteredReservations = reservations.map((r) => ({
      ...r,
      userId: req.user!.id === r.userId ? r.userId : undefined,
      stayId: req.user!.id === r.userId ? r.stayId : undefined,
      isUser: req.user!.id === r.userId,
    }));
    res.json({ room: { ...room, reservations: filteredReservations } });
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { result: rooms, error } =
    req.query.reservations !== undefined && req.user!.isAdmin
      ? await query(() => getAllRooms(true))
      : await query(() => getAllRooms());
  if (error) {
    next(new Sperror('Server error', error.message, 500));
    return;
  }
  if (roomsWithReservations(rooms)) {
    res.json({
      rooms: rooms.map((r) => ({
        ...r,
        reservations: r.reservations.map((re) => ({
          ...re,
          isUser: re.userId === req.user!.id,
        })),
      })),
    });
  } else {
    res.json({ rooms });
  }
};

export { get, getAll };
