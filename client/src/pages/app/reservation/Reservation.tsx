import { useContext, useState } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router';
import { differenceInCalendarDays } from 'date-fns';
import { Context } from '@context';
import Calendar from '@components/calendar/Calendar';
import ReservationOverview from '@components/reservation-overview/ReservationOverview';
import fetchAPI from '@services/api';
import type { Reservation as DBReservation, Room, Stay } from '#types/db';
import type { APIResponse } from '#types/fetch';
import * as S from './Reservation.styles';

interface Reservation {
  start: Date | undefined;
  end: Date | undefined;
  room: Room;
}

function Reservation() {
  const {
    roomId,
    reservations,
  }: { roomId: number; reservations: DBReservation[] } = useLoaderData();
  const { rooms } = useContext(Context);
  const room = rooms.find((r) => r.id === Number(roomId));

  const [reservation, setReservation] = useState<Reservation>({
    start: undefined,
    end: undefined,
    room: room!,
  });
  const [error, setError] = useState<string | null>(null);
  const setStart = (date: Date) => {
    setReservation({ ...reservation, start: date });
  };
  const setEnd = (date: Date) => {
    setReservation({ ...reservation, end: date });
  };

  const edit = () => {
    setReservation({ ...reservation, start: undefined, end: undefined });
  };

  const navigate = useNavigate();
  const reserve = async () => {
    if (!reservation.start || !reservation.end) return;
    const lastDay = new Date(reservation.end.toJSON());
    lastDay.setUTCDate(reservation.end.getUTCDate() - 1);
    lastDay;
    const { result, error }: APIResponse<DBReservation | Stay> =
      differenceInCalendarDays(reservation.end, reservation.start) > 1
        ? await fetchAPI({
            path: 'stays',
            body: { roomId, firstDay: reservation.start, lastDay },
            method: 'post',
          })
        : await fetchAPI({
            path: 'reservations',
            body: { roomId, date: reservation.start },
            method: 'post',
          });
    if (error) {
      setError(
        result.errors
          ? result.errors[0].msg
          : result.error.msg || result.error.message
      );
    } else {
      navigate('/');
    }
  };

  return reservation.room ? (
    <S.Reservation>
      <title>Hotel Booking - Reserve {reservation.room.name}</title>
      {!reservation.start ? (
        <Calendar
          room={reservation.room}
          reservations={reservations}
          setDate={setStart}
        />
      ) : !reservation.end ? (
        <Calendar
          room={reservation.room}
          reservations={reservations}
          setDate={setEnd}
          startDate={reservation.start}
        />
      ) : (
        <ReservationOverview
          room={reservation.room}
          dates={{ start: reservation.start, end: reservation.end }}
          reserve={reserve}
          edit={edit}
        />
      )}
      {error && <div>{error}</div>}
    </S.Reservation>
  ) : (
    <Navigate to="/" />
  );
}

export default Reservation;
