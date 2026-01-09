import { OrderStatus } from './api';

/**
 * This file can now contain helper functions that use the SocketContext's sendMessage.
 * The context itself handles the connection.
 *
 * Example of a function to be called from a component:
 */
export const sendOrderStatusUpdate = (sendMessage: (message: any) => void, orderId: string, status: OrderStatus) => {
  const message = { type: 'ORDER_STATUS_UPDATE', payload: { orderId, status } };
  sendMessage(message);
};