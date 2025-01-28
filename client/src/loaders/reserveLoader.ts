import fetchAPI from '@services/api';
import { type ClientLoaderFunctionArgs, redirect } from 'react-router';
import type { Room } from '#types/db';
import type { APIResponse } from '#types/fetch';

const reserveLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const { roomId } = params;
  if (!roomId) return redirect('/');
  const { result, error }: APIResponse<Room.WithReservations> = await fetchAPI({
    path: `rooms/${roomId}?reservations`,
    method: 'get',
  });
  if (error) return redirect('/');
  return {
    roomId: Number(roomId),
    reservations: result.reservations[0],
  };
};

export default reserveLoader;
