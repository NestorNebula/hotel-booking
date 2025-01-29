import fetchAPI from '@services/api';
import { type LoaderFunctionArgs, redirect } from 'react-router';
import type { APIResponse } from '#types/fetch';
import type { Room, Stay } from '#types/db';

const stayLoader = async ({ params }: LoaderFunctionArgs) => {
  const { stayId } = params;
  if (!stayId || isNaN(Number(stayId))) redirect('/');
  const {
    result: fetchStay,
    error: fetchStayError,
  }: APIResponse<{ stay: Stay }> = await fetchAPI({
    path: `stays/${stayId}`,
    method: 'get',
  });
  if (fetchStayError) {
    return redirect('/');
  }
  const stay = fetchStay.stay;
  const {
    result: fetchRoom,
    error: fetchRoomError,
  }: APIResponse<{ room: Room.WithReservations }> = await fetchAPI({
    path: `rooms/${stay.roomId}?reservations`,
    method: 'get',
  });
  if (fetchRoomError) {
    return redirect('/');
  }
  return {
    stayId: Number(stayId),
    stay,
    reservations: fetchRoom.room.reservations,
  };
};

export default stayLoader;
