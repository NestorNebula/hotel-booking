import request from 'supertest';
import express from 'express';
import { populateDb, emptyDb, type Data } from './data';
const app = express();
let dbData: Data = {
  reservations: [],
  rooms: [],
  stays: [],
  users: [],
};

beforeAll(async () => {
  const { data, success } = await populateDb();
  if (!success) throw new Error('Error when populating DB.');
  dbData = data;
  app.use((req, res, next) => {
    req.user = data.users[0];
  });
});

afterAll(async () => {
  const dbEmptied = await emptyDb();
  if (!dbEmptied) throw new Error('Error when emptying DB.');
});

app.use(express.urlencoded({ extended: false }));

export { request, app, dbData as data };
