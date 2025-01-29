import { type LoaderFunctionArgs, redirect } from 'react-router';
import fetchAPI from '@services/api';
import type { APIResponse } from '#types/fetch';
import type { Reservation, User } from '#types/db';

const accountLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;
  const {
    result,
    error,
  }: APIResponse<{ user: User & { reservations: Reservation[] } }> =
    await fetchAPI({ path: `users/${userId}?reservations`, method: 'get' });
  if (error) return redirect('/');
  return {
    reservations: result.user.reservations,
  };
};

export default accountLoader;
