import { Request, Response, NextFunction } from 'express';
import Sperror from 'sperror';

const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(
    new Sperror(
      'Authentication Error',
      'You must be logged in to access this data.',
      401
    )
  );
};

export { handleError };
