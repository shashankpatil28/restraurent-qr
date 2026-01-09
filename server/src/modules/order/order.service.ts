import { prisma } from '../../utils/prisma';
import { CreateOrderInput } from './order.types';
import { ORDER_STATUS } from './order.constants';
import { emitEvent } from '../../socket/socket.events';
import { SOCKET_EVENTS } from '../../socket/socket.events';

export const createOrder = async (data: CreateOrderInput) => {
  // 1. Verify Table exists
  const table = await prisma.table.findUnique({ where: { id: data.tableId }});
  if (!table || !table.isActive) throw new Error('Table is currently unavailable');

  // 2. Fetch fresh prices from DB (Crucial Security Step)
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: data.items.map(i => i.menuItemId) },
      isAvailable: true,
    },
  });

  if (menuItems.length !== data.items.length) {
    throw new Error('Some items are no longer available');
  }

  if (menuItems.length !== data.items.length) {
    throw new Error('Invalid or unavailable menu items');
  }

  const orderItems = data.items.map(item => {
    const menuItem = menuItems.find(m => m.id === item.menuItemId)!;
    return {
      menuItemId: menuItem.id,
      qty: item.qty,
      price: menuItem.price,
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const order = await prisma.order.create({
    data: {
      tableId: data.tableId,
      status: ORDER_STATUS.PLACED,
      totalAmount,
      orderItems: {
        create: orderItems,
      },
    },
    include: {
      orderItems: {
        include: {
          menuItem: true,
        },
      },
      table: true,
    },
  });

  emitEvent(SOCKET_EVENTS.NEW_ORDER, {
    orderId: order.id,
  });

  return order;

};

export const getActiveOrders = async () => {
  return prisma.order.findMany({
    where: {
      status: {
        in: [
          ORDER_STATUS.PLACED,
          ORDER_STATUS.PREPARING,
        ],
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      table: true,
      orderItems: {
        include: {
          menuItem: true,
        },
      },
    },
  });
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  emitEvent(SOCKET_EVENTS.ORDER_UPDATED, {
    orderId: updatedOrder.id,
    status: updatedOrder.status,
  });

  return updatedOrder;
};

export const getOrdersByTable = async (tableId: string) => {
  return prisma.order.findMany({
    where: { 
      tableId,
      NOT: { status: 'PAID' } // Only show active orders to the customer
    },
    orderBy: { createdAt: 'desc' },
    include: {
      orderItems: {
        include: { menuItem: true },
      },
    },
  });
};
