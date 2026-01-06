import { Router } from 'express';
import * as receiptController from './receipt.controller';

export const receiptRoutes = Router();

receiptRoutes.get('/:orderId', receiptController.getReceipt);
