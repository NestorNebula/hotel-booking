import fetchAPI from '@services/api';
import { redirect } from 'react-router';
import { guestUser } from '@context';
import type { APIResponse } from '#types/fetch';
import type { Room, User } from '#types/db';
import type { Context } from '@context/default';

const appLoader: () => Promise<Response | Context> = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/auth');
  let rooms: Room[] = [];
  const fetchRooms: APIResponse<{ rooms: Room[] }> = await fetchAPI({
    path: 'rooms',
    method: 'get',
  });
  if (fetchRooms.error) {
    const fetchRefresh: APIResponse<{ success: true }> = await fetchAPI({
      path: 'auth/refresh',
      method: 'get',
    });
    if (!fetchRefresh.error) {
      const lastFetchRooms: APIResponse<{ rooms: Room[] }> = await fetchAPI({
        path: 'rooms',
        method: 'get',
      });
      if (!lastFetchRooms.error) {
        rooms = lastFetchRooms.result.rooms;
      }
    }
  } else {
    rooms = fetchRooms.result.rooms;
  }
  if (!rooms.length) {
    localStorage.removeItem('id');
    return redirect('/auth');
  }
  if (Number(userId) === 0) {
    return {
      user: { ...guestUser, isGuest: true },
      rooms: rooms,
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
    rooms: rooms,
  };
};

export default appLoader;
