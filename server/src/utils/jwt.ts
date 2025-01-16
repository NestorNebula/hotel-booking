import jwt from 'jsonwebtoken';
import { Response } from 'express';
import 'dotenv/config';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: number;
  }
}

const getToken = (id: number, expiresIn: string) => {
  const token = jwt.sign({ id }, process.env.T!, { expiresIn });
  return token;
};

const getRefreshToken = (id: number, expiresIn: string) => {
  const token = jwt.sign({ id }, process.env.R!, { expiresIn });
  return token;
};

const verifyRefreshToken = (token: string) => {
  try {
    const result = jwt.verify(token, process.env.R!);
    if (typeof result !== 'string') {
      return result.id;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const setToken = (res: Response, token: string, maxMilliseconds: number) => {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: maxMilliseconds,
    partitioned: true,
    sameSite: 'none',
    secure: true,
  });
};

const setRefreshToken = (
  res: Response,
  token: string,
  durationDays: number
) => {
  const expirationDate = new Date(Date.now());
  expirationDate.setDate(expirationDate.getDate() + durationDays);
  res.cookie('refresh', token, {
    expires: expirationDate,
    httpOnly: true,
    partitioned: true,
    path: '/auth',
    sameSite: 'none',
    secure: true,
  });
};

export {
  getToken,
  getRefreshToken,
  verifyRefreshToken,
  setToken,
  setRefreshToken,
};
