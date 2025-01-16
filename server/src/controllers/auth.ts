import { Response, NextFunction } from 'express';
import { Request } from '@utils/ts/types';
import { validationResult } from 'express-validator';
import {
  query,
  createUser,
  getFullUserByEmail,
  updateUserStatus,
} from '@models/queries';
import bcrypt from 'bcrypt';
import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
  verifyRefreshToken,
} from '@utils/jwt';
import Sperror from 'sperror';
import 'dotenv/config';

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
    next(
      new Sperror('Error when creating user', error.message, error.code ?? 500)
    );
    return;
  }
  const token = getToken(user.id, '15m');
  const refreshToken = getRefreshToken(user.id, '7d');
  setToken(res, token, 900000);
  setRefreshToken(res, refreshToken, 7);
  res.json({ success: true });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const { result: user, error } = await query(() =>
    getFullUserByEmail(req.body.email.toLowerCase())
  );
  if (error) {
    error.type !== 'Sperror'
      ? next(new Sperror('Error when searching user.', error.message, 500))
      : next(new Sperror('User not found', error.message, 400));
    return;
  }
  const match = bcrypt.compareSync(req.body.password, user.password);
  if (!match) {
    next(new Sperror('Incorrect password', "The passwords don't match.", 400));
    return;
  }
  const token = getToken(user.id, '15m');
  const refreshToken = getRefreshToken(user.id, '7d');
  setToken(res, token, 900000);
  setRefreshToken(res, refreshToken, 7);
  res.json({ success: true });
};

const guest = (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(0, '5m');
  setToken(res, token, 300000);
  res.json({ success: true });
};

const refresh = (req: Request, res: Response, next: NextFunction) => {
  const refresh = req.cookies.refresh;
  if (refresh) {
    const userId = verifyRefreshToken(refresh);
    if (userId) {
      const token = getToken(userId, '15m');
      setToken(res, token, 900000);
      res.json({ success: true });
      return;
    }
  }
  next(
    new Sperror(
      'Error during token refresh',
      'No token or invalid token provided',
      400
    )
  );
};

const admin = async (req: Request, res: Response, next: NextFunction) => {
  const password = req.body.password;
  if (password) {
    const match = password === process.env.ADMIN_PWD;
    if (match) {
      const { result: admin, error } = await query(() =>
        updateUserStatus(req.user!.id, true)
      );
      res.json({ success: !error && admin.isAdmin });
    }
  }
  next(new Sperror('Password error', 'No/wrong password submitted.', 400));
};

export { signup, login, guest, refresh, admin };
