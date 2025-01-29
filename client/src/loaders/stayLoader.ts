import fetchAPI from '@services/api';
import { type LoaderFunctionArgs, redirect } from 'react-router';
import type { APIResponse } from '#types/fetch';
import type { Stay } from '#types/db';

const stayLoader = async ({ params }: LoaderFunctionArgs) => {
  const { stayId } = params;
  if (!stayId || isNaN(Number(stayId))) redirect('/');
  const { result: fetch, error }: APIResponse<{ stay: Stay }> = await fetchAPI({
    path: `stays/${stayId}`,
    method: 'get',
  });
  if (error) {
    return redirect('/');
  }
  return {
    stayId,
    stay: fetch.stay,
  };
};

export default stayLoader;
