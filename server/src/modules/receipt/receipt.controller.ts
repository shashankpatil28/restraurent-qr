import { Request, Response } from 'express';
import * as receiptService from './receipt.service';

export const getReceipt = async (req: Request, res: Response) => {
  try {
    const data = await receiptService.getReceiptData(req.params.orderId);
    res.json(data);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};
