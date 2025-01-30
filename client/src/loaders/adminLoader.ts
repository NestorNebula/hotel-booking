import { redirect } from 'react-router';
import fetchAPI from '@services/api';
import type { APIResponse } from '#types/fetch';
import type { Reservation, Room } from '#types/db';

export type ReservationWithIsUser =
  | (Reservation & { isUser: boolean })
  | (Reservation.WithUser & { isUser: boolean });

const adminLoader = async () => {
  const {
    result,
    error,
  }: APIResponse<{
    rooms: (Room & { reservations: ReservationWithIsUser[] })[];
  }> = await fetchAPI({ path: 'rooms?reservations', method: 'get' });
  if (error) {
    redirect('/');
  } else {
    return {
      reservations: result.rooms.reduce<ReservationWithIsUser[]>(
        (reservations, room) => reservations.concat(room.reservations),
        []
      ),
    };
  }
};

export default adminLoader;
