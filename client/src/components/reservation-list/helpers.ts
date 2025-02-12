import type { Reservation } from '#types/db';

export type ReservationWithIsUser =
  | (Reservation & { isUser?: boolean })
  | (Reservation.WithUser & { isUser?: boolean });
export type Reservations = ReservationWithIsUser[];

const canEdit = (
  reservation: Reservation & { isUser?: boolean },
  userId: number
) => {
  return (
    (reservation.isUser !== undefined
      ? reservation.isUser
      : reservation.userId === userId) && reservation.stayId !== null
  );
};

const findStayDates = (reservations: Reservations, stayId: number) => {
  const start = reservations
    .filter((r) => r.stayId === stayId)
    .reduce<Date | null>(
      (earliest, actual) =>
        !earliest
          ? new Date(actual.date)
          : new Date(actual.date).getTime() < earliest.getTime()
          ? new Date(actual.date)
          : earliest,
      null
    );
  const end = reservations
    .filter((r) => r.stayId === stayId)
    .reduce<Date | null>(
      (earliest, actual) =>
        !earliest
          ? new Date(actual.date)
          : new Date(actual.date).getTime() > earliest.getTime()
          ? new Date(actual.date)
          : earliest,
      null
    );
  end?.setUTCDate(end.getDate() + 1);
  return { start, end };
};

const findReservationDates = (reservation: Reservation) => {
  const start = new Date(reservation.date);
  const end = new Date(start.toJSON());
  end.setDate(end.getDate() + 1);
  return { start, end };
};

export { canEdit, findStayDates, findReservationDates };
