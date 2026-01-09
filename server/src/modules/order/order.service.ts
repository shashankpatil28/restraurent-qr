import { prisma } from '../../utils/prisma';
import { CreateOrderInput, UpdateOrderStatusInput } from './order.types';
import { ORDER_STATUS } from './order.constants';
import { emitEvent } from '../../socket';
import { SOCKET_EVENTS } from '../../socket/socket.events';

export const createOrder = async (data: CreateOrderInput) => {
  // 1. Verify Table exists
  const table = await prisma.table.findUnique({ where: { id: data.tableId }});
  if (!table || !table.isActive) throw new Error('Table is currently unavailable');

  // Aggregate quantities for the same menu item and validate quantity
  const itemQuantities = new Map<string, number>();
  for (const item of data.items) {
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new Error(`Invalid quantity for item ${item.menuItemId}`);
    }
    itemQuantities.set(
      item.menuItemId,
      (itemQuantities.get(item.menuItemId) || 0) + item.qty
    );
  }
  const uniqueMenuItemIds = Array.from(itemQuantities.keys());

  // 2. Fetch fresh prices from DB (Crucial Security Step)
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: uniqueMenuItemIds },
      isAvailable: true,
    },
  });

  if (menuItems.length !== uniqueMenuItemIds.length) {
    throw new Error('Some items are invalid or no longer available');
  }

  const orderItems = menuItems.map(menuItem => {
    const qty = itemQuantities.get(menuItem.id)!;
    return { menuItemId: menuItem.id, qty, price: menuItem.price };
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
  status: UpdateOrderStatusInput['status']
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
