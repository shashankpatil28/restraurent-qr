import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { app } from './app';
import { initSocketServer } from './socket';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server + WS running on port ${PORT}, url : http://localhost:${PORT}`);
});
