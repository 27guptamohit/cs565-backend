import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express, type Request, type Response } from 'express';
import { connect } from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const MONGO_AUTH = process.env.MONGO_AUTH;

if (MONGO_AUTH === undefined) {
  throw new Error('MONGO_AUTH not found');
}

// Connect to MongoDB cluster
connect(MONGO_AUTH).then(
  () => {
    console.log('Connected to MongoDB cluster');
  },
  err => {
    console.log(err);
  }
);

// Enabling CORS to let API be accessed from a different server
app.use(cors());

// use the json parsing middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

app.listen(port, () => {
  if (port !== undefined) {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  }
});
