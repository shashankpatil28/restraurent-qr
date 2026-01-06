import { prisma } from '../../utils/prisma';
import {
  CreateCategoryInput,
  CreateMenuItemInput,
  UpdateMenuItemInput,
} from './menu.types';

/* ---------- CATEGORY ---------- */

export const createCategory = async (data: CreateCategoryInput) => {
  return prisma.menuCategory.create({
    data,
  });
};

export const listCategoriesWithItems = async () => {
  return prisma.menuCategory.findMany({
    where: { isActive: true },
    orderBy: { position: 'asc' },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });
};

/* ---------- MENU ITEM ---------- */

export const createMenuItem = async (data: CreateMenuItemInput) => {
  return prisma.menuItem.create({
    data,
  });
};

export const updateMenuItem = async (
  id: string,
  data: UpdateMenuItemInput
) => {
  return prisma.menuItem.update({
    where: { id },
    data,
  });
};

export const deleteMenuItem = async (id: string) => {
  return prisma.menuItem.delete({
    where: { id },
  });
};
