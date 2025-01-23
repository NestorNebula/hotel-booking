import fetchAPI from '@services/api';
import { redirect } from 'react-router';
import { guestUser } from '@context';
import type { APIResponse } from '#types/fetch';
import type { Room, User } from '#types/db';
import type { Context } from '@context/default';

const appLoader: () => Promise<Response | Context> = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/auth');
  const fetchRooms: APIResponse<{ rooms: Room[] }> = await fetchAPI({
    path: 'rooms',
    method: 'get',
  });
  if (fetchRooms.error) {
    localStorage.removeItem('id');
    return redirect('/auth');
  }
  if (Number(userId) === 0) {
    return {
      user: { ...guestUser, isGuest: true },
      rooms: fetchRooms.result.rooms,
    };
  }
  const fetchUser: APIResponse<{ user: User }> = await fetchAPI({
    path: `users/${userId}`,
    method: 'get',
  });
  if (fetchUser.error) {
    localStorage.removeItem('id');
    return redirect('/auth');
  }
  return {
    user: { ...fetchUser.result.user, isGuest: false },
    rooms: fetchRooms.result.rooms,
  };
};

export default appLoader;
