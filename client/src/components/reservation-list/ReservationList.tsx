import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '@context';
import fetchAPI from '@services/api';
import ReservationOverview from '@components/reservation-overview/ReservationOverview';
import type { Reservation, Stay } from '#types/db';
import type { APIResponse } from '#types/fetch';
import {
  type Reservations,
  type ReservationWithIsUser,
  canEdit,
  findStayDates,
  findReservationDates,
} from './helpers';
import * as S from './ReservationList.styles';

function ReservationList({ reservations }: { reservations: Reservations }) {
  const { user, rooms } = useContext(Context);
  reservations.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const [actualReservations, setActualReservations] = useState(reservations);
  function reservationIsExtended(
    r: ReservationWithIsUser
  ): r is Reservation.WithUser & { isUser?: boolean } {
    return (r as Reservation.WithUser).user !== undefined;
  }

  const navigate = useNavigate();
  const edit = (stayId: number) => {
    navigate(`/stay/${stayId}`);
  };

  const remove = async (
    params:
      | { type: 'stay'; id: number }
      | { type: 'reservation'; roomId: number; date: Date }
  ) => {
    function isStay(params: any): params is { type: 'stay'; id: number } {
      return (params as { type: 'stay'; id: number }).id !== undefined;
    }
    if (isStay(params)) {
      const { id } = params;
      const { result, error }: APIResponse<{ stay: Stay }> = await fetchAPI({
        path: `stays/${id}`,
        method: 'delete',
      });
      if (!error) {
        setActualReservations(
          actualReservations.filter((r) => r.stayId !== result.stay.id)
        );
      }
    } else {
      const { roomId, date } = params;
      const { result, error }: APIResponse<{ reservation: Reservation }> =
        await fetchAPI({
          path: 'reservations',
          body: { date, roomId },
          method: 'delete',
        });
      if (!error) {
        setActualReservations(
          actualReservations.filter(
            (r) =>
              r.date.getTime() !== result.reservation.date.getTime() ||
              r.roomId !== result.reservation.roomId ||
              r.userId === user.id
          )
        );
      }
    }
  };

  return (
    <S.ReservationList>
      {actualReservations.map((r) => {
        const room = rooms.find((ro) => ro.id === r.roomId);
        if (!room) return <></>;
        const dates = r.stayId
          ? findStayDates(actualReservations, r.stayId)
          : findReservationDates(r);
        if (r.stayId && dates.start?.getTime() !== new Date(r.date).getTime()) {
          return;
        }
        if (!dates.start || !dates.end) return <></>;
        return (
          <S.Reservation key={`reservation${r.userId}${r.roomId}${r.date}`}>
            {reservationIsExtended(r) && (
              <S.Title>
                {r.isUser
                  ? 'You reserved'
                  : `${r.user.firstName} ${r.user.lastName} reserved`}
              </S.Title>
            )}
            <ReservationOverview
              room={room}
              dates={{ start: dates.start, end: dates.end }}
              edit={!!canEdit(r, user.id) ? () => edit(r.stayId!) : undefined}
              remove={
                r.isUser || r.userId === user.id
                  ? r.stayId
                    ? () => remove({ type: 'stay', id: r.stayId! })
                    : () =>
                        remove({
                          type: 'reservation',
                          roomId: r.roomId,
                          date: r.date,
                        })
                  : undefined
              }
            />
          </S.Reservation>
        );
      })}
    </S.ReservationList>
  );
}

export default ReservationList;
