import { Request, Response } from 'express';
import * as tableService from './table.service';

export const createTable = async (req: Request, res: Response) => {
  const { number } = req.body;

  const table = await tableService.createTable(number);
  res.status(201).json(table);
};

export const getTableFromQR = async (req: Request, res: Response) => {
  const { token } = req.params;

  const table = await tableService.getTableByToken(token);

  if (!table) {
    return res.status(404).json({ message: 'Invalid table QR' });
  }

  res.json(table);
};

export const listTables = async (_: Request, res: Response) => {
  const tables = await tableService.listTables();
  res.json(tables);
};
