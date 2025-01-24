import express, { Request, Response, NextFunction } from 'express';
const app = express();
import cors from 'cors';
import cookieParser = require('cookie-parser');
import 'dotenv/config';
import * as routes from '@routes';
import Sperror from 'sperror';
import passport = require('passport');
import '@utils/passport/strategy';
import { handleError } from '@utils/passport/fail';

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);

app.use(
  '/reservations',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  handleError,
  routes.reservation
);
app.use(
  '/rooms',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  handleError,
  routes.room
);
app.use(
  '/stays',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  handleError,
  routes.stay
);
app.use(
  '/users',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  handleError,
  routes.user
);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new Sperror('Not Found', "The resource couldn't be found.", 404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  err instanceof Sperror
    ? next(err)
    : next(new Sperror('Unexpected error.', err.message, 500));
});

app.use((err: Sperror, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({ error: err });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on PORT ${process.env.PORT}`)
);
