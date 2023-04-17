import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express, type Request, type Response, Router } from 'express';
import { connect } from 'mongoose';
import registerRoutes from './routes';

dotenv.config();

const server: Express = express();
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
server.use(cors());

// use the json parsing middleware
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

const router: Router = Router();
registerRoutes(server, router);

server.listen(port, () => {
  if (port !== undefined) {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  }
});
