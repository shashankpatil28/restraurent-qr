import { Router } from 'express';
import * as menuController from './menu.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

export const menuRoutes = Router();

menuRoutes.get('/public', menuController.getPublicMenu);

menuRoutes.post(
  '/category',
  requireAuth,
  requireRole(['ADMIN']),
  menuController.createCategory
);

menuRoutes.post(
  '/item',
  requireAuth,
  requireRole(['ADMIN']),
  menuController.createMenuItem
);

menuRoutes.patch(
  '/item/:id',
  requireAuth,
  requireRole(['ADMIN']),
  menuController.updateMenuItem
);

menuRoutes.delete(
  '/item/:id',
  requireAuth,
  requireRole(['ADMIN']),
  menuController.deleteMenuItem
);
