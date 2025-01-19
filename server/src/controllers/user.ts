import { Request } from '@utils/ts/types';
import { Response, NextFunction } from 'express';
import {
  query,
  getUserById,
  getFullUserById,
  updateUser,
  updateUserPassword,
} from '@models/queries';
import Sperror from 'sperror';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const get = async (req: Request, res: Response, next: NextFunction) => {
  const { result: user, error: getUserByIdError } =
    req.query.reservations !== undefined
      ? await query(() => getUserById(Number(req.params.userId), true))
      : await query(() => getUserById(Number(req.params.userId)));
  if (getUserByIdError) {
    next(
      getUserByIdError.type === 'Sperror'
        ? new Sperror('User not found', getUserByIdError.message, 404)
        : new Sperror('Server error', getUserByIdError.message, 500)
    );
    return;
  }
  if (user.id !== req.user!.id) {
    next(new Sperror('No access rights', "You can't access this data.", 403));
    return;
  }
  res.json({ user });
};

const put = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const { result: user, error: getFullUserByIdError } = await query(() =>
    getFullUserById(Number(req.params.userId))
  );
  if (getFullUserByIdError) {
    next(
      getFullUserByIdError.type === 'Sperror'
        ? new Sperror('User not found', getFullUserByIdError.message, 400)
        : new Sperror('Server error', getFullUserByIdError.message, 500)
    );
    return;
  }
  if (user.id !== req.user!.id) {
    next(new Sperror('No update rights', "You can't update this data.", 403));
    return;
  }
  if (req.query.password !== undefined) {
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      next(
        new Sperror(
          "Password don't match",
          'Actual password is incorrect.',
          400
        )
      );
      return;
    }
    if (req.body.newPassword === undefined) {
      next(new Sperror('Password error', 'New password is empty.', 400));
    }
    const { error: updateUserPasswordError } = await query(() =>
      updateUserPassword({ id: user.id, password: req.body.newPassword })
    );
    if (updateUserPasswordError) {
      next(new Sperror('Server error', updateUserPasswordError.message, 500));
      return;
    }
    res.json({ success: true });
  } else {
    const userToUpdate = {
      id: user.id,
      firstName: req.body.firstName ?? user.firstName,
      lastName: req.body.lastName ?? user.lastName,
      email: req.body.email ?? user.email,
      isAdmin: user.isAdmin,
    };
    const { result: updatedUser, error: updateUserError } = await query(() =>
      updateUser(userToUpdate)
    );
    if (updateUserError) {
      next(new Sperror('Server error', updateUserError.message, 500));
      return;
    }
    res.json({ user: updatedUser });
  }
};

export { get, put };
