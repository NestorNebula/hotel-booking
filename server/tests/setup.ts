import request from 'supertest';
import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: false }));

export { request, app };
