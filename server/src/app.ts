import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.use('/api', router);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});
