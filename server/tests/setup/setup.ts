import request from 'supertest';
import express, { Response, NextFunction } from 'express';
import { populateDb, emptyDb, type Data } from './data';
import { Request } from '@utils/ts/types';
const app = express();
let dbData: Data = {
  reservations: [],
  rooms: [],
  stays: [],
  users: [],
};

const setUser = () =>
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.user = dbData.users[0];
    next();
  });

beforeAll(async () => {
  const { data, success } = await populateDb();
  if (!success) throw new Error('Error when populating DB.');
  dbData = data;
});

afterAll(async () => {
  const dbEmptied = await emptyDb();
  if (!dbEmptied) throw new Error('Error when emptying DB.');
});

app.use(express.urlencoded({ extended: false }));

export { request, app, dbData as data, setUser };
