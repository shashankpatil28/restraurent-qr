import { Server } from 'ws';
import { SOCKET_EVENTS } from './socket.events';

let wss: Server | null = null;

export const initSocketServer = (server: any) => {
  wss = new Server({ server });

  wss.on('connection', (ws) => {
    console.log('Admin WS connected');

    ws.on('close', () => {
      console.log('Admin WS disconnected');
    });
  });
};

export const emitEvent = (event: string, payload: any) => {
  if (!wss) return;

  wss.clients.forEach((client: any) => {
    if (client.readyState === 1) {
      client.send(
        JSON.stringify({
          event,
          payload,
        })
      );
    }
  });
};
