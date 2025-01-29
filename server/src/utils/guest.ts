import type { Response, NextFunction } from 'express';
import type { Request } from './ts/types';
import Sperror from 'sperror';

const blockGuest = (req: Request, res: Response, next: NextFunction) => {
  return req.user?.id === 0
    ? next(
        new Sperror(
          'Forbidden',
          "You can't update/access this data as Guest.",
          403
        )
      )
    : next();
};

export default blockGuest;
