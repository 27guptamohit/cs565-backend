import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express, type Request, type Response, Router } from 'express';
import { connect } from 'mongoose';
import registerRoutes from './routes';

dotenv.config();

const server: Express = express();
const PORT = process.env.PORT;
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
server.use(express.json({ limit: '10mb' }));

server.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running. Test auto deploy.');
});

const router: Router = Router();
registerRoutes(server, router);

server.listen(PORT, () => {
  if (PORT !== undefined) {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  }
});
