import { prisma } from '../../utils/prisma';

export const getTodayStats = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: { gte: start },
    },
  });

  const revenue = orders.reduce((s, o) => s + o.totalAmount, 0);

  return {
    ordersCount: orders.length,
    revenue,
  };
};

export const getBestSellingItems = async () => {
  return prisma.orderItem.groupBy({
    by: ['menuItemId'],
    _sum: { qty: true },
    orderBy: {
      _sum: { qty: 'desc' },
    },
    take: 5,
  });
};
