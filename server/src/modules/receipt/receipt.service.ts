import { prisma } from '../../utils/prisma';

export const getReceiptData = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      table: true,
      orderItems: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  return {
    orderId: order.id,
    table: order.table.number,
    items: order.orderItems.map(i => ({
      name: i.menuItem.name,
      qty: i.qty,
      price: i.price,
      total: i.qty * i.price,
    })),
    totalAmount: order.totalAmount,
    createdAt: order.createdAt,
  };
};
