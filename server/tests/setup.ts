import request from 'supertest';
import express from 'express';
import { populateDb, emptyDb } from './data';
const app = express();

beforeAll(async () => {
  const dbPopulated = await populateDb();
  if (!dbPopulated) throw new Error('Error when populating DB.');
});

afterAll(async () => {
  const dbEmptied = await emptyDb();
  if (!dbEmptied) throw new Error('Error when emptying DB.');
});

app.use(express.urlencoded({ extended: false }));

export { request, app };
