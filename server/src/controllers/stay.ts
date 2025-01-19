import { Request } from '@utils/ts/types';
import { Response, NextFunction } from 'express';
import {
  query,
  getStay,
  createStay,
  updateStay,
  deleteStay,
  getRoom,
  getAllRoomReservations,
  deleteReservation,
} from '@models/queries';
import Sperror from 'sperror';
import { validationResult } from 'express-validator';
import { getStayReservations, checkRoomAvailability } from '@utils/stay';

const get = async (req: Request, res: Response, next: NextFunction) => {
  const { result: stay, error } = await query(() =>
    getStay(Number(req.params.stayId))
  );
  if (error) {
    next(
      error.type === 'Sperror'
        ? new Sperror('Stay not found', error.message, 404)
        : new Sperror('Server error', error.message, 500)
    );
    return;
  }
  if (stay.userId !== req.user!.id) {
    next(new Sperror('No access right', "You can't access this data.", 403));
  } else {
    res.json({ stay });
  }
};

const post = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const { result: room, error: getRoomError } = await query(() =>
    getRoom(Number(req.body.roomId))
  );
  if (getRoomError) {
    next(
      getRoomError.type === 'Sperror'
        ? new Sperror('Room not found', getRoomError.message, 400)
        : new Sperror('Server error', getRoomError.message, 500)
    );
    return;
  }
  const { result: roomReservations, error: getAllRoomReservationsError } =
    await query(() => getAllRoomReservations(room.id));
  if (getAllRoomReservationsError) {
    next(new Sperror('Server error', getAllRoomReservationsError.message, 500));
    return;
  }
  const firstDay = new Date(req.body.firstDay);
  firstDay.setUTCHours(0, 0, 0, 0);
  const lastDay = new Date(req.body.lastDay);
  lastDay.setUTCHours(0, 0, 0, 0);
  const stayReservations = getStayReservations(
    req.user!.id,
    room.id,
    firstDay,
    lastDay
  );
  const reservationsDuringStay = roomReservations.filter(
    (r) => r.date >= firstDay && r.date <= lastDay
  );
  if (reservationsDuringStay.length) {
    if (reservationsDuringStay.some((r) => r.userId === req.user!.id)) {
      next(
        new Sperror(
          'Reservation already exist',
          "You can't create a stay on an existing reservation.",
          400
        )
      );
      return;
    }
    const isAvailable = checkRoomAvailability(
      reservationsDuringStay,
      stayReservations,
      room
    );
    if (!isAvailable) {
      next(
        new Sperror(
          'No room available',
          "One of the days during the stay doesn't have any room left.",
          403
        )
      );
      return;
    }
  }
  const { result: stay, error: createStayError } = await query(() =>
    createStay({
      firstDay,
      lastDay,
      userId: req.user!.id,
      roomId: room.id,
      reservations: stayReservations,
    })
  );
  if (createStayError) {
    next(new Sperror('Server error', createStayError.message, 500));
    return;
  }
  res.json({ stay });
};

const put = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    next();
  }
  const { result: stay, error } = await query(() =>
    getStay(Number(req.params.stayId))
  );
  if (error) {
    next(
      error.type === 'Sperror'
        ? new Sperror('Stay not found', error.message, 400)
        : new Sperror('Server error', error.message, 500)
    );
    return;
  }
  if (stay.userId !== req.user!.id) {
    next(new Sperror('No update rights', "You can't update this stay.", 403));
    return;
  }
  const firstDay = new Date(req.body.firstDay);
  const lastDay = new Date(req.body.lastDay);
  const stayReservations = getStayReservations(
    req.user!.id,
    stay.roomId,
    firstDay,
    lastDay
  );
  if (
    stayReservations.every(
      (r) => r.date < stay.firstDay || r.date > stay.lastDay
    )
  ) {
    next(
      new Sperror(
        'Invalid dates',
        'You cannot completely change your stay dates. Please cancel your stay and book another.',
        400
      )
    );
    return;
  }
  const oldStayReservations = getStayReservations(
    req.user!.id,
    stay.roomId,
    stay.firstDay,
    stay.lastDay
  );
  const reservationsToDelete = oldStayReservations.filter(
    (r) => r.date < firstDay || r.date > lastDay
  );
  const { result: room, error: getRoomError } = await query(() =>
    getRoom(stay.roomId)
  );
  if (getRoomError) {
    next(
      getRoomError.type === 'Sperror'
        ? new Sperror('Room not found', getRoomError.message, 400)
        : new Sperror('Server error', getRoomError.message, 500)
    );
    return;
  }
  const { result: roomReservations, error: getAllRoomReservationsError } =
    await query(() => getAllRoomReservations(room.id));
  if (getAllRoomReservationsError) {
    next(new Sperror('Server error', getAllRoomReservationsError.message, 500));
    return;
  }
  const reservationsDuringStay = roomReservations.filter(
    (r) => r.date >= firstDay && r.date <= lastDay && r.userId !== req.user!.id
  );
  if (reservationsDuringStay.length) {
    const isAvailable = checkRoomAvailability(
      reservationsDuringStay,
      stayReservations,
      room
    );
    if (!isAvailable) {
      next(
        new Sperror(
          'No room available',
          "One of the days during the stay doesn't have any room left",
          403
        )
      );
      return;
    }
  }
  for (let i = 0; i < reservationsToDelete.length; i++) {
    const reservation = reservationsToDelete[i];
    const { error: deleteReservationError } = await query(() =>
      deleteReservation(
        reservation.userId,
        reservation.roomId,
        reservation.date
      )
    );
    if (deleteReservationError) {
      next(
        new Sperror('Server error', 'Error during reservation deletion.', 500)
      );
      return;
    }
  }
  const { result: newStay, error: updateStayError } = await query(() =>
    updateStay({
      id: stay.id,
      firstDay,
      lastDay,
      userId: stay.userId,
      roomId: stay.roomId,
      reservations: stayReservations,
    })
  );
  if (updateStayError) {
    console.log(updateStayError);
    next(new Sperror('Server error', 'Error during stay update', 500));
    return;
  }
  res.json({ stay: newStay });
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { result: stay, error: getStayError } = await query(() =>
    getStay(Number(req.params.stayId))
  );
  if (getStayError) {
    next(
      getStayError.type === 'Sperror'
        ? new Sperror('Stay not found', getStayError.message, 400)
        : new Sperror('Server error', getStayError.message, 500)
    );
    return;
  }
  if (stay.userId !== req.user!.id) {
    next(new Sperror('No delete rights', "You can't delete this data.", 403));
    return;
  }
  const { result: deletedStay, error: deletedStayError } = await query(() =>
    deleteStay(stay.id)
  );
  if (deletedStayError) {
    next(new Sperror('Server error', 'Error during stay deletion.', 500));
    return;
  }
  res.json({ stay: deletedStay });
};

export { get, post, put, remove };
