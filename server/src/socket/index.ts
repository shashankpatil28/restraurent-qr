import { WebSocketServer, WebSocket } from 'ws';

let wss: WebSocketServer | null = null;

interface IWebSocket extends WebSocket {
  isAlive: boolean;
}

export const initSocketServer = (server: any) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: IWebSocket) => {
    ws.isAlive = true;

    // Setup pong listener
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    console.log('Admin WS connected');

    ws.on('close', () => console.log('Admin WS disconnected'));
  });

  // Check every 30 seconds if connection is still alive
  const interval = setInterval(() => {
    wss?.clients.forEach(client => {
      const ws = client as IWebSocket;
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });
};

/**
 * Broadcasts an event to all connected WebSocket clients.
 * @param event The event name.
 * @param payload The data to send with the event.
 */
export const emitEvent = (event: string, payload: any) => {
  if (!wss) {
    console.error('Socket server not initialized. Cannot emit event.');
    return;
  }

  const message = JSON.stringify({ event, payload });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};