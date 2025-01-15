import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { query, createUser } from '@models/queries';
import bcrypt from 'bcrypt';
import { getToken, getRefreshToken } from '@utils/jwt';
import Sperror from 'sperror';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    const regex = new RegExp(/already taken/i);
    const alreadyExist = errors.length === 1 && regex.test(errors[0].msg);
    res.status(alreadyExist ? 409 : 400).json({ errors });
    return;
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const { result: user, error } = await query(() =>
    createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    })
  );
  if (error) {
    throw new Sperror(
      'Error when creating user',
      error.message,
      error.code ?? 500
    );
  }
  const token = getToken(user.id);
  const refreshToken = getRefreshToken(user.id);
  const expirationDate = new Date(Date.now());
  expirationDate.setDate(expirationDate.getDate() + 7);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 900000,
    partitioned: true,
    sameSite: 'none',
    secure: true,
  });
  res.cookie('refresh', refreshToken, {
    expires: expirationDate,
    httpOnly: true,
    partitioned: true,
    path: '/auth',
    sameSite: 'none',
    secure: true,
  });
  res.json({ success: true });
};

const login = () => {};

const guest = () => {};

const refresh = () => {};

const admin = () => {};

export { signup, login, guest, refresh, admin };
