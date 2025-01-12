import express from 'express';
const app = express();
import cors from 'cors';
import 'dotenv/config';
import * as routes from '@routes';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);

app.use('/reservations', routes.reservation);
app.use('/rooms', routes.room);
app.use('/stays', routes.stay);
app.use('/users', routes.user);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on PORT ${process.env.PORT}`)
);
