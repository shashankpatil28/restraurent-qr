import { Request, Response } from 'express';
import * as orderService from './order.service';

/* ---------- CUSTOMER ---------- */

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  const { tableId } = req.params;
  const orders = await orderService.getOrdersByTable(tableId);
  res.json(orders);
};

/* ---------- ADMIN ---------- */

export const getLiveOrders = async (_: Request, res: Response) => {
  const orders = await orderService.getActiveOrders();
  res.json(orders);
};

export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await orderService.updateOrderStatus(id, status);
  res.json(order);
};
