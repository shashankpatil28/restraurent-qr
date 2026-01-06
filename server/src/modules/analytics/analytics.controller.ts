import { Request, Response } from 'express';
import * as analyticsService from './analytics.service';

export const getDashboardStats = async (_: Request, res: Response) => {
  const stats = await analyticsService.getTodayStats();
  res.json(stats);
};

export const getTopItems = async (_: Request, res: Response) => {
  const items = await analyticsService.getBestSellingItems();
  res.json(items);
};
