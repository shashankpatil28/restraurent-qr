import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';

export const app = express();

app.use(cors());
app.use(express.json());

// Simple request logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url, ip } = req;
  const userAgent = req.get('User-Agent') || 'N/A';

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} ${statusCode} - ${duration}ms [${ip}] "${userAgent}"`
    );
  });

  next();
});

app.use('/api', router);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

// Global error handler - must be the last middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = (err as any).status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
});
