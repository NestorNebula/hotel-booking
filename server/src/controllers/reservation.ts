import { Response, NextFunction } from 'express';
import { Request } from '@utils/ts/types';
import {
  query,
  createReservation,
  getReservation,
  getAllRoomReservations,
  deleteReservation,
  getRoom,
} from '@models/queries';
import { validationResult } from 'express-validator';
import Sperror from 'sperror';

const post = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const { result: room, error } = await query(() =>
    getRoom(Number(req.body.roomId))
  );
  if (error) {
    next(new Sperror('Room not found', "The room doesn't exist.", 400));
    return;
  }
  const date = new Date(req.body.date);
  date.setUTCHours(0, 0, 0, 0);
  const { result: existingReservation, error: getReservationError } =
    await query(() => getReservation(req.user!.id, room.id, date));
  if (getReservationError) {
    next(new Sperror('Server error', getReservationError.message, 500));
    return;
  }
  if (existingReservation) {
    next(
      new Sperror(
        'Reservation already exist',
        'You already have booked this room.',
        400
      )
    );
    return;
  }
  const { result: roomReservations, error: roomReservationsError } =
    await query(() => getAllRoomReservations(room.id, date));
  if (roomReservationsError) {
    next(new Sperror('Server error', roomReservationsError.message, 500));
    return;
  }
  if (roomReservations.length >= room.numberPerDay) {
    next(new Sperror('No more room', 'All the rooms are already booked.', 403));
    return;
  }
  const { result: reservation, error: reservationError } = await query(() =>
    createReservation({
      userId: req.user!.id,
      roomId: room.id,
      date,
      stayId: null,
    })
  );
  if (reservationError) {
    next(new Sperror('Server error', 'Error during reservation.', 500));
    return;
  }
  res.json({ reservation });
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const date = new Date(req.body.date);
  date.setUTCHours(0, 0, 0, 0);
  const { result: reservation, error: getReservationError } = await query(() =>
    getReservation(req.user!.id, Number(req.body.roomId), date)
  );
  if (getReservationError) {
    next(new Sperror('Server error', getReservationError.message, 500));
    return;
  }
  if (!reservation) {
    next(
      new Sperror(
        'Reservation not found',
        "The reservation doesn't exist.",
        400
      )
    );
    return;
  }
  if (reservation.stayId) {
    next(
      new Sperror(
        "Reservation can't be removed",
        'Reservation is part of a stay. Please remove the stay instead.',
        400
      )
    );
    return;
  }
  const { result: deletedReservation, error: deleteReservationError } =
    await query(() =>
      deleteReservation(
        reservation.userId,
        reservation.roomId,
        reservation.date
      )
    );
  if (deleteReservationError) {
    next(
      new Sperror(
        'Error during reservation deletion',
        deleteReservationError.message,
        500
      )
    );
    return;
  }
  res.json({ reservation: deletedReservation });
};

export { post, remove };
