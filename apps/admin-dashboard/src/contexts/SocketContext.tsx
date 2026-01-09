import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Order } from '@/services/api';

// This should be in your .env file, e.g., VITE_WS_URL=ws://localhost:3001
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';

type SocketEvent = 'NEW_ORDER' | 'ORDER_STATUS_UPDATE';

interface SocketMessage {
  type: SocketEvent;
  payload: Order; // Assuming payload is a full Order object for simplicity
}

interface SocketContextType {
  isConnected: boolean;
  lastMessage: SocketMessage | null;
  sendMessage: (message: any) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<SocketMessage | null>(null);

  useEffect(() => {
    const connectSocket = () => {
      // When auth is added, you can pass the token here
      // const token = localStorage.getItem('jwt_token');
      // const ws = new WebSocket(`${WS_URL}?token=${token}`);
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const message: SocketMessage = JSON.parse(event.data);
          console.log('WebSocket message received:', message);
          setLastMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', event.data);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected. Reconnecting in 3s...');
        setIsConnected(false);
        setTimeout(connectSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws.close(); // This will trigger the onclose event and reconnection logic
      };

      setSocket(ws);
    };

    connectSocket();

    return () => {
      socket?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('Cannot send message, WebSocket is not connected.');
    }
  };

  return (
    <SocketContext.Provider value={{ isConnected, lastMessage, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};