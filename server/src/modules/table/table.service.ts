import { prisma } from '../../utils/prisma';
import crypto from 'crypto';

export const createTable = async (number: number) => {
  const qrToken = crypto.randomUUID();

  return prisma.table.create({
    data: {
      number,
      qrToken,
    },
  });
};

export const getTableByToken = async (token: string) => {
  return prisma.table.findFirst({
    where: {
      qrToken: token,
      isActive: true,
    },
  });
};

export const listTables = async () => {
  return prisma.table.findMany({
    orderBy: { number: 'asc' },
  });
};
