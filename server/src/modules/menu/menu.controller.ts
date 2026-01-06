import { Request, Response } from 'express';
import * as menuService from './menu.service';

/* ---------- ADMIN ---------- */

export const createCategory = async (req: Request, res: Response) => {
  const category = await menuService.createCategory(req.body);
  res.status(201).json(category);
};

export const createMenuItem = async (req: Request, res: Response) => {
  const item = await menuService.createMenuItem(req.body);
  res.status(201).json(item);
};

export const updateMenuItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await menuService.updateMenuItem(id, req.body);
  res.json(item);
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  await menuService.deleteMenuItem(id);
  res.status(204).send();
};

/* ---------- CUSTOMER ---------- */

export const getPublicMenu = async (_: Request, res: Response) => {
  const menu = await menuService.listCategoriesWithItems();
  res.json(menu);
};
