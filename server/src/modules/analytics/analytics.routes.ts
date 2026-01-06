import { Router } from 'express';
import * as analyticsController from './analytics.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

export const analyticsRoutes = Router();

analyticsRoutes.get(
  '/dashboard',
  requireAuth,
  requireRole(['ADMIN']),
  analyticsController.getDashboardStats
);

analyticsRoutes.get(
  '/top-items',
  requireAuth,
  requireRole(['ADMIN']),
  analyticsController.getTopItems
);
