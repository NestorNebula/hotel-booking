import { Request } from '@utils/ts/types';
import { Response, NextFunction } from 'express';
import { query, getUserById } from '@models/queries';
import Sperror from 'sperror';

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

const put = () => {};

export { get, put };
