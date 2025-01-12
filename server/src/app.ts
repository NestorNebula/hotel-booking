import express from 'express';
const app = express();
import cors from 'cors';
import 'dotenv/config';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () =>
  console.log(`Server listening on PORT ${process.env.PORT}`)
);
