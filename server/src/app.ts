import express, { Request, Response, NextFunction } from 'express';
const app = express();
import cors from 'cors';
import 'dotenv/config';
import * as routes from '@routes';
import Sperror from 'sperror';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);

app.use('/reservations', routes.reservation);
app.use('/rooms', routes.room);
app.use('/stays', routes.stay);
app.use('/users', routes.user);

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
