import { Request, Response } from 'express';
import * as orderService from './order.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { UpdateOrderStatusInput } from './order.types';

/* ---------- CUSTOMER ---------- */

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.body);
  res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const { tableId } = req.params;
  const orders = await orderService.getOrdersByTable(tableId);
  res.json(orders);
});

/* ---------- ADMIN ---------- */

export const getLiveOrders = asyncHandler(async (_: Request, res: Response) => {
  const orders = await orderService.getActiveOrders();
  res.json(orders);
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as UpdateOrderStatusInput;

  const validStatuses: UpdateOrderStatusInput['status'][] = [
    'PREPARING',
    'SERVED',
    'PAID',
    'CANCELLED',
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  const order = await orderService.updateOrderStatus(id, status);
  res.json(order);
});
