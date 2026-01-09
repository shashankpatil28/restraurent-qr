import { Server } from 'ws';

let wss: Server | null = null;

export const initSocketServer = (server: any) => {
  wss = new Server({ server });

  wss.on('connection', (ws: any) => {
    ws.isAlive = true;
    
    // Setup pong listener
    ws.on('pong', () => { ws.isAlive = true; });

    console.log('Admin WS connected');
    
    ws.on('close', () => console.log('Admin WS disconnected'));
  });

  // Check every 30 seconds if connection is still alive
  const interval = setInterval(() => {
    wss?.clients.forEach((ws: any) => {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => clearInterval(interval));
};