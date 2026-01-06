import { Router } from 'express';

import { tableRoutes } from './modules/table/table.routes';
import { menuRoutes } from './modules/menu/menu.routes';
import { orderRoutes } from './modules/order/order.routes';
import { analyticsRoutes } from './modules/analytics/analytics.routes';
import { receiptRoutes } from './modules/receipt/receipt.routes';
import { authRoutes } from './modules/auth/auth.routes';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/tables', tableRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/receipt', receiptRoutes);
