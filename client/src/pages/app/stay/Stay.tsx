import { useContext, useState } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router';
import { Context } from '@context';
import Calendar from '@components/calendar/Calendar';
import ReservationOverview from '@components/reservation-overview/ReservationOverview';
import fetchAPI from '@services/api';
import type { Reservation, Room, Stay as DBStay } from '#types/db';
import type { APIResponse } from '#types/fetch';
import * as S from './Stay.styles';

interface Stay {
  start: Date | undefined;
  end: Date | undefined;
  room: Room;
}

function Stay() {
  const {
    stayId,
    stay,
    reservations,
  }: { stayId: number; stay: DBStay; reservations: Reservation[] } =
    useLoaderData();
  const { rooms } = useContext(Context);
  const room = rooms.find((r) => r.id === stay.roomId);

  const lastDay = new Date(stay.lastDay);
  lastDay.setDate(lastDay.getDate() + 1);
  const [newStay, setNewStay] = useState<Stay>({
    start: new Date(stay.firstDay),
    end: new Date(lastDay.toJSON()),
    room: room!,
  });
  const [error, setError] = useState<string | null>(null);

  const minDate = new Date(stay.firstDay);
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date(stay.lastDay);

  const setStart = (date: Date) => {
    setNewStay({ ...newStay, start: date, end: undefined });
  };

  const setEnd = (date: Date) => {
    setNewStay({ ...newStay, end: date });
  };

  const edit = () => {
    setNewStay({ ...newStay, start: undefined });
  };

  const navigate = useNavigate();
  const reserve = async () => {
    if (!newStay.start || !newStay.end) return;
    const newStayLastDay = new Date(newStay.end.toJSON());
    newStayLastDay.setUTCDate(newStayLastDay.getUTCDate() - 1);
    const { result, error }: APIResponse<{ stay: DBStay }> = await fetchAPI({
      path: `stays/${stayId}`,
      body: { firstDay: newStay.start, lastDay: newStayLastDay },
      method: 'put',
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

  return newStay.room ? (
    <S.Stay>
      <title>Hotel Booking - Edit {newStay.room.name} reservation</title>
      {!newStay.start ? (
        <Calendar
          key="calendar-start"
          room={newStay.room}
          reservations={reservations.filter((r) => r.stayId !== stay.id)}
          setDate={setStart}
          endDate={newStay.end}
          maxDate={maxDate}
        />
      ) : !newStay.end ? (
        <Calendar
          key="calendar-end"
          room={newStay.room}
          reservations={reservations.filter((r) => r.stayId !== stay.id)}
          setDate={setEnd}
          startDate={newStay.start}
          minDate={minDate}
        />
      ) : newStay.start.getTime() !== new Date(stay.firstDay).getTime() ||
        newStay.end.getTime() !== lastDay.getTime() ? (
        <>
          <S.Details>
            <div>Previous Stay</div>
            <ReservationOverview
              room={newStay.room}
              dates={{ start: new Date(stay.firstDay), end: lastDay }}
            />
          </S.Details>
          <S.Details>
            <div>New Stay</div>
            <ReservationOverview
              room={newStay.room}
              dates={{ start: newStay.start, end: newStay.end }}
              reserve={reserve}
              edit={edit}
            />
          </S.Details>
        </>
      ) : (
        <S.Details>
          <div>Actual Stay</div>
          <ReservationOverview
            room={newStay.room}
            dates={{ start: newStay.start, end: newStay.end }}
            edit={edit}
          />
        </S.Details>
      )}
      {error && <div>{error}</div>}
    </S.Stay>
  ) : (
    <Navigate to="/" />
  );
}

export default Stay;
