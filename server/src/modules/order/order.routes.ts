import { Router } from 'express';
import * as orderController from './order.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

export const orderRoutes = Router();

/* Customer */
orderRoutes.post('/', orderController.placeOrder);
orderRoutes.get('/table/:tableId', orderController.getMyOrders);

/* Admin */
orderRoutes.get(
  '/live',
  requireAuth,
  requireRole(['ADMIN', 'STAFF']),
  orderController.getLiveOrders
);

orderRoutes.patch(
  '/:id/status',
  requireAuth,
  requireRole(['ADMIN', 'STAFF']),
  orderController.updateStatus
);
