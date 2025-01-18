import { Request } from '@utils/ts/types';
import { Response, NextFunction } from 'express';
import { query, getStay } from '@models/queries';
import Sperror from 'sperror';

const get = async (req: Request, res: Response, next: NextFunction) => {
  const { result: stay, error } = await query(() =>
    getStay(Number(req.params.stayId))
  );
  if (error) {
    next(
      error.type === 'Sperror'
        ? new Sperror('Stay not found', error.message, 404)
        : new Sperror('Server error', error.message, 500)
    );
    return;
  }
  if (stay.userId !== req.user!.id) {
    next(new Sperror('No access right', "You can't access this data.", 403));
  } else {
    res.json({ stay });
  }
};

const post = () => {};

const put = () => {};

const remove = () => {};

export { get, post, put, remove };
