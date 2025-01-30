import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Signup from './signup/Signup';
import Login from './login/Login';
import fetchAPI from '@services/api';
import type { APIResponse } from '#types/fetch';
import * as S from './Auth.styles';

function Auth() {
  const navigate = useNavigate();

  const submitGuest = async () => {
    const fetch: APIResponse<{ success: true }> = await fetchAPI({
      path: 'auth/guest',
      method: 'get',
    });
    if (!fetch.error) {
      localStorage.setItem('id', '0');
      navigate('/');
    }
  };

  const [img, setImg] = useState(1);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setImg(img < 7 ? img + 1 : 1);
    }, 5000);

    return () => clearTimeout(timeout);
  });

  return (
    <S.Auth>
      <img src={`/images/room${img}-1.jpg`} alt="" />
      <S.Title>Hotel Booking</S.Title>
      <Signup />
      <Login />
      <S.Guest onClick={submitGuest}>Sign in as Guest</S.Guest>
    </S.Auth>
  );
}

export default Auth;
